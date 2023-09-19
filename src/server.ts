import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
let server: Server;
process.on("uncaughtException", (error) => {
    console.log(error);
    process.exit(1);
});
async function main() {

    try {
        await mongoose.connect(config.dbUri as string);
        server = app.listen(config.port, () => {
            console.log(`Connected to Database & Listenings to ${config.port}`);
        });
    } catch (err) {
        console.log('failed to connect db', err);
    }
    process.on('unhandledRejection', (error) => {
        if (server) {
            server.close(() => {
                console.log(error);
                process.exit(1);
            });
        } else {
            process.exit(1);
        }

    });
}
main();

process.on("SIGTERM", () => {
    console.log("Sigterm recieved");
    server.close(() => {
        process.exit(1);
    });
});
