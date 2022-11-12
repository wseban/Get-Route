const Product = require('./Product');
const User = require('./User');
const Review = require('./Review');
const Tag = require('./Tag')
const ProductTag = require('./ProductTag')

User.hasMany(Product, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Product.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Review, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Review.belongsTo(User, {
    foreignKey: 'user_id'
});

Product.hasMany(Review, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE'
});

Review.belongsTo(Product, {
    foreignKey: 'product_id'
});

Product.belongsToMany(Tag, { through: ProductTag, foreignKey: 'product_id'} )
Tag.belongsToMany(Product, { through: ProductTag, foreignKey: 'tag_id'})

module.exports = {
  Product,
  User,
  Review,
  Tag,
  ProductTag
};