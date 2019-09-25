export default db => ({
  query: async (query, inserts) => db.query(query, inserts),
  findOne: async (collection, json) =>
      (await db.query(`SELECT * FROM ${collection} WHERE ?`, json))[0],
  find: async ( collection, json) => db.query(`SELECT * FROM ${collection} WHERE ?`, json),
  create: async (collection, json) =>  db.query(`INSERT INTO ${collection} SET ?`,  JSON.parse(JSON.stringify(json))),
  beginTransaction: async pool => {
    let connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      return connection;
    } catch (err) {
      connection.release();
      throw err;
    }
  },
  commitTransaction: async connection => {
    await connection.commit();
    connection.release();
  },
  rollbackTransaction: async connection => {
    await connection.rollback();
    connection.release();
  }
});
