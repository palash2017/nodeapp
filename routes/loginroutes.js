var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Pact1234',
  database : 'node'
});

connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});

console.log("shghjsadhjsadgasd....");

exports.login = function(req,res){
  console.log("inside login ... XXX....");
  //var email= req.body.user_name;
  //var password = req.body.user_password;
  var email = req.params.user_name;
  var password = req.params.user_password;
  console.log(req.query)
  console.log(req.path)
  var i=0;
  for(i=0;i<req.body.length;i++){
	console.log(req.body[i]);
  }
  for(i=0;i<req.query.length;i++){
	console.log(req.query[i]);
  }
  for(i=0;i<req.params.length;i++){
	console.log(req.params[i]);
  } 
  console.log(req.params.user_name);
  console.log(req.params.user_password);
  connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    console.log('The solution is: ', results);
    if(results.length >0){
	  console.log("error ocurred",[0].password);
	  var cc=results[0]
	  var aa = results[0].password
	  var bb = password 
      if(aa == password){
        //res.redirect('/landing_success');
		console.log('The solution is: ', results);
		res.send({
		  "code":200,
		  "success":"user logged in sucessfully"
			});
      }
      else{
        res.send({
          "code":204,
          "success":"Email and password does not match="+aa+"//"+bb+"//"+cc
            });
      }
    }
    else{
      res.send({
        "code":204,
        "success":"Email does not exits"
          });
    }
  }
  });
}

exports.register = function(req,res){
  // console.log("req",req.body);
  var today = new Date();
  //console.log("aaaaa='+req.body.first_name)
  var users={
    "first_name":req.body.first_name,
    "last_name":req.body.last_name,
    "email":req.body.email,
    "password":req.body.password,
    "created":today,
    "modified":today
  }
  connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
	  if (error) {
		console.log("error ocurred",error);
		res.send({
		  "code":400,
		  "failed":"error ocurred"+users
		})
	  }else{
		console.log('The solution is: ', results);
		res.send({
		  "code":200,
		  "success":"user registered sucessfully"
			});
	  }
  });
}

