app.directive('fadeIn', ['$animate', '$timeout',
  function($animate, $timeout) {
    return {
      scope: {
        count: '='
      },
      link: function(scope, element, attrs) {
        var x = false;
      	element.on('load', function(){
          x = true;
          
          $timeout(function(){element.removeClass("hide");},400);
          $timeout(function(){element.removeClass("animate");},500);
          
      	})

        scope.$watch('count', function(newValue, oldValue) {
          if (newValue === oldValue) return;
          if(x)
          {
              $animate.addClass(element, 'animate').then(function() {
              element.removeClass('animate');
            });
          }
          // Animate class is the one that creates the fade-in or fade-out etc.
          
        });
      }
    };
  }
]);