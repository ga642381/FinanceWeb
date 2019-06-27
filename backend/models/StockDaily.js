const mongoose = require('mongoose');

const StockDaily_Schema = new mongoose.Schema({
    Change: {
        type: Number,
        required: true
    },
    ClosingPrice: {
        type: Number,
        required: true
    },
    Code: {
        type: String,
        required: true
    },
    Date: {
        type: String,
        required: true
    },
    HighestPrice: {
        type: Number,
        required: true
    },
    LowestPrice: {
        type: Number,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    OpeningPrice: {
        type: Number,
        required: true
    },
    TradeValue: {
        type: Number,
        required: true
    },
    TradeVolume: {
        type: Number,
        required: true
    },
    Transcation: {
        type: Number,
        required: true
    }
});

const collection_name = 'Stock_dailys';
const StockDaily = mongoose.model('Stock_daily', StockDaily_Schema, collection_name);
module.exports = StockDaily;