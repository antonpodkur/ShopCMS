const mongoose = require('mongoose');
const faker = require('faker');
const dotenv = require('dotenv');
const minimist = require('minimist');

dotenv.config({path: '../.env'});

const Product = require('../models/productModel');

mongoose.connect(process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }, () => {
        console.log("DB is connected");
    });


const importData = async function() {
  const newProduct = new Product();

  newProduct.name = faker.commerce.productName();
  newProduct.price = faker.commerce.price();
  newProduct.description = faker.commerce.productDescription();

  try {
    await newProduct.save();
    console.log('success');
  } catch (err) {
    console.log(err);
  }
  
};

const deleteData = async function() {
  try {
    await Product.deleteOne();
    console.log('success');
  } catch (err) {
    console.log(err);
  }
};

const deleteAllData = async function() {
  try {
    await Product.deleteMany();
    console.log('success');
  } catch (err) {
    console.log(err);
  }
};

const args = minimist(process.argv.slice(2), {alias: {import: 'i', delete: 'd'}});
console.log(args);

if (args.import) {
  if (typeof(args.import) == 'number') {
    console.log(args.import);
    for (let i = 0; i < args.import; i++ ) {
      importData();
    }
  } else {
    importData();
  }
}

if (args.delete) {
  if (typeof(args.delete) == 'number') {
    console.log(args.delete);
    for (let i = 0; i < args.delete; i++ ) {
      deleteData();
    }
  } else {
    deleteAllData();
  }
}


