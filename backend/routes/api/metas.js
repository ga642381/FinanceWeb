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


// router.post('/', (req, res) => {
//     const newMeta = new Meta({
//         名稱: "中華民國"
//     });

//     newMeta.save().then(meta => res.json(meta))
// })

module.exports = router;