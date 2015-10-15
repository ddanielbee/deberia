app.controller('DeberiaController', function($scope, $routeParams, $timeout, $rootScope) {
	var hasFlash = false;
	try {
	  var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
	  if (fo) {
	    hasFlash = true;
	  }
	} catch (e) {
	  if (navigator.mimeTypes
	        && navigator.mimeTypes['application/x-shockwave-flash'] != undefined
	        && navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin) {
	    hasFlash = true;
	  }
	}
	$scope.count = 0;
	$scope.hasQuestion = true;
	$scope.responses = [
		{
			img: "img/1.png",
			shareImg: "img/1_share.jpg"
		},
		{
			img: "img/2.png",
			shareImg: "img/2_share.jpg"
		},
		{
			img: "img/3.png",
			shareImg: "img/3_share.jpg"
		},
		{
			img: "img/4.png",
			shareImg: "img/4_share.jpg"
		},
		{
			img: "img/5.png",
			shareImg: "img/5_share.jpg"
		},
		{
			img: "img/6.png",
			shareImg: "img/6_share.jpg"
		},
		{
			img: "img/7.png",
			shareImg: "img/7_share.jpg"
		},
		{
			img: "img/8.png",
			shareImg: "img/8_share.jpg"
		}

	]
	$scope.cell = Math.round(Math.random()*($scope.responses.length-1));
	$rootScope.background = Math.round(Math.random()*2);
	$rootScope.getClass = function(background) {
		var returnValue = "";
		if(background == 0)
		{
			returnValue = "yellow-bg";
		} else if(background == 1)
		{
			returnValue = "red-bg";
		} else
		{
			returnValue = "blue-bg"
		}

		return returnValue;
	}

	// Check if there are route params (When shared)
	if(Object.keys($routeParams).length !== 0)
	{
		if($routeParams.message)
		{
			$scope.question = $routeParams.message; 
		}

		if($routeParams.question && $routeParams.result)
		{
			$scope.question = $routeParams.question;
			$scope.response = $scope.responses[$routeParams.result];
		}
	} else
	{

	}
	$scope.facebookShare = function(question) {
		FB.ui({
			method: 'feed',
	        name: "Debería ?",
	        link: "http://deberia.eledelab.co/",
	        picture: "http://deberia.eledelab.co/" + $scope.response.shareImg,
	        caption: "Debería ?",
	        description: "Le pregunté: "+ question +" a la infinita sabiduría de Debería y esta fue la respuesta. Le quieres preguntar algo ?"

		}, function(response){});
	}

	/**
	 * Logic for getting response after button press
	 * @author Daniel Bolívar <daniel@eledelab.co>
	 * @param  {String} pregunta User input
	 * @return {Void}
	 */
	$scope.getResponse = function(question) {
		if(question != undefined && question != "")
		{
			$(".container").addClass("afterFirst");
			var tempBack = $rootScope.background;
			$rootScope.background = Math.round(Math.random()*2);
			while(tempBack == $rootScope.background)
			{
				$rootScope.background = Math.round(Math.random()*2);
			}
			$scope.hasQuestion = true;
			$scope.count ++;
			var x = Math.round(Math.random()*($scope.responses.length-1));
			while(parseInt(x) == parseInt($scope.cell))
			{
				x = Math.round(Math.random()*($scope.responses.length-1));
			}
			$scope.cell = x;
			$timeout(function(){$scope.response = $scope.responses[$scope.cell];},500);
			$scope.shareUrl = "deberia.eledelab.co/compartir/"
			$scope.shareUrl += question.replace(/ /g, "%20");
			$scope.shareUrl = $scope.shareUrl.split("\n").join("%0D%0A");
			if(hasFlash)
			{
				var client = new ZeroClipboard( document.getElementById("copy-button") );
			}
		} else
		{
			$scope.hasQuestion = false;
		}
	}

});