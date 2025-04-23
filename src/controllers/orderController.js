const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const { validationResult } = require('express-validator');

exports.createOrder = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { restaurant_id, customer_name, order_type, items } = req.body;

    // Validate and get menu items
    const menuItemIds = items.map(item => item.menu_item_id);
    const menuItems = await MenuItem.find({
      _id: { $in: menuItemIds },
      restaurant_id,
      is_available: true
    });

    if (menuItems.length !== menuItemIds.length) {
      return res.status(400).json({
        error: 'One or more menu items are not available or invalid'
      });
    }

    // Calculate order items with totals
    const orderItems = items.map(item => {
      const menuItem = menuItems.find(mi => mi._id.toString() === item.menu_item_id);
      return {
        menu_item_id: menuItem._id,
        name: menuItem.name,
        quantity: item.quantity,
        price: menuItem.price,
        total: menuItem.price * item.quantity
      };
    });

    // Calculate total price
    const total_price = orderItems.reduce((sum, item) => sum + item.total, 0);

    // Create order
    const order = new Order({
      restaurant_id,
      customer_name,
      order_type,
      items: orderItems,
      total_price
    });

    await order.save();

    res.status(201).json({
      id: order._id,
      customer_name: order.customer_name,
      order_type: order.order_type,
      created_at: order.created_at,
      items: order.items,
      total_price: order.total_price
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Error creating order' });
  }
};

exports.getOrder = async (req, res) => {
  try {
    console.log('Getting order with ID:', req.params.id);
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      console.log('Order not found');
      return res.status(404).json({ error: 'Order not found' });
    }

    console.log('Order found:', order);

    res.json({
      id: order._id,
      customer_name: order.customer_name,
      order_type: order.order_type,
      created_at: order.created_at,
      items: order.items,
      total_price: order.total_price
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Error fetching order' });
  }
}; 