const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: { type: String },
    barcode: { type: String },
    brand: { type: String },
    ingredients: { type: Array},
    countryOrigin: { type: String },
    categoryName: { type: String },
    description: { type: String },
    photos: { type: String },
    minerals: { type: Array },
    allergens: { type: Array },
    classificationPhoto: { type: Array },
    comment: { type: Array },
  },
  { timestamps: true }
);

const model = mongoose.model("product", productSchema);
module.exports = model;