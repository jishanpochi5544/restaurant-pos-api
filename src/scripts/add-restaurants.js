require('dotenv').config();
const mongoose = require('mongoose');
const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');

const addRestaurants = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create new restaurants
    const restaurants = await Restaurant.create([
      {
        name: 'Burger Kingdom'
      },
      {
        name: 'Sushi Paradise'
      },
      {
        name: 'Taco Town'
      }
    ]);

    console.log('New restaurants created:');
    restaurants.forEach(restaurant => {
      console.log(`- ${restaurant.name} (ID: ${restaurant._id})`);
    });

    // Create menu items for Burger Kingdom
    const burgerKingdomMenuItems = await MenuItem.create([
      {
        restaurant_id: restaurants[0]._id,
        name: 'Classic Burger',
        price: 250,
        category: 'Burgers',
        is_available: true
      },
      {
        restaurant_id: restaurants[0]._id,
        name: 'Cheese Burger',
        price: 300,
        category: 'Burgers',
        is_available: true
      },
      {
        restaurant_id: restaurants[0]._id,
        name: 'French Fries',
        price: 120,
        category: 'Sides',
        is_available: true
      },
      {
        restaurant_id: restaurants[0]._id,
        name: 'Chocolate Shake',
        price: 150,
        category: 'Beverages',
        is_available: true
      }
    ]);

    // Create menu items for Sushi Paradise
    const sushiParadiseMenuItems = await MenuItem.create([
      {
        restaurant_id: restaurants[1]._id,
        name: 'California Roll',
        price: 350,
        category: 'Sushi Rolls',
        is_available: true
      },
      {
        restaurant_id: restaurants[1]._id,
        name: 'Salmon Nigiri',
        price: 280,
        category: 'Nigiri',
        is_available: true
      },
      {
        restaurant_id: restaurants[1]._id,
        name: 'Miso Soup',
        price: 100,
        category: 'Soups',
        is_available: true
      },
      {
        restaurant_id: restaurants[1]._id,
        name: 'Green Tea',
        price: 80,
        category: 'Beverages',
        is_available: true
      }
    ]);

    // Create menu items for Taco Town
    const tacoTownMenuItems = await MenuItem.create([
      {
        restaurant_id: restaurants[2]._id,
        name: 'Chicken Taco',
        price: 180,
        category: 'Tacos',
        is_available: true
      },
      {
        restaurant_id: restaurants[2]._id,
        name: 'Beef Burrito',
        price: 250,
        category: 'Burritos',
        is_available: true
      },
      {
        restaurant_id: restaurants[2]._id,
        name: 'Nachos',
        price: 200,
        category: 'Sides',
        is_available: true
      },
      {
        restaurant_id: restaurants[2]._id,
        name: 'Mexican Cola',
        price: 90,
        category: 'Beverages',
        is_available: true
      }
    ]);

    console.log('\nMenu items created for each restaurant:');
    console.log(`- Burger Kingdom: ${burgerKingdomMenuItems.length} items`);
    console.log(`- Sushi Paradise: ${sushiParadiseMenuItems.length} items`);
    console.log(`- Taco Town: ${tacoTownMenuItems.length} items`);

    console.log('\nAll restaurants and menu items added successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error adding restaurants:', error);
    process.exit(1);
  }
};

addRestaurants(); 