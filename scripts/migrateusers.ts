import 'dotenv/config';
import { migrateUsersToV2 } from '../lib/db';
migrateUsersToV2()
    .then(() => {
        console.log('Migration done');
        process.exit(0);
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });