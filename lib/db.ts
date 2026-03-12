/**
 * lib/db.ts
 * Mongoose models + CRUD helpers.
 * Collections: users, eventregistrations, counters
 */

import mongoose, { Schema, model, models, Document } from 'mongoose';
import { connectDB } from './mongodb';

// ─── TYPES ────────────────────────────────────────────────────────────────────

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
    paymentScreenshot: string;
    paymentStatus: 'pending' | 'approved' | 'rejected';
    adminVerified: boolean;
    adminNote: string;
    registeredAt: string;
}

export interface IEventRegistration extends Document {
    eventId: string;
    eventName: string;
    teamName: string;
    college: string;         // canonical college of captain
    participantIds: string[]; // registrationIds of all members
    registeredBy: string;    // captain's registrationId
    registeredAt: Date;
}

// ─── SCHEMAS ──────────────────────────────────────────────────────────────────

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
    paymentScreenshot: { type: String, default: '' },
    paymentStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    adminVerified: { type: Boolean, default: false },
    adminNote: { type: String, default: '' },
    registeredAt: { type: String, required: true },
});

const EventRegistrationSchema = new Schema<IEventRegistration>({
    eventId: { type: String, required: true, index: true },
    eventName: { type: String, required: true },
    teamName: { type: String, required: true },
    college: { type: String, required: true, index: true },
    participantIds: [{ type: String, required: true }],
    registeredBy: { type: String, required: true, index: true },
    registeredAt: { type: Date, default: Date.now },
});

const CounterSchema = new Schema({
    _id: { type: String, required: true },
    value: { type: Number, default: 0 },
});

// ─── MODELS ───────────────────────────────────────────────────────────────────

const User = (models.User as mongoose.Model<IUser>) || model<IUser>('User', UserSchema);
const EventRegistration = (models.EventRegistration as mongoose.Model<IEventRegistration>) ||
    model<IEventRegistration>('EventRegistration', EventRegistrationSchema);
const Counter = models.Counter || model('Counter', CounterSchema);

// ─── USER CRUD ────────────────────────────────────────────────────────────────

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

export async function getUsersByCollege(college: string): Promise<IUser[]> {
    await connectDB();
    // Case-insensitive partial match for robustness
    return User.find({ college: { $regex: new RegExp(college, 'i') } })
        .select('registrationId name college gender adminVerified')
        .lean<IUser[]>();
}

export async function getUsersByIds(ids: string[]): Promise<IUser[]> {
    await connectDB();
    return User.find({ registrationId: { $in: ids } })
        .select('registrationId name email phone college gender adminVerified')
        .lean<IUser[]>();
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

// ─── COUNTER ──────────────────────────────────────────────────────────────────

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

// ─── EVENT REGISTRATION CRUD ──────────────────────────────────────────────────

/** Create a new event registration (team) */
export async function createEventRegistration(data: {
    eventId: string;
    eventName: string;
    teamName: string;
    college: string;
    participantIds: string[];
    registeredBy: string;
}): Promise<IEventRegistration> {
    await connectDB();
    const reg = new EventRegistration({ ...data, registeredAt: new Date() });
    return reg.save();
}

/** Update an existing event registration (team) */
export async function updateEventRegistration(
    registrationId: string,
    updates: { teamName?: string; participantIds?: string[] }
): Promise<boolean> {
    await connectDB();
    const result = await EventRegistration.updateOne(
        { _id: new mongoose.Types.ObjectId(registrationId) },
        { $set: updates }
    );
    return result.modifiedCount > 0;
}

/** Get all teams for a specific event */
export async function getRegistrationsByEvent(eventId: string): Promise<IEventRegistration[]> {
    await connectDB();
    return EventRegistration.find({ eventId }).sort({ registeredAt: 1 }).lean<IEventRegistration[]>();
}

/** Get all teams for a specific event from a specific college */
export async function getRegistrationsByEventAndCollege(
    eventId: string,
    college: string
): Promise<IEventRegistration[]> {
    await connectDB();
    return EventRegistration.find({
        eventId,
        college: { $regex: new RegExp(college, 'i') },
    }).lean<IEventRegistration[]>();
}

/** Get all event registrations where a participant appears */
export async function getRegistrationsByParticipant(registrationId: string): Promise<IEventRegistration[]> {
    await connectDB();
    return EventRegistration.find({
        participantIds: registrationId,
    }).sort({ registeredAt: -1 }).lean<IEventRegistration[]>();
}

/** Count teams from a college for an event */
export async function countTeamsFromCollege(eventId: string, college: string): Promise<number> {
    await connectDB();
    return EventRegistration.countDocuments({
        eventId,
        college: { $regex: new RegExp(college, 'i') },
    });
}

/** Check if a participant is already in any team for an event */
export async function isParticipantRegisteredForEvent(
    eventId: string,
    registrationId: string
): Promise<boolean> {
    await connectDB();
    const count = await EventRegistration.countDocuments({
        eventId,
        participantIds: registrationId,
    });
    return count > 0;
}

/** Get all event registrations (for admin) */
export async function getAllEventRegistrations(): Promise<IEventRegistration[]> {
    await connectDB();
    return EventRegistration.find({}).sort({ registeredAt: -1 }).lean<IEventRegistration[]>();
}