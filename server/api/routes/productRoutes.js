const express = require('express');
const router = express.Router();
const upload = require('../controllers/fileController');

const productController = require('../controllers/productController');

router.get('/', (req, res) => {
  res.json({
    status: 200,
    message: 'default api path.',
  });
});

router.route('/products')
                .get(productController.getAll)
                .post(upload, productController.createProduct);

router.route('/products/:id')
                .get(productController.get)
                .put(upload,productController.updateProduct)
                .delete(productController.deleteProduct);

module.exports = router;
