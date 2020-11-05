const client = require('../lib/client');
// import our seed data:
const coffees = require('./coffees.js');
const suppliersData = require('./suppliers.js');
const { getEmoji } = require('../lib/emoji.js');
const usersData = require('./users.js');

run();

async function run() {

  try {
    await client.connect();

    await Promise.all(
      usersData.map(user => {
        return client.query(`
                      INSERT INTO users (email, hash)
                      VALUES ($1, $2)
                      RETURNING *;
                  `,
        [user.email, user.hash]);
      })
    );

    await Promise.all(
      suppliersData.map(supplier => {
        return client.query(`
                      INSERT INTO suppliers (supplier)
                      VALUES ($1)
                      RETURNING *;
                  `,
        [supplier.supplier]);
      })
    );
      
    await Promise.all(
      coffees.map(coffee => {
        return client.query(`
                    INSERT INTO coffees (name_id, name, image, description, category, price, on_sale, supplier_id)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
                `,
        [coffee.name_id, coffee.name, coffee.image, coffee.description, coffee.category, coffee.price, coffee.on_sale, coffee.supplier_id]);
      })
    );
    

    console.log('seed data load complete', getEmoji(), getEmoji(), getEmoji());
  }
  catch(err) {
    console.log(err);
  }
  finally {
    client.end();
  }
    
}
