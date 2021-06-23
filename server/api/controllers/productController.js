const mongoose = require('mongoose');
const Product = require('../models/productModel');
const { ObjectID } = require('mongodb');

exports.getAll = async function(req, res) {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: 200,
      message: 'Products received.',
      data: products == null ? [] : products,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err,
    });
  }
};

exports.get = async function(req, res) {
  if (!ObjectID.isValid(req.params.id)) {
    res.status(404).json({
      status: 404,
      message: 'Invalid Product Id.',
    });

    return;
  }

  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json({
      status: 200,
      message: 'Product fetched.',
      data: product == null ? {} : product, //TODO: do we need to send a response if there is no such product
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err,
    });
  }
};

exports.createProduct = async function(req, res) {
  let product = new Product(req.body);
  
  try {
    product.img = req.file.path;
  } catch (err) {
    console.log(err);
    product.img = "none";
  }

  try {
    const response = await product.save();
    res.status(200).json({
      status: 200,
      message: "Product created.",
      data: response,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err,
    });
  }
};

exports.updateProduct = async function(req, res) {
  if (!ObjectID.isValid(req.params.id)) {
    res.status(404).json({
      status: 404,
      message: 'Invalid Product Id.',
    });

    return;
  }

  try {
    const response = await Product.findOneAndUpdate({_id: req.params.id}, req.body);
    res.status(200).json({
      status: 200,
      message: "Product updated.",
      data: response,
    });
  } catch (err) {
    res.status(500).json({
      stats: 500,
      message: err,
    });
  }
};

exports.deleteProduct = async function(req, res) {
  if (!ObjectID.isValid(req.params.id)) {
    res.status(404).json({
      status: 404,
      message: 'Invalid Product Id.',
    });

    return;
  }
  

  try {
    
    console.log(req.params.id);
    const response = await Product.deleteOne({_id: req.params.id});

    res.status(200).json({
      status: 200,
      message: "Product deleted.",
      data: response,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err,
    });
  }
};


