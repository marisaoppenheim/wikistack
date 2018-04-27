const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage')
const { Page } = require('../models');
const main = require('../views/main')


router.get('/', async (req, res, next) => {
  const allPages = await Page.findAll()
  res.send(main(allPages));
});

router.post('/', async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content
});

  try {
    await page.save();
    res.redirect(`./${page.slug}`);
  } catch (error) {
    next(error)
  }
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
    where: {slug: req.params.slug}
  })
  res.json(page)
} catch (error) {
  next(error)
}
});

module.exports = router;