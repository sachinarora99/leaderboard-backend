const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user');

dotenv.config();

const users = [
  'Rahul',
  'Kamal',
  'Sanak',
  'Amit',
  'Neha',
  'Ravi',
  'Priya',
  'Ankit',
  'Sneha',
  'Vikas',
];

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await User.deleteMany(); // Clear old data (optional)
    const userData = users.map((name) => ({ name }));
    await User.insertMany(userData);

    console.log('✅ Users seeded successfully');
    mongoose.connection.close();
  } catch (err) {
    console.error('❌ Error seeding users:', err);
    mongoose.connection.close();
  }
};

seedUsers();
