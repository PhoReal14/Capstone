const client = require('./client');
const util = require('./util');

// database functions
async function getAllProducts(){
  try {
    const {rows} = await client.query(`
      SELECT * FROM products;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}
async function getProductById(id){
  try {
    const {rows: [product]} = await client.query(`
      SELECT * FROM products
      WHERE id = $1
    `, [id]);
    return product;
  } catch (error) {
    throw error;
  }
}
async function getProductByName(name){
  try {
    const {rows: [product]} = await client.query(`
      SELECT * FROM products
      WHERE name = $1
    `, [name]);
    return product;
  } catch (error) {
    throw error;
  }
}

async function createProduct({ name, description, price, imgUrl }){
  try {
    const {rows: [product]} = await client.query(`
      INSERT INTO products(name, description, price, imgUrl) VALUES ($1, $2, $3, $4)
      ON CONFLICT (name) DO NOTHING 
      RETURNING *
    `, [name, description, price, imgUrl,]);
    return product;
  } catch (error) {
    throw error;
  }}

async function updateProduct({id, ...fields}){
  try {
    const toUpdate = {}
    for(let column in fields) {
      if(fields[column] !== undefined) toUpdate[column] = fields[column];
    }
    let activity;
    if (util.dbFields(toUpdate).insert.length > 0) {
      const {rows} = await client.query(`
        UPDATE products
        SET ${ util.dbFields(toUpdate).insert }
        WHERE id= $1
        RETURNING *;
      `, Object.values(toUpdate));
      activity = rows[0];
    }
    return activity;
  } catch (error) {
    throw error
  }
}

async function destroyProduct(id) {
  try {
    const {rows: [products]} = await client.query(`
        DELETE FROM products 
        WHERE id = $1
        RETURNING *;
    `, [id]);
    return products;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  getProductByName,
  createProduct,
  updateProduct,
  destroyProduct,
}