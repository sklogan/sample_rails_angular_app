var app = angular.module('railgular', ['ui.router','ngRoute', 'ngResource','templates', 'Devise', 'ui.tinymce', 'ngFileUpload']);

app.filter('previewBlog', function() {
  return function(text) {
  	var preview_content = ''
    if(text){
		  preview_content = String(text).replace(/<[^>]+>/gm, '')
		  if(preview_content.length > 100){
		  	return preview_content.substring(0, 100) + '...'
		  }
    }
    return preview_content;
  };
});

app.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown", function(e) {
            if(e.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter, {'e': e});
                });
                e.preventDefault();
            }
        });
    };
});