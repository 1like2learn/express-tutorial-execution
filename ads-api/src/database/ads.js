const { getDatabase } = require("./mongo");

const { ObjectID } = require("mongodb");
const collectionName = "ads";

/** 
* Adds an ad to the database
* @param ad
*/
async function insertAd(ad) {
    const database = await getDatabase();
    const { insertedId } = await database.collection(collectionName).insertOne(ad);
    return insertedId;
}

/** 
* Returns array of ads from database
* @return [ads]
*/
async function getAds() {
    const database = await getDatabase();
    return await database.collection(collectionName).find({}).toArray();
}

/**
 * Deletes an ad from the database
 * @param id
 */
async function deleteAd(id) {
    const database = await getDatabase();
    await database.collection(collectionName).deleteOne({
        _id: new ObjectID(id),
    });
}

/**
 * Deletes an ad from the database
 * @param id
 * @param ad
 */
async function updateAd(id, ad) {
    const database = await getDatabase();
    delete ad._id;
    await database.collection(collectionName).update(
        { _id: new ObjectID(id) },
        { $set: { ...ad, }}
    );
}



module.exports = {
    insertAd,
    getAds,
    updateAd,
    deleteAd,
}