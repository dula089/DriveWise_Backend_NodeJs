const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://chaniru:chaniru0418@cluster0.ricn6.mongodb.net/DriveWise?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected to:', mongoose.connection.name);
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
    process.exit(1); // Exit the process if connection fails
  }
};

module.exports = connectDB;