const express = require('express');
const router = express.Router();
const TAIEXPrediction = require('../../models/TAIEXPrediction')

router.get('/', async (req, res) => {
    const TAIEXPrediction_data = await TAIEXPrediction.find();
    return res.send(TAIEXPrediction_data[0])
})

module.exports = router;