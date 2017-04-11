module.exports = {
  logging: false,
  db: {
    url: process.env.DB_URL || 'mongodb://localhost/node-capstone',
  },
};
