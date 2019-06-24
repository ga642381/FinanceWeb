const express = require('express');
const router = express.Router();

// in app.js => app.use('/crawledlog', crawledlogRouter);
/* Stock Metas */
const Meta = require('../../models/Meta')



router.get('/', (req, res) => {
    Meta.find()
        .sort({ 代號: 1 })
        .then(metas => res.json(metas));
})

module.exports = router;