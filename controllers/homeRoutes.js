const router = require("express").Router();
const { Product } = require('../models')
const withAuth = require("../utils/auth");

// GET route for display all products on the homepage
router.get("/", async (req, res) => {
  const productsDataDb = await Product.findAll({});
  const products = productsDataDb.map((product) => product.get({plain:true}));
  res.render("home", {products, logged_in: req.session.logged_in, homepage: true });
});
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('login');
});
router.get("/profile", withAuth, async (req, res) => {
  const productsDataDb = await Product.findAll({
    where: {
      user_id: req.session.user_id
    }
  });
  const products = productsDataDb.map((product) => product.get({plain:true}));
  res.render("profile", {products, logged_in: req.session.logged_in });
});

module.exports = router;
