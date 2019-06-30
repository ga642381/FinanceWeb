const mongoose = require('mongoose');

const TAIEXDaily_Schema = new mongoose.Schema({
    TAIEX: {
        type: Number,
        required: true
    },
    Date: {
        type: String,
        required: true
    }
});

const collection_name = 'TAIEX_dailys';
const TAIEXDaily = mongoose.model('TAIEX_daily', TAIEXDaily_Schema, collection_name);
module.exports = TAIEXDaily;