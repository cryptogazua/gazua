var path = require('path');
var express     = require('express'),
    app         = express();

var config     = require('./config');
var mysql      = require('mysql');
var pool  = mysql.createPool(config.mysql);

function select_query(res, sql, arr) {
  pool.getConnection((err, conn) => {
    if(err) return res.send(err);
    conn.query(sql, arr, (err, rows) => {
      if(err) return res.send(err);
      conn.release();
      console.log(rows);
      res.send(rows);
    });
    conn.release();
  });
}

/* https://stackoverflow.com/questions/9768444/possible-eventemitter-memory-leak-detected */
require('events').EventEmitter.defaultMaxListeners = 0;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/quote/:currency', function(req, res) {
  var currency = req.params.currency;
  var sql = "SELECT currency, (datetime + INTERVAL 18 hour) AS datetime, open, high, low, close FROM quote ";
  var arr = [currency];
  sql += "WHERE currency=? order by datetime desc"
  select_query(res, sql, arr);
  //res.send(200,'{}')
});
app.get('/article/:currency', function(req, res) {
  var currency = req.params.currency;
  var sql = "select author, permlink, (LAST_UPDATE + INTERVAL 18 hour) AS LAST_UPDATE, keyword, title from Steemit_MT "
  var arr = [currency];
  sql += "WHERE keyword=? order by LAST_UPDATE desc limit 10"
  select_query(res, sql, arr);
  //res.send(200,'{}')
});

var port = process.env.PORT || 4000;
app.listen(port);
