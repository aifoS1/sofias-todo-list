
/*
 * GET home page.
 */


exports.index = function(req, res){
  res.render('index.html', { 
  	title: 'To-Do List',
  	copy: 'A place to keep track of what you need to get done!' 
  });
};


