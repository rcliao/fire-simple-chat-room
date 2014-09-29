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
			'currentUser'
		];

		return app.controller('ChatCtrl', ChatCtrl);

		function ChatCtrl ($rootScope, $scope, $state, $stateParams, $firebase, currentUser) {
			var vm = this;
			var chatRef = new Firebase('https://fire-chat-room.firebaseio.com/')
				.child('messages')
				.child($stateParams.roomName);

			vm.user = currentUser;
			vm.chatRoomName = $stateParams.roomName;
			vm.messages = $firebase(chatRef).$asArray();
			vm.saySomething = saySomething;

			function saySomething () {
				vm.messages.$add(
					{
						author: vm.user.displayName,
						timestamp: new Date(),
						text: vm.message.text
					}
				);

				vm.message.text = '';
			}
		}
	}
);