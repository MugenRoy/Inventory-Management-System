require('dotenv').config();

const express = require("express");
const mongoose = require('mongoose');

const app = express();
app.use(express.static('public'));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected'))
    .catch(err => console.error('Error:', err));

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 }
});

const Product = mongoose.model('Product', productSchema);

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});


app.post("/products", async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
});


app.put("/products/:id", async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
});

app.delete("/products/:id", async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted successfully" });
});

app.listen(process.env.PORT, () => {
    console.log("Server is listening");
});
