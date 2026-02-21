import { connectDB } from './mongodb';
import { models, model, Schema } from 'mongoose';

const UserSchema = new Schema({}, { strict: false });
const User = models.User || model('User', UserSchema);

async function check() {
    await connectDB();
    const user = await User.findOne({ email: "test_uploadthing@example.com" }).lean();
    console.log(user);
    process.exit(0);
}
check();
