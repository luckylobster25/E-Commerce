const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [
        {
          model: Product,
          attributes: ['product_name', 'price', 'stock', 'category_id']
        },
      ]
    });
    res.status(200).json(tagData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ['product_name', 'price', 'stock', 'category_id']
        }
      ]
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!'});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  Tag.create(req.body)
  .then((tagData) => res.json(tagData))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  })
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then((tagData) => {
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!'});
      return;
    }
    res.status(200).json(tagData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  try {
    Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(tagData => {
      if (!tagData) {
        res.status(400).json(err);
        return;
      }
      res.status(200).json(tagData);
    })
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
