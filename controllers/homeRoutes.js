const router = require("express").Router();
const { Product } = require("../models");
const withAuth = require("../utils/auth");

// GET route for display all products on the homepage
router.get("/", async (req, res) => {
  const productsDataDb = await Product.findAll({});
  const products = productsDataDb.map((product) => {
    let out = product.get({ plain: true });
    return { ...out, homepage: true };
  });
  res.render("home", { products, logged_in: req.session.logged_in });
});

//GET route is for login page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

//GET route for navigating to the profile
router.get("/profile", withAuth, async (req, res) => {
  const productsDataDb = await Product.findAll({
    where: {
      user_id: req.session.user_id,
    },
  });
  const products = productsDataDb.map((product) => {
    let out = product.get({ plain: true });
    return { ...out, profile: true };
  });
  res.render("profile", { products, logged_in: req.session.logged_in });
});

// GET route for navigating to add new product page
router.get("/profile/products", withAuth, (req, res) => {
  res.render("products", { logged_in: req.session.logged_in });
});

router.get("/profile/products/:id", withAuth, async (req, res) => {
  const productDataDb = await Product.findByPk(req.params.id,{
    where: {
      user_id: req.session.user_id,
    }
  }) 
  const product = productDataDb.get({plain:true});

  res.render("products", {product, logged_in: req.session.logged_in });
});
module.exports = router;
