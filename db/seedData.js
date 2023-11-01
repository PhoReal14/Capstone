const { createUser, createProduct,} = require('.');
const client = require('./client');

async function dropTables() {
  console.log('Dropping All Tables...');
  // drop all tables, in the correct order
  try {
    await  client.query(`
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;
  `)
  } catch (error) {
    throw error; 
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");
    // create all tables, in the correct order

    await  client.query(`
      CREATE TABLE users(
        id  SERIAL PRIMARY KEY, 
        username VARCHAR(255) UNIQUE NOT NULL, 
        password VARCHAR(255) NOT NULL
      );
    `)

    await  client.query(`
    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      description TEXT NOT NULL,
      price TEXT NOT NULL,
      imgUrl VARCHAR(255) UNIQUE NOT NULL
      );
    `)
    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

/* 

Initial Data 

*/

async function createInitialUsers() {
  console.log('Starting to create users...');
  try {

    const usersToCreate = [
      { username: 'monique', password: 'Moni333' },
      { username: 'garren', password: 'phoreal14' },
      { username: 'jonathan', password: 'jnett93' },
      { username: 'rachel', password: 'rachel-watkins' },
    ]
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users!');
    throw error;
  }
}
async function createProducts() {
  try {
    console.log('Starting to create products...');

    const productsToCreate = [
      { name: 'Harry Potter and the Goblet of Fire', description: 'Fourth Harry Potter Book', price: '$25', imgUrl: 'https://i.imgur.com/M7Jfkwv.jpeg' },
      { name: 'Beauty and the Beast', description: 'Beauty and the Beast Movie', price: '$10', imgUrl: 'https://i.imgur.com/40I4C2s.jpeg' },
      { name: 'Game of Thrones Box Set', description: 'Box Set of the Game of Thrones Books', price: '$100', imgUrl: 'https://imgur.com/rlzAXVX.jpeg' },
      { name: 'Basketball', description: 'Wilson Evolution Game Ball', price: '$30', imgUrl: 'https://i.imgur.com/wxE3vnX.jpeg' },
      { name: 'Tennis Racket', description: 'Wilson Tennis Racket', price: '$15', imgUrl: 'https://i.imgur.com/JeDh1DP.jpeg' },
      { name: 'iPhone 15', description: '15th Generation iPhone', price: '$800', imgUrl: 'https://i.imgur.com/NWAb2eN.jpeg' },
      { name: 'Nail Polish', description: 'OPI Nail Polish in Bubble Bath', price: '$12', imgUrl: 'https://i.imgur.com/rWTcUYe.jpeg' },
    ]
    const products = await Promise.all(productsToCreate.map(createProduct));

    console.log('products created:');
    console.log(products);

    console.log('Finished creating products!');
  } catch (error) {
    console.error('Error creating products!');
    throw error;
  }
}


async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createProducts();
  } catch (error) {
    console.log('Error during rebuildDB')
    throw error;
  }
}

module.exports = {
  rebuildDB
};