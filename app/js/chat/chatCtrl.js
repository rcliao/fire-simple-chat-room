/*global define, Firebase*/

define(
	[
		'simpleChat.module',
		'firebase'
	],
	function(app) {
		'use strict';

		ChatCtrl.$inject = [
			'$rootScope',
			'$scope',

			'$state',
			'$stateParams',

			'$firebase',

			'SimpleLoginService',

			'currentUser'
		];

		return app.controller('ChatCtrl', ChatCtrl);

		function ChatCtrl (
			$rootScope, $scope,
			$state, $stateParams,
			$firebase,
			SimpleLoginService,
			currentUser
		) {

			var vm = this;
			var chatRef = new Firebase('https://fire-chat-room.firebaseio.com/')
				.child('messages')
				.child($stateParams.roomName);

			vm.user = currentUser;
			vm.chatRoomName = $stateParams.roomName;
			vm.messages = $firebase(chatRef).$asArray();

			vm.saySomething = saySomething;
			vm.logout = logout;

			function saySomething () {
				vm.messages.$add(
					{
						author: vm.user.displayName,
						timestamp: Firebase.ServerValue.TIMESTAMP,
						text: vm.message.text
					}
				);

				vm.message.text = '';
			}

			function logout () {
				SimpleLoginService
					.logout();
			}

			function redirectToLogin () {
				$state.go('login');
			}
		}
	}
);