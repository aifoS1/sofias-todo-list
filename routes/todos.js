var express = require('express')
var app = express();
var db;
var cloudant;
var dbCredentials = {
    dbName: 'sofias-todo-list-db'
};
 dbCredentials.url = "https://a2337e2d-94a8-4427-9232-b9a183b841af-bluemix:68151215bfe1f2329cc97ab725d4884a7dde5e3667724c09e8ab22c66823390e@a2337e2d-94a8-4427-9232-b9a183b841af-bluemix.cloudant.com";
// }

cloudant = require('cloudant')(dbCredentials.url);

// check if DB exists if not create
cloudant.db.create(dbCredentials.dbName, function(err, res) {
  if (err) {
      console.log('Could not create new db: ' + dbCredentials.dbName + ', it might already exist.');
  }
});

db = cloudant.db.use(dbCredentials.dbName);
/*
 * GET users listing.
 */

exports.list = function(req, res){

	db.list( {include_docs:true} ,
     function(error, todos) {
     	todoList = []
     	completed =[]
     	todos.rows.forEach(function(row) {
     		if (row['doc']['complete'] == false ){
     			todoList.push(row['doc'])
     		} else {
     			 completed.push(row['doc'])
     		}		
     	})

  		res.render('todos.html', { 
  			todos: todoList || [],
  			completed: completed || []
  		})

      return;
  });
 
};

exports.add = function(req, res){
	  var todo = req.body.todo;
    var complete= req.body.complete;
    console.log('body: ' + JSON.stringify(req.body));

    db.insert ({
        todo: todo,
        complete: complete
    });
    res.send(req.body);
}

exports.markCompleted =function(req, res) {
	console.log('req.params',req.params.todo_id)
	var id = req.params.todo_id;

  	db.get( id, function(err, body) {
 			 var todo = body;
 			 todo.complete = true;

 			 db.insert( todo, function(err, body) {
 			 		res.send(body);
 			 })
    });
}