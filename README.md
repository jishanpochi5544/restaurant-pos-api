<<<<<<< HEAD
# Restaurant POS API

A Node.js-based REST API for managing restaurant orders. This API allows creating and retrieving orders for a restaurant POS system.

## Features

- Create new orders with multiple items
- Retrieve order details
- Automatic price calculation
- Menu item availability validation
- MongoDB integration
- User-friendly web interface

## Tech Stack

- Node.js with Express
- MongoDB with Mongoose
- Express Validator for request validation
- CORS enabled
- Environment variables support with dotenv
- Bootstrap for the web interface

## Database Structure

The application uses three main collections:

1. **restaurants** - Stores restaurant information
   ```json
   {
     "_id": ObjectId,
     "name": "Pizza Palace"
   }
   ```

2. **menu_items** - Stores menu items for each restaurant
   ```json
   {
     "_id": ObjectId,
     "restaurant_id": ObjectId,
     "name": "Margherita Pizza",
     "price": 300,
     "category": "Pizza",
     "is_available": true
   }
   ```

3. **orders** - Stores customer orders
   ```json
   {
     "_id": ObjectId,
     "restaurant_id": ObjectId,
     "customer_name": "Alice",
     "order_type": "DINE_IN",
     "created_at": Date,
     "items": [
       {
         "menu_item_id": ObjectId,
         "name": "Margherita Pizza",
         "quantity": 2,
         "price": 300,
         "total": 600
       }
     ],
     "total_price": 600
   }
   ```

## Setup Instructions

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/YOUR-USERNAME/restaurant-pos-api.git
cd restaurant-pos-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=3001
# Local MongoDB connection
MONGODB_URI=mongodb://127.0.0.1:27017/restaurant-pos
# For production, use MongoDB Atlas connection string
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/restaurant-pos
NODE_ENV=development
```

4. Start MongoDB locally or update the MONGODB_URI to point to your MongoDB instance

5. Seed the database with sample data:
```bash
npm run seed
```

6. Start the development server:
```bash
npm run dev
```

7. Open your browser and navigate to: http://localhost:3001

## API Documentation

### Create Order
- **POST** `/orders`
- Creates a new order with the specified items

#### Request Body
```json
{
  "restaurant_id": "6808c021460b8772e55d1eff",
  "customer_name": "Alice",
  "order_type": "DINE_IN",
  "items": [
    {
      "menu_item_id": "6808c021460b8772e55d1f01",
      "quantity": 2
    },
    {
      "menu_item_id": "6808c021460b8772e55d1f03",
      "quantity": 1
    }
  ]
}
```

#### Response
```json
{
  "id": "6808c1286c96b6b05ed68d9f",
  "customer_name": "Alice",
  "order_type": "DINE_IN",
  "created_at": "2024-04-23T10:30:00.416Z",
  "items": [
    {
      "name": "Margherita Pizza",
      "quantity": 2,
      "price": 300,
      "total": 600
    },
    {
      "name": "Garlic Bread",
      "quantity": 1,
      "price": 150,
      "total": 150
    }
  ],
  "total_price": 750
}
```

### Get Order
- **GET** `/orders/:id`
- Retrieves order details by ID

#### Response
```json
{
  "id": "6808c1286c96b6b05ed68d9f",
  "customer_name": "Alice",
  "order_type": "DINE_IN",
  "created_at": "2024-04-23T10:30:00.416Z",
  "items": [
    {
      "name": "Margherita Pizza",
      "quantity": 2,
      "price": 300,
      "total": 600
    },
    {
      "name": "Garlic Bread",
      "quantity": 1,
      "price": 150,
      "total": 150
    }
  ],
  "total_price": 750
}
```

## Testing with cURL

### Create Order
```bash
curl -X POST http://localhost:3001/orders \
-H "Content-Type: application/json" \
-d '{"restaurant_id":"6808c021460b8772e55d1eff","customer_name":"Alice","order_type":"DINE_IN","items":[{"menu_item_id":"6808c021460b8772e55d1f01","quantity":2},{"menu_item_id":"6808c021460b8772e55d1f03","quantity":1}]}'
```

### Get Order
```bash
curl http://localhost:3001/orders/6808c1286c96b6b05ed68d9f
```

## Deployment

### Deploying to Render

1. Create a MongoDB Atlas account and get your connection string
2. Sign up for [Render](https://render.com/)
3. Create a new Web Service and connect your GitHub repository
4. Configure the service:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment Variables:
     - `PORT`: 10000 (Render uses this port by default)
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `NODE_ENV`: production

### Deployed API Base URL
```
https://restaurant-pos-api.onrender.com
```

## Project Structure

- `src/`
  - `models/` - Database models using Mongoose
  - `controllers/` - Business logic for API endpoints
  - `routes/` - API route definitions
  - `scripts/` - Utility scripts for database seeding
  - `public/` - Static files for web interface
  - `index.js` - Application entry point

## Error Handling

The API includes validation for:
- Required fields
- Valid order types
- Menu item availability
- Valid quantities
- Restaurant and menu item existence

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 
=======
# restaurant-pos-api
>>>>>>> 2946cf068841476d380d8f893961582103affdfd
