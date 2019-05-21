const express = require('express');
const router = express.Router();

/* ============= Mongo ============*/
const MonogoClient = require('mongodb').MongoClient;

function findDocuments(db, stockNo) {
    console.log(stockNo)
    // Get the documents collection
    const collection = db.collection('Code');
    // Find some documents
    collection.find({ 代號: stockNo }).toArray(function (err, docs) {
        callback(docs);
    })
}

function getStockData(stockNo) {
    MonogoClient.connect("mongodb+srv://ga642381:abc@taiwanstock-2i5kf.gcp.mongodb.net/test?retryWrites=true", { useNewUrlParser: true }, function (err, client) {
        const db = client.db("TaiwanStock");
        docs = findDocuments(db);
    })
}

/* ============== routing ================*/

router.get('/:stockNo', function (req, res) {
    var stockNo = req.params.stockNo;






    getStockData(stockNo)
})

module.exports = router;




