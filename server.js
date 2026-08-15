const express = require("express");
const mongoose = require('mongoose');

const app = express();

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 }
});

const Product = mongoose.model('Product', productSchema);

app.get("/products", (req, res) => {
  const products = Product.find();
  res.header("Access-Control-Allow-Origin", "*");
  res.json(products);
});


app.post("/products", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
});


app.put("/products/:id", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
});

app.delete("/products/:id", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
});
