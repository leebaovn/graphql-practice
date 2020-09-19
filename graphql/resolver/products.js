const Product = require('../../models/product');
const Event = require('../../models/event');
const { transformProduct } = require('./merge');
module.exports = {
  products: async () => {
    try {
      const productList = await Product.find();
      return productList;
    } catch (err) {
      throw 'err';
    }
  },
  createProduct: async ({ product }, req) => {
    // if (!req.isAuth) {
    //   throw new Error('Only Admin can do this!');
    // }
    const prod = new Product({
      name: product.name,
      description: product.description,
      price: +product.price,
      discount: product.discount || 0,
    });
    try {
      const prodcreated = await prod.save();
      return transformProduct(prodcreated);
    } catch (err) {
      throw err;
    }
  },
};
