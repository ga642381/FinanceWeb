const mongoose = require('mongoose');

const TAIEXPrediction_Schema = new mongoose.Schema({
    change: {
        type: Number,
        required: true
    },
    predict: {
        type: Number,
        required: true
    }
});

const collection_name = 'TAIEX_predicts';
const TAIEXPrediction = mongoose.model('TAIEX_predict', TAIEXPrediction_Schema, collection_name);
module.exports = TAIEXPrediction;