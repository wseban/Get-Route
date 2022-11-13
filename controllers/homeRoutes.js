const router = require("express").Router();
const { User, Product, Review, Tag, ProductTag } = require("../models");
const withAuth = require("../utils/auth");
const { Op } = require("sequelize");

// GET route for display all products on the homepage
router.get("/", async (req, res) => {
  const tagsDataDb = await Tag.findAll({});
  const tags = tagsDataDb.map((tag) => tag.get({ plain: true }));
  let whereClause = {};
  const searchString = req.query.search;
  if (searchString) {
    whereClause = {
      [Op.or]: [
        {
          name: {
            [Op.like]: `%${searchString}%`,
          },
        },
        {
          description: {
            [Op.like]: `%${searchString}%`,
          },
        },
      ],
    };
  }
  const allowedTags = req.query.tag_id;
  if (allowedTags) {
    const allowedProdsDb = await ProductTag.findAll({
      where: {
        tag_id: req.query.tag_id.split(",").map(Number),
      },
    });
    const allowedProds = allowedProdsDb
      .map((prod) => prod.get({ plain: true }))
      .map((prod) => prod.product_id);
    if (searchString) {
      whereClause[Op.or].push({
        id: allowedProds,
      });
    } else {
      whereClause = {
        id: allowedProds,
      };
    }

    for (tag of tags) {
      tag["checked"] = req.query.tag_id.split(",").map(Number).includes(tag.id);
    }
  }

  const productsDataDb = await Product.findAll({
    where: whereClause,
    include: [{ model: Tag }],
  });
  const products = productsDataDb.map((product) => {
    let out = product.get({ plain: true });
    return { ...out, homepage: true };
  });

  res.render("home", {
    products,
    tags,
    logged_in: req.session.logged_in,
    search: searchString,
  });
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
    include: [{ model: Tag }],
  });
  const userDataDb = await User.findByPk(req.session.user_id)
  const user = userDataDb.get({plain: true});
  const products = productsDataDb.map((product) => {
    let out = product.get({ plain: true });
    return { ...out, profile: true };
  });
  res.render("profile", { products, user, logged_in: req.session.logged_in });
});

// GET route for navigating to add new product page
router.get("/profile/products", withAuth, async (req, res) => {
  const tagsDataDb = await Tag.findAll({});
  const tags = tagsDataDb.map((tag) => tag.get({ plain: true }));
  res.render("products", { tags, logged_in: req.session.logged_in });
});

router.get("/profile/products/:id", withAuth, async (req, res) => {
  const tagsDataDb = await Tag.findAll({});
  const tags = tagsDataDb.map((tag) => tag.get({ plain: true }));
  const productDataDb = await Product.findOne({
    where: {
      id: req.params.id,
      user_id: req.session.user_id,
    },
    include: [{ model: Tag }],
  });
  const product = productDataDb.get({ plain: true });
  console.log(product);
  for (tag of tags) {
    tag["checked"] = product.tags.map(({ id }) => id).includes(tag.id);
  }
  res.render("products", { product, tags, logged_in: req.session.logged_in });
});

router.get("/products/:id", async (req, res) => {
  const productDataDb = await Product.findByPk(req.params.id, {
    include: [{ model: Tag }],
  });
  const product = productDataDb.get({ plain: true });

  const reviewDataDb = await Review.findAll({
    where: { product_id: req.params.id },
    include: User,
  });
  const reviews = reviewDataDb.map((review) => review.get({ plain: true }));
  res.render("product-details", {
    product,
    reviews,
    logged_in: req.session.logged_in,
  });
});
module.exports = router;
