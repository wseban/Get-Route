const router = require("express").Router();
const { Product } = require('../models')
// GET route for display all products on the homepage
router.get("/", async (req, res) => {
  const productsDataDb = await Product.findAll({});
  const products = productsDataDb.map((product) => product.get({plain:true}));
  res.render("home", {products, logged_in: req.session.logged_in });
});
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('login');
});

module.exports = router;
