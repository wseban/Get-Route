# Get Route

## Description

Get Route is a is an e-commerce website where users can sell, update, review and buy the products.

Here is the link to the [deployed application](http://get-route-group-5.herokuapp.com/)

## Why?

We wanted to create an user-friendly ecommerce shopping site for the users.

### Features

- Easy to use
- Provide options to the user to add,update and delete a product. A user can also add the review to the products.
- Generates a responsive webpage

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Credits](#credits)
- [License](#license)

## Installation

- Create a new repository on your GitHub account.
- Clone this repository.
- Run `npm install`
- Run `mysql -u root -p`
- Run `schema.sql`
- Run `npm start`

## Usage

This project can be used in any web browser or on any devices including the mobile devices.

Following is a code snippet of the application page.

Here it refers to the POST Route for adding a new product by the user.

```Node.js

router.post("/", async (req, res) => {
  try {
    const newProduct = await Product.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProduct);
  } catch (err) {
    res.status(400).json(err);
  }
});

```

## Technologies Used

- Node.js
- Express.js
- MySQL
- Handlebars
- Sequelize
- Heroku
- Bootstrap
- Sweetalert

## Collaborators

- Joseph Jensen, GitHub [https://github.com/joedjensen]
- Swetha Pothuganti, GitHub [https://github.com/shwethareddy0]
- William Seban, GitHub [https://github.com/wseban]
- Angel Matias, GitHub [https://github.com/robogf]

## License

This project is licensed under the [MIT](./LICENSE) license.
