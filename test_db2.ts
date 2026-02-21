require('dotenv').config({path: '.env.local'});
const mongoose = require('mongoose');

async function test() {
    try {
        await mongoose.connect('mongodb+srv://Prithvi_data:dbDataPrithvi26@prithvidata.fgtw4p2.mongodb.net/prithvi2026?retryWrites=true&w=majority&appName=PrithviData', { serverSelectionTimeoutMS: 5000 });
        console.log("Connected using dbDataPrithvi26");
    } catch(err) {
        console.error("Failed dbData", err.message);
    }
    process.exit(0);
}
test();
