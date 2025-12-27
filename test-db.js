const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'startvora_dev',
  user: 'postgres',
  password: 'postgres',
});

client.connect()
  .then(() => {
    console.log('✅ Successfully connected to database!');
    return client.query('SELECT current_database()');
  })
  .then((res) => {
    console.log('Current database:', res.rows[0].current_database);
    client.end();
  })
  .catch((err) => {
    console.error('❌ Connection error:', err.message);
    process.exit(1);
  });
