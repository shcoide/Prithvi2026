import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

export interface User {
    registrationId: string;   // e.g. PRITHVI260001
    name: string;
    email: string;
    phone: string;
    passwordHash: string;
    emailVerified: boolean;
    paymentVerified: boolean;
    paymentScreenshot: string; // filename saved in data/uploads/payments/
    registeredAt: string;
}

interface DB {
    counter: number;
    users: User[];
}

function readDB(): DB {
    try {
        const raw = fs.readFileSync(DB_PATH, 'utf-8');
        return JSON.parse(raw) as DB;
    } catch {
        return { counter: 0, users: [] };
    }
}

function writeDB(db: DB): void {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
}

export function getNextRegistrationId(): string {
    const db = readDB();
    db.counter += 1;
    writeDB(db);
    const padded = String(db.counter).padStart(4, '0');
    return `PRITHVI26${padded}`;
}

export function getAllUsers(): User[] {
    return readDB().users;
}

export function getUserByEmail(email: string): User | undefined {
    return readDB().users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function getUserByRegistrationId(id: string): User | undefined {
    return readDB().users.find((u) => u.registrationId === id);
}

export function createUser(user: User): void {
    const db = readDB();
    db.users.push(user);
    writeDB(db);
}

export function updateUser(email: string, updates: Partial<User>): void {
    const db = readDB();
    const idx = db.users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());
    if (idx !== -1) {
        db.users[idx] = { ...db.users[idx], ...updates };
        writeDB(db);
    }
}

export function getCounter(): number {
    return readDB().counter;
}
