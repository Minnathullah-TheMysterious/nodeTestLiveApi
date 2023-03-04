# Page 1

> List of city
- http://localhost:9310/location

> List of restaurants
- http://localhost:9310/restaurants

> Restaurants wrt city
- http://localhost:9310/restaurants/1

> List of meal type
- http://localhost:9310/mealType

# page 2

> Rstaurants wrt Meal Type
- http://localhost:9310/restaurants?mealId=4

> Rstaurants wrt Meal Type & cuisine
- http://localhost:9310/restaurants/filter/1?cuisineId=1

> Rstaurants wrt Meal Type & cost
- http://localhost:9310/restaurants/filter/1?lcost=100&hcost=300

> Sort on basis of price
- http://localhost:9310/restaurants/filter/1?lcost=100&hcost=700&sort=-1

# page 3

> Details of Restaurant
- http://localhost:9310/restaurants/details/1

> Menu wrt to Restaurant
- http://localhost:9310/menu/12

# page 4

> Menu Details
- http://localhost:9310/menuItem (POST)
  {
   "id": [1, 10, 20, 30]
  }

> Place Order
- http://localhost:9310/placeOrder (POST)
  {
  "name": "Minnathullah",
  "email": "minnathullahmohammed@gmail.com",
  "address": "Hno 5-16, maddur(vill & mdl) 506367",
  "phone": 6281089096,
  "cost": 556,
  "menuItem": [
  3,
  5,
  7
  ],
  "status": "Pending"
  }

# page 5

> List order
- http://localhost:9310/orders

> Order wrt to Email
- http://localhost:9310/orders?email=aakash@gmail.com

> Update payment details
- http://localhost:9310/updateOrder/1 (PUT)
  {
    "status": "delivered",
    "bank_name": "SBI",
    "date": "05/03/2023"
  }

> Delete orders
- http://localhost:9310/deleteOrder/64031d199ae798661744f81e (DELETE)
