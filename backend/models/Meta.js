const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StockMetaSchema = new Schema({
    名稱: {
        type: String,
        required: true
    },

    上市日: {
        type: String,
    },

});

// TaiwanStock database for an app
// collection name is important 
// don't know how to use modelname for now
const collection_name = "metas"
const Meta = mongoose.model('modelname', StockMetaSchema, collection_name)

module.exports = Meta

