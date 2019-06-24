const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    if (req.user === undefined) {
        // The user is not logged in
        res.json({});
    }

    else {
        // The user is logged in 
        res.json(
            req.user.name
        );
    }
});

module.exports = router;