require('dotenv').config();
const mongoose = require('mongoose');
const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Restaurant.deleteMany({});
    await MenuItem.deleteMany({});

    // Create a sample restaurant
    const restaurant = await Restaurant.create({
      name: 'Pizza Palace'
    });

    // Create sample menu items
    const menuItems = await MenuItem.create([
      {
        restaurant_id: restaurant._id,
        name: 'Margherita Pizza',
        price: 300,
        category: 'Pizza',
        is_available: true
      },
      {
        restaurant_id: restaurant._id,
        name: 'Pepperoni Pizza',
        price: 400,
        category: 'Pizza',
        is_available: true
      },
      {
        restaurant_id: restaurant._id,
        name: 'Garlic Bread',
        price: 150,
        category: 'Sides',
        is_available: true
      },
      {
        restaurant_id: restaurant._id,
        name: 'Coke',
        price: 60,
        category: 'Beverages',
        is_available: true
      }
    ]);

    console.log('Sample data created successfully');
    console.log('Restaurant ID:', restaurant._id);
    console.log('Menu Items:', menuItems.map(item => ({
      id: item._id,
      name: item.name
    })));

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData(); 