import mongoose from 'mongoose';


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`mongodb+srv://get-me-a-chai:kunal123@cluster0.vgojcu5.mongodb.net/food-ordaring?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: {conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

export default connectDB;

