const router = require("express").Router();
const { Product, ProductTag } = require("../../models");
const withAuth = require("../../utils/auth");

// POST route for creating a new product
router.post("/", async (req, res) => {
  try {
    const newProduct = await Product.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    if (req.body.tag_ids.length) {
      const productTagArr = req.body.tag_ids.map((tag_id) => {
        return {
          product_id: newProduct.id,
          tag_id,
        }
      })
      const productTagIds = await ProductTag.bulkCreate(productTagArr)
      res.status(200).json(productTagIds)
      return;
    }
    res.status(200).json(newProduct);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT route for updating the product's details like price, stock and description
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedProduct = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/purchase/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.increment(
      { stock: -1 },
      { where: { id: req.params.id } }
    )
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json(err);
  }
});


// DELETE route for removing the product from the inventory.
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!productData) {
      res.status(404).json({ message: "No product found with this id!" });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
