const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.delete('/:cid/products/:pid', cartController.deleteProductInCart);
router.put('/:cid', cartController.updateCart);
router.put('/:cid/products/:pid', cartController.updateProductQuantity);
router.delete('/:cid', cartController.clearCart);
router.get('/:cid', cartController.getCart);

module.exports = router;
