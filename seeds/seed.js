const sequelize = require('../config/connection');
const { User, Product, Review, Tag, ProductTag } = require('../models');

const userSeedData = require('./userSeeds.json');
const productSeedData = require('./productSeeds.json');
const reviewSeedData = require('./reviewsSeeds.json');
const tagSeedData = require('./tagSeeds.json')
const productTagSeedData = require('./productTagSeeds.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userSeedData, {
    individualHooks: true,
    returning: true,
  });

  const products = await Product.bulkCreate(productSeedData, {
    returning: true,
  });
  const reviews = await Review.bulkCreate(reviewSeedData, {
    returning: true,
  });
  const tags = await Tag.bulkCreate(tagSeedData, {
    returning: true
  })
  const productTags = await ProductTag.bulkCreate(productTagSeedData, {
    returning: true
  })

  process.exit();
};

seedDatabase();