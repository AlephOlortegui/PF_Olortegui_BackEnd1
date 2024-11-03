const Cart = require('../models/Cart');

exports.deleteProductInCart = async (req, res) => {
    const { cid, pid } = req.params;
    const cart = await Cart.findById(cid);
    cart.products = cart.products.filter(p => p.productId.toString() !== pid);
    await cart.save();
    res.json(cart);
};

exports.updateCart = async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;
    const cart = await Cart.findByIdAndUpdate(cid, { products }, { new: true });
    res.json(cart);
};

exports.updateProductQuantity = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cart = await Cart.findById(cid);
    const productInCart = cart.products.find(p => p.productId.toString() === pid);
    if (productInCart) productInCart.quantity = quantity;
    await cart.save();
    res.json(cart);
};

exports.clearCart = async (req, res) => {
    const { cid } = req.params;
    const cart = await Cart.findByIdAndUpdate(cid, { products: [] }, { new: true });
    res.json(cart);
};

exports.getCart = async (req, res) => {
    const { cid } = req.params;
    const cart = await Cart.findById(cid).populate('products.productId');
    res.json(cart);
};
