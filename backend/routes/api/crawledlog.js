var express = require('express');
var router = express.Router();
const readLastLines = require('read-last-lines');

const path_to_log_file = "../server/crawled_website.log";


function handleReadLog(data) {
    log_list = data.split("\n");
    log_list.pop();
    router.get("/", function (req, res, next) {
        res.send(log_list)
    })
}


function read_send_log() {
    readLastLines.read(path_to_log_file, 15)
        .then((lines) => handleReadLog(lines))
        .catch(err => err)
}

/* ==== main ====*/
setInterval(read_send_log, 3000);




module.exports = router;
