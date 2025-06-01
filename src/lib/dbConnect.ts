import mongoose from 'mongoose';

type ConnectionObject = {
    isConnected?: number;
    };

const connection: ConnectionObject = {};

async function dbConnect() {
    if (connection.isConnected) {
        console.log('Database is already connected');
        return;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI || '', {})
        connection.isConnected = mongoose.connections[0].
        readyState
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
}

export default dbConnect;
