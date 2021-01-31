const Item = require("../model/product");
const mongoose = require("mongoose");
const connectDB = require('../config/db')
require("dotenv").config();

//connecting to db
connectDB() ;

const product = [
  new Product({
    id: 1,
    title: "Burger",
    price: 299,
    inStock: "yes",
    description: "Stack Inside BBQ Burger",
    menu: "randommenutype01",
    createdAt: new Date(),
  }),
  new Product({
    id: 2,
    title: "Pasta",
    price: 350,
    inStock: "yes",
    description: "Oven Baked Cheese chicken Pasta",
    menu: "randommenutype02",
    createdAt: new Date(),
  }),
  new Product({
    id: 3,
    title: "Pasta",
    price: 450,
    inStock: "yes",
    description: "Oven Baked beef Cheese Pasta.",
    menu: "randommenutype02",
    createdAt: new Date(),
  }),
  new Product({
    id: 4,
    title: "Ramen",
    price: 499,
    inStock: "yes",
   
    description: "Beef Spicy Ramen.",
    menu: "randommenutype03",
    createdAt: new Date(),
  }),
  new Product({
    id: 5,
    title: "Ramen",
    price: 349,
    inStock: "yes",
    description: "SeaFood Ramen",
    menu: "randommenutype03",
    createdAt: new Date(),
  }),
  new Product({
    id: 6,
    title: "Soup",
    price: 199,
    inStock: "yes",
    description: "Thai Soup.",
    menu: "randommenutype04",
    createdAt: new Date(),
  }),
  new Product({
    id: 7,
    title: "Soup",
    price: 299,
    inStock: "yes",
    description: "SeaFood Soup",
    menu: "randommenutype04",
    createdAt: new Date(),
  }),
  new Product({
    id: 8,
    title: "Soup",
    price: 499,
    inStock: "yes",
    description: "Cream of mushroom soup",
    menu: "randommenutype05",
    createdAt: new Date(),
  }),
  new Product({
    id: 9,
    title: "Thai Fry Chicken",
    price: 350,
    inStock: "yes",
    description: "Thai Spicy Chicken Fry.",
    menu: "randommenutype06",
    createdAt: new Date(),
  }),
  new Product({
    id: 10,
    title: "Fried Rice",
    price: 199,
    inStock: "yes",

    description: "Thai Fried Rice.",
    menu: "randommenutype06",
    createdAt: new Date(),
  }),
];

let count = 0;

product.forEach((user) => {
  user.save(async (err, result) => {
    count++;
    if (count == product.length) {
      exit();
    }
  });
});

function exit() {
  mongoose.disconnect();
}

module.exports = product;