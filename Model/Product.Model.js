const { Schema, model, mongoose } = require("mongoose");
const productSchema = mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    productId: { type: Schema.Types.ObjectId, ref: "product" },

    title: {
      type: String,
      required: true,
    },
    post_uploaded: {
      type: String,
      required: true,
    },
    imageSrc: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    distance: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    featured: {
      type: String,
    },
    warranty: {
      type: String,
    },

    image1: {
      type: String,
    },
    image2: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

const ProductModel = mongoose.model("product", productSchema);

module.exports = { ProductModel };
