const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        console.log('Attempting to the connect to mongodb with URI: ', process.env.MONGO_URI);
        const buildConnection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDb Connected ${buildConnection.connection.host}`);
    }catch (error) {
        console.error('mongoDb connection Error: ', error);
        process.exit(1);
    }
}

module.exports = connectDb;