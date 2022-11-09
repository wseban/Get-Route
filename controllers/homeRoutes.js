const router = require("express").Router();

// GET route for display all products on the homepage
router.get("/", async (req, res) => {
  res.render("home", { logged_in: req.session.logged_in });
});

module.exports = router;
