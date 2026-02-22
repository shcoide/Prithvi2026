import { connectDB } from "./lib/mongodb";
async function run() {
    try {
        console.log("Connecting...");
        await connectDB();
        console.log("Connected to MongoDB!");
    } catch(err) {
        console.error("DB error:", err);
    }
    process.exit(0);
}
run();
