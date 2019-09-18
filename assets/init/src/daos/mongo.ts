export default db => ({
  findOne: async (collectionName, filters, options?) =>
    await db.collection(collectionName).findOne(filters, options),
  find: async (collectionName, filters, options) => db
      .collection(collectionName)
      .find(filters, options)
      .toArray(),
  findAndProject: async (collectionName, filters, options?) => db
      .collection(collectionName)
      .find(filters)
      .project(options)
      .toArray(),
  aggregate: async (collectionName, options?) => db
      .collection(collectionName)
      .aggregate(options)
      .toArray(),
  create: async (collectionName, object) => db.collection(collectionName).insertOne(object),
  createMany: async (collectionName, objects) => db.collection(collectionName).insertMany(objects),
  update: async (
    db,
    collectionName,
    filters,
    object,
    optionals = {
      returnOriginal: false
    }
  ) => db
    .collection(collectionName)
    .findOneAndUpdate(filters, object, optionals),
  updateMany: async (collectionName, filters, object) => db.collection(collectionName).updateMany(filters, object),
  deleteOne: async (collectionName, filters, options) => db.collection(collectionName).deleteOne(filters, options),
  deleteMany: async (collectionName, filters, options) => db.collection(collectionName).removeMany(filters, options)
});
