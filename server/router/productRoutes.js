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
                //.post(productController.createProduct);
                .post(upload.single('img'), productController.createProduct);

router.route('/products/:id')
                .get(productController.get)
                .put(productController.updateProduct)
                .delete(productController.deleteProduct);

module.exports = router;
