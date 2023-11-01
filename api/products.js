const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct, updateProduct, getProductById, destroyProduct, } = require('../db');
const { requireUser, requiredNotSent } = require('./utils')



// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (error) {
    next(error)
  }
})

// POST /api/products
router.post('/', requireUser, requiredNotSent({requiredParams: ['name', 'description', 'price']}), async (req, res, next) => {
  try {
    const {name, description, price} = req.body;
    const createdProduct = await createProduct({creatorId: req.user.id, name, description, price});
    if(createdProduct) {
      res.send(createdProduct);
    } else {
      next({
        name: 'FailedToCreate',
        message: 'There was an error creating your product'
      })
    }
  } catch (error) {
    next(error);
  }
});

// PATCH /api/products/:productId
router.patch('/:productId', requireUser, requiredNotSent({requiredParams: ['name', 'description', 'price'], atLeastOne: true}), async (req, res, next) => {
  try {
    const {name, description, price} = req.body;
    const {productId} = req.params;
    const productToUpdate = await getProductById(productId);
    if(!productToUpdate) {
      next({
        name: 'NotFound',
        message: `No product by ID ${productId}`
      })
    } else if(req.user.id !== productToUpdate.creatorId) {
      res.status(403);
      next({
        name: "WrongUserError",
        message: "You must be the same user who created this product to perform this action"
      });
    } else {
      const updatedProduct = await updateProduct({id: productId, name, description, price});
      if(updatedProduct) {
        res.send(updatedProduct);
      } else {
        next({
          name: 'FailedToUpdate',
          message: 'There was an error updating your product'
        })
      }
    }
  } catch (error) {
    next(error);
  }
});

// DELETE /api/products/:productId
router.delete('/:productId', requireUser, async (req, res, next) => {
  try {
    const {productId} = req.params;
    const productToUpdate = await getProductById(productId);
    if(!productToUpdate) {
      next({
        name: 'NotFound',
        message: `No product by ID ${productId}`
      })
    } else if(req.user.id !== productToUpdate.creatorId) {
      res.status(403);
      next({
        name: "WrongUserError",
        message: "You must be the same user who created this product to perform this action"
      });
    } else {
      const deletedRoutine = await destroyProduct(productId)
      res.send({success: true, ...deletedProduct});
    }
  } catch (error) {
    next(error);
  }
});


module.exports = router;