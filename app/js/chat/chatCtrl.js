define(
	[
		'simpleChat.module'
	],
	function(app) {
		return app.controller('ChatCtrl', ['$scope', '$firebase',
			function($scope, $firebase) {
				var messageRef = new Firebase(
					'https://fire-chat-room.firebaseio.com/messages');

				$scope.messages = $firebase(messageRef);

				$scope.addMessage = function(event) {
					if (event.keyCode != 13) return;

					$scope.messages.$add({
						author: {name: 'guest'},
						message: $scope.message
					});

					$scope.message = '';
				};
		}]);
	}
);