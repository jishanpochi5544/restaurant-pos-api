const express = require('express');
const { body } = require('express-validator');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.post(
  '/',
  [
    body('restaurant_id').notEmpty().withMessage('Restaurant ID is required'),
    body('customer_name').notEmpty().withMessage('Customer name is required'),
    body('order_type')
      .notEmpty()
      .isIn(['DINE_IN', 'TAKEAWAY', 'DELIVERY'])
      .withMessage('Valid order type is required'),
    body('items')
      .isArray({ min: 1 })
      .withMessage('At least one item is required'),
    body('items.*.menu_item_id').notEmpty().withMessage('Menu item ID is required'),
    body('items.*.quantity')
      .isInt({ min: 1 })
      .withMessage('Quantity must be at least 1')
  ],
  orderController.createOrder
);

router.get('/:id', orderController.getOrder);

module.exports = router; 