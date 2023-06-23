const { Router } = require("express");
const { ProductModel } = require("../Model/Product.Model");
const productRoute = Router();

productRoute.get("/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    let data = await ProductModel.find({ _id: ID });
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});




productRoute.get("/", async (req, res) => {
  try {
    const min = parseInt(req.query.min);
    const max = parseInt(req.query.max);
    const brand = req.query.brand;
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 1000;
    const search = req.query.search || "";
    let category = req.query.category;

    const filters = [{ title: { $regex: search, $options: "i" } }];
    if (min) filters.push({ price: { $gte: min } });
    if (max) filters.push({ price: { $lte: max } });
    if (brand) filters.push({ brand: brand });
    if (category) filters.push({ category: category });

    const sortBy = {};
    if (req.query.price) sortBy["price"] = req.query.price;
    if (req.query.rating) sortBy["rating"] = req.query.rating;

    const products = await ProductModel.find({ $and: filters })
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    res.send(products);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: true, message: "Internal Server Error" });
  }
});



productRoute.post("/create", async (req, res) => {
  try {
    await ProductModel.insertMany(req.body);
    res.status(201).send({ msg: "Product has been added" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

productRoute.patch("/update/:id", async (req, res) => {
  const ID = req.params.id;
  const payload = req.body;
  try {
    await ProductModel.findByIdAndUpdate({ _id: ID }, payload);
    res.send({ msg: `Product with id:${ID} has been updated` });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

productRoute.delete("/delete/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    await ProductModel.findByIdAndDelete({ _id: ID });
    res.send({ msg: `Product with id:${ID} has been deleted` });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = { productRoute };
