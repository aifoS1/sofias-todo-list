var gulp = require('gulp');
var nodeman = require('gulp-nodemon');

var jsFiles = ['*.js', 'routes/*.js'];


gulp.task('serve', function(){
	var options = {
		script: 'app.js',
		delayTime: 1,
		env: {
			'PORT': 5000
		},
		watch: jsFiles
	};

	return nodeman(options)
		.on('restart', function(ev){
			console.log('Restating.....')
		});
});