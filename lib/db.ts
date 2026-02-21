/**
 * lib/db.ts
 * All Mongoose models + CRUD helpers.
 *
 * Collections:
 *   users       – registered participants
 *   screenshots – payment screenshot binaries (stored in MongoDB, not on disk)
 *   counters    – auto-increment for registration IDs
 */

import mongoose, { Schema, model, models, Document } from 'mongoose';
import { connectDB } from './mongodb';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface IUser extends Document {
    registrationId: string;
    name: string;
    email: string;
    phone: string;
    college: string;
    gender: string;
    passwordHash: string;
    emailVerified: boolean;
    paymentVerified: boolean;
    /** stored as MongoDB ObjectId string pointing to a Screenshot document */
    paymentScreenshot: string;
    paymentStatus: 'pending' | 'approved' | 'rejected';
    /** Admin-only master verification toggle — never exposed to end-users */
    adminVerified: boolean;
    adminNote: string;
    registeredAt: string;
}

export interface IScreenshot extends Document {
    filename: string;
    mimeType: string;
    data: Buffer;
    email: string;
    uploadedAt: Date;
}

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMAS
// ─────────────────────────────────────────────────────────────────────────────

const UserSchema = new Schema<IUser>({
    registrationId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true },
    college: { type: String, default: '' },
    gender: { type: String, default: '' },
    passwordHash: { type: String, required: true },
    emailVerified: { type: Boolean, default: false },
    paymentVerified: { type: Boolean, default: false },
    paymentScreenshot: { type: String, default: '' },   // Screenshot _id as string
    paymentStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    adminVerified: { type: Boolean, default: false },
    adminNote: { type: String, default: '' },
    registeredAt: { type: String, required: true },
});

const ScreenshotSchema = new Schema<IScreenshot>({
    filename: { type: String, required: true },
    mimeType: { type: String, required: true },
    data: { type: Buffer, required: true },
    email: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
});

const CounterSchema = new Schema({
    _id: { type: String, required: true },
    value: { type: Number, default: 0 },
});

// ─────────────────────────────────────────────────────────────────────────────
// MODELS  (guard against hot-reload re-registration in Next.js dev)
// ─────────────────────────────────────────────────────────────────────────────

const User = (models.User as mongoose.Model<IUser>) || model<IUser>('User', UserSchema);
const Screenshot = (models.Screenshot as mongoose.Model<IScreenshot>) || model<IScreenshot>('Screenshot', ScreenshotSchema);
const Counter = models.Counter || model('Counter', CounterSchema);

// ─────────────────────────────────────────────────────────────────────────────
// COUNTER — auto-increment registration ID
// ─────────────────────────────────────────────────────────────────────────────

export async function getNextRegistrationId(): Promise<string> {
    await connectDB();
    const counter = await Counter.findByIdAndUpdate(
        'registrationCounter',
        { $inc: { value: 1 } },
        { new: true, upsert: true }
    );
    const padded = String(counter.value).padStart(4, '0');
    return `PRITHVI26${padded}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// USER CRUD
// ─────────────────────────────────────────────────────────────────────────────

export async function getAllUsers(): Promise<IUser[]> {
    await connectDB();
    return User.find({}).sort({ registeredAt: -1 }).lean<IUser[]>();
}

export async function getUserByEmail(email: string): Promise<IUser | null> {
    await connectDB();
    return User.findOne({ email: email.toLowerCase() }).lean<IUser>();
}

export async function getUserByRegistrationId(id: string): Promise<IUser | null> {
    await connectDB();
    return User.findOne({ registrationId: id }).lean<IUser>();
}

export async function createUser(userData: Omit<IUser, keyof Document>): Promise<IUser> {
    await connectDB();
    const user = new User(userData);
    return user.save();
}

export async function updatePaymentStatus(
    registrationId: string,
    status: 'approved' | 'rejected',
    adminNote?: string
): Promise<boolean> {
    await connectDB();
    const update: Partial<IUser> = { paymentStatus: status };
    if (adminNote !== undefined) update.adminNote = adminNote;

    // If rejecting, we cleanup the actual screenshot file to save space
    if (status === 'rejected') {
        const user = await User.findOne({ registrationId });
        if (user && user.paymentScreenshot) {
            if (!user.paymentScreenshot.startsWith('http')) {
                await Screenshot.findByIdAndDelete(user.paymentScreenshot).exec();
            }
            update.paymentScreenshot = ''; // clear reference
        }
    }

    const result = await User.updateOne({ registrationId }, { $set: update });
    return result.modifiedCount > 0;
}

export async function setAdminVerified(
    registrationId: string,
    verified: boolean,
    adminNote?: string
): Promise<boolean> {
    await connectDB();
    const update: Partial<IUser> = { adminVerified: verified };
    if (adminNote !== undefined) update.adminNote = adminNote;
    const result = await User.updateOne({ registrationId }, { $set: update });
    return result.modifiedCount > 0;
}

// ─────────────────────────────────────────────────────────────────────────────
// SCREENSHOT CRUD
// ─────────────────────────────────────────────────────────────────────────────

export async function saveScreenshot(
    email: string,
    filename: string,
    mimeType: string,
    buffer: Buffer
): Promise<string> {
    await connectDB();
    const doc = new Screenshot({ email, filename, mimeType, data: buffer });
    const saved = await doc.save();
    // Return the MongoDB _id as the reference string stored on the user
    return (saved._id as mongoose.Types.ObjectId).toString();
}

export async function getScreenshotById(id: string): Promise<IScreenshot | null> {
    await connectDB();
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return Screenshot.findById(id).lean<IScreenshot>();
}
