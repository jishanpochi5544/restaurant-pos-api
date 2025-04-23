require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('../models/MenuItem');

const restaurantId = '6808c1f67b7671157a6fdb94'; // Burger Kingdom ID

const showMenuItems = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find menu items for the specified restaurant
    const menuItems = await MenuItem.find({ restaurant_id: restaurantId });
    
    console.log(`Found ${menuItems.length} menu items for restaurant ID: ${restaurantId}`);
    console.log('\nMenu Items:');
    
    menuItems.forEach(item => {
      console.log(`- ${item.name} (${item.category})`);
      console.log(`  Price: ${item.price}`);
      console.log(`  ID: ${item._id}`);
      console.log(`  Available: ${item.is_available}`);
      console.log('');
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    process.exit(1);
  }
};

showMenuItems(); 