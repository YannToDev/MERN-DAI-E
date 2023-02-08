import mongoose from 'mongoose';

// la propriété 'strictQuery' sera utile quand on bossera avec la fonctionnalité de recherche
const connectDB = async():Promise<void> =>{

    const  DB_URL =<string>process.env.MONGODB_URL
    mongoose.set('strictQuery', true);

   await mongoose.connect(DB_URL)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log(error));
};

export default connectDB;