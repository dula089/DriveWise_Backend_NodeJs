const mongoose = require('mongoose');

// Replace <username>, <password>, and <dbname> with your MongoDB Atlas details
const mongoURI = 'mongodb+srv://chaniru:chaniru0418@cluster0.ricn6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
    process.exit(1); // Exit the process if connection fails
  }
};

module.exports = connectDB;