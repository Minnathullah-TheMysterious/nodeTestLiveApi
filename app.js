const express = require("express");
const app = express();
const dbConnect = require("./mongodb");
const cors = require("cors");
app.use(cors())
const mongodb = require("mongodb"); ////require this for selecting item by ObjectId 
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT || 9310;

app.use(express.json());

app.get('/', (req, res)=>{
  res.send('Welcome to the node test API')
})
main = async () => {
  const db = await dbConnect();

  //get all locations or states
  app.get("/location", async (req, res) => {
    const locationCollection = db.collection("location");
    const data1 = await locationCollection.find().toArray();
    res.send(data1);
  });

  //get restaurants wrt state or city
  app.get("/restaurants/:id", async (req, res) => {
    const stateId = Number(req.params.id);
    const restaurantCollection = db.collection("restaurants");
    const data5 = await restaurantCollection
      .find({ state_id: stateId })
      .toArray();
    res.send(data5);
  });

  //get all meal type
  app.get("/mealType", async (req, res) => {
    const mealTypeCollection = db.collection("mealType");
    const data2 = await mealTypeCollection.find().toArray();
    res.send(data2);
  });

  //get all restaurants wrt state as well as mealtype
  app.get("/restaurants", async (req, res) => {
    let stateId = Number(req.query.stateId);
    let mealId = Number(req.query.mealId);

    let query;
    if (stateId) {
      query = { state_id: stateId };
    } else if (mealId) {
      query = { "mealTypes.mealtype_id": mealId };
    } else {
      query = {};
    }

    const restaurantCollection = db.collection("restaurants");
    const data5 = await restaurantCollection.find(query).toArray();
    res.send(data5);
  });

  //restaurants wrt mealType --> and/or cuisine --> and/or cost --> sort also added
  app.get("/restaurants/filter/:id", async (req, res) => {
    let mealId = Number(req.params.id);
    let cuisineId = Number(req.query.cuisineId);
    let lcost = Number(req.query.lcost);
    let hcost = Number(req.query.hcost);
    let query;
    let sort = { cost: 1 };

    if (req.query.sort) {
      sort = { cost: req.query.sort };
    }

    if (cuisineId) {
      query = {
        "cuisines.cuisine_id": cuisineId,
        "mealTypes.mealtype_id": mealId,
      };
    } else if (hcost && lcost) {
      query = {
        $and: [{ cost: { $gt: lcost, $lt: hcost } }], //helps to see the values b/w two ranges
        "mealTypes.mealtype_id": mealId,
      };
    } else {
      query = { "mealTypes.mealtype_id": mealId };
    }

    const restaurantCollection = db.collection("restaurants");
    const data5 = await restaurantCollection.find(query).sort(sort).toArray();
    res.send(data5);
  });
  
  //restaurant details by restaurant id
  app.get("/restaurants/details/:id", async (req, res) => {
    const restaurantId = Number(req.params.id);
    const restaurantCollection = db.collection("restaurants");
    const data5 = await restaurantCollection
      .find({ restaurant_id: restaurantId })
      .toArray();
    res.send(data5);
  });

  //menu wrt restaurant. if variables on the either side of the colon is same then the single variable can be taken
  app.get("/menu/:id", async (req, res) => {
    const restaurant_id = Number(req.params.id);
    const menuCollection = db.collection("menu");
    const data3 = await menuCollection.find({ restaurant_id }).toArray();
    res.send(data3);
  });
  
  //get all menu
  app.get("/menu", async (req, res) => {
    const menuCollection = db.collection("menu");
    const data3 = await menuCollection.find().toArray();
    res.send(data3);
  });

  //get menu wrt it's id
  app.post("/menuItem", async (req, res) => {
    if (Array.isArray(req.body.id)) {
      const menuCollection = db.collection("menu");
      const data3 = await menuCollection.find({menu_id: {$in:req.body.id}}).toArray(); //$in --> selects the values with all the given ids in the array
      res.send(data3);
    }else{
      res.send('invalid input')
    }
  });

  //place order
  app.post("/placeOrder", async (req, res) => {
    const ordersCollection = db.collection("orders");
    const data = await ordersCollection.insertOne(req.body);
    res.send(data);
  });
  
  //get all the orders & orders wrt email
  app.get("/orders", async (req, res) => {
    const email = req.query.email;
    let query;
    if (email) {
      query = { email: email };
    } else {
      query = {};
    }
    const ordersCollection = db.collection("orders");
    const data4 = await ordersCollection.find(query).toArray();
    res.send(data4);
  });

  //update order
  app.put("/updateOrder/:id", async (req, res) => {
    const orderId = Number(req.params.id);
    const ordersCollection = db.collection("orders");
    const data = await ordersCollection.update(
      { order_id: orderId },
      {
        $set: {
          status: req.body.status,
          bank_name: req.body.bank_name,
          date: req.body.date,
        },
      }
    );
    res.send(data);
  });

  //delete order by object id
  app.delete("/deleteOrder/:id", async (req, res) => {
    const objectId = req.params.id;
    const ordersCollection = db.collection("orders");
    const data = await ordersCollection.deleteOne({
      _id: new mongodb.ObjectId(objectId),
    });
    res.send(data);
  });
};

main();

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`app listening on port ${port}`);
});
