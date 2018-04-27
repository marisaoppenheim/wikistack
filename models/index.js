const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {logging: false});

const Page = db.define('page', {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    slug: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    status: Sequelize.ENUM('open', 'close')
  });

  Page.beforeValidate((page, options) => {
    function makeUrl(title) {
      
        return title.replace(/\s+/g, '_').replace(/\W/g, '');
      
    }
    page.slug = makeUrl(page.title)
  })

  const User = db.define('user', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate : {
        isEmail: true
      }
    }
  });

module.exports = { db, Page, User }

  