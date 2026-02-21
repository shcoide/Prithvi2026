/**
 * lib/db.ts
 * All Mongoose models + CRUD helpers.
 *
 * Collections:
 * users       – registered participants
 * counters    – auto-increment for registration IDs
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
    /** URL pointing to the image on Uploadthing */
    paymentScreenshot: string; 
    paymentStatus: 'pending' | 'approved' | 'rejected';
    adminVerified: boolean;
    adminNote: string;
    registeredAt: string;
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
    paymentScreenshot: { type: String, default: '' },   // Now expects the Uploadthing URL string
    paymentStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    adminVerified: { type: Boolean, default: false },
    adminNote: { type: String, default: '' },
    registeredAt: { type: String, required: true },
});

const CounterSchema = new Schema({
    _id: { type: String, required: true },
    value: { type: Number, default: 0 },
});

// ─────────────────────────────────────────────────────────────────────────────
// MODELS
// ─────────────────────────────────────────────────────────────────────────────

const User = (models.User as mongoose.Model<IUser>) || model<IUser>('User', UserSchema);
const Counter = models.Counter || model('Counter', CounterSchema);

// ─────────────────────────────────────────────────────────────────────────────
// COUNTER
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