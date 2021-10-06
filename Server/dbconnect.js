const mysql = require('mysql');
// --------------dbconnect-----------------
    con = mysql.createConnection({
        host: "localhost",
        database: 'khaled_db',
        user: "root",
        password: ""
      });
      
      con.connect(function(err) {
          if(!err) {
            console.log("Connected!");
          }
          else {
              console.log("Connection failed")
          }
        })
  //-------------end-----------------------




 