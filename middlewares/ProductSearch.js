const Product = require("../models/Product");

const productSearch = async (req, res, next) => {
  try {
    const keyword = req.params.keyword.toLowerCase();
    const prod = await Product.find({
      $or: [
        { productName: { $regex: new RegExp(keyword, "i") } },
        { brand: { $regex: new RegExp(keyword, "i") } },
        { categoryName: { $regex: new RegExp(keyword, "i") } },
        { countryOrigin: { $regex: new RegExp(keyword, "i") } },
      ],
    });
    req.reqUser = prod;
   next()
  } catch (error) {
    next(error);
  }
};
module.exports = productSearch;