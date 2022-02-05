const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const data = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      ]
    });
    res.status(200).json(data);
  }
  catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      ]
    });
    if (!data) {
      res.status(404).json({ message: 'Cannot find with that ID!' });
      return;
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', (req, res) => {
  Category.create(req.body)
  .then((data) => res.json(data))
  .catch((error) => {
    console.log(error);
    res.status(400).json(error);
  })
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then((data) => {
    if (!data) {
      res.status(404).json({ message: 'Cannot find with that ID!'});
      return;
    }
    res.status(200).json(data);
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json(error);
  })
});

router.delete('/:id', (req, res) => {
  try {
    Category.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(data => {
      if (!data) {
        res.status(400).json(error);
        return;
      }
      res.status(200).json(data);
    })
  }
  catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
