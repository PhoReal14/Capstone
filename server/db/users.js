const client = require('./client');
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;


// database functions

// user functions
async function createUser({ username, password, email }) {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {rows: [user]} = await client.query(`
      INSERT INTO users(username, password, email) VALUES ($1, $2, $3)
      ON CONFLICT (username) DO NOTHING 
      RETURNING id, username
    `, [username, hashedPassword, email]);
    return user;
  } catch (error) {
    throw error;
  }
}
async function getUser({username, password}) {
  if (!username || !password) {
    return;
  }

  try {
    const user = await getUserByUsername(username);
    if(!user) return;
    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if(!passwordsMatch) return;
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserById(userId) {
  // first get the user
  try {
    const {rows: [user]} = await client.query(`
      SELECT *
      FROM users
      WHERE id = $1;
    `, [userId]);
    // if it doesn't exist, return null
    if (!user) return null;
    // if it does:
    // delete the 'password' key from the returned object
    delete user.password; 
    return user;  
  } catch (error) {
    throw error;
  }
}
async function getUserByUsername(userName) {
  // first get the user
  try {
    const {rows} = await client.query(`
      SELECT *
      FROM users
      WHERE username = $1;
    `, [userName]);
    // if it doesn't exist, return null
    if (!rows || !rows.length) return null;
    // if it does:
    // delete the 'password' key from the returned object
    const [user] = rows;
    // delete user.password;
    return user;
  } catch (error) {
    console.error(error)
  }
}

async function addUserShippingInfo(data) {
  try{
    const { rows } = await client.query(`
      SELECT id
      FROM shipping_information
      WHERE user_id = $1
    `, [data.user_id]);
    if (rows.length === 0) {
      const insertQuery =`
        INSERT INTO shipping_information(user_id, first_name, last_name, address) VALUES($1, $2, $3, $4)
        RETURNING *;
      `
      const values = [data.user_id, data.first_name, data.last_name, data.address]
      const result = await client.query(insertQuery, values)
      console.log('Inserted shipment info:', result.rows[0])
      return result.rows[0]
    }
  } catch(error) {
    console.error(error)
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  addUserShippingInfo,
}