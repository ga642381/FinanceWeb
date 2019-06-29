const express = require('express');
const router = express.Router();
const StockDaily = require('../../models/StockDaily')

/* helper functions */
function Sort_by_Date(allData) {
    allData.sort(function(a,b) {
        a = a.Date.split('/').join('');
        b = b.Date.split('/').join('');
        return a > b ? 1 : a < b ? -1 : 0;
        // return a.localeCompare(b);         // <-- alternative 
    })
}

router.get('/', async (req, res) => {
    const stock = req.query.stock;

    const stock_by_Code = await StockDaily.find({ Code: stock });
    if (stock_by_Code.length !== 0) {
        Sort_by_Date(stock_by_Code);
        return res.send(stock_by_Code);
    }

    const stock_by_Name = await StockDaily.find({ Name: stock });
    if (stock_by_Name.length !== 0) {
        //console.log('stock_by_Name', stock_by_Name)
        Sort_by_Date(stock_by_Name)
        return res.send(stock_by_Name)
    }

    res.send('not found');
})

module.exports = router;