import mongoose from 'mongoose';

const connectMongo = async () => {
    try {
        const{ connection } = await mongoose.connect(process.env.MONGODB_URL)

        if (connection.readyState == 1) {
            console.log("Database Connected")
        }
    } catch (error) {
        return Promise.reject(error)
    }
}

export default connectMongo;