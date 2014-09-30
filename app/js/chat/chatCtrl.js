/*global define, Firebase*/

define(
	[
		'simpleChat.module',
		'angular',
		'firebase'
	],
	function(app, angular) {
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
			currentUser) {

			var vm = this;
			var chatRef = new Firebase('https://fire-chat-room.firebaseio.com/')
				.child('messages')
				.child($stateParams.roomName);

			vm.user = currentUser;
			vm.chatRoomName = $stateParams.roomName;
			vm.messages = $firebase(chatRef).$asArray();
			// TODO: maybe implement a persistent notification system later
			vm.notifications = [];

			vm.messages.$watch(newMessageHandler);
			checkPresence();

			vm.saySomething = saySomething;
			vm.changePassword = changePassword;
			vm.logout = logout;
			vm.dismissNotification = dismissNotification;

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

			// the following will set the user to be online or offline
			function checkPresence () {
				var amOnline = new Firebase('https://fire-chat-room.firebaseio.com' +
					'/.info/connected');
				var roomRef = new Firebase('https://fire-chat-room.firebaseio.com')
					.child(vm.chatRoomName)
					.child('presence');
				var userRef = roomRef
					.child(vm.user.$id);

				amOnline.on('value', function(snapshot) {
					if (snapshot.val()) {
						userRef
							.onDisconnect()
							.remove();
						userRef.set(
							{
								displayName: vm.user.displayName,
								online: true
							}
						);
					}
				});

				vm.roomPresence = $firebase(roomRef).$asArray();
			}

			function newMessageHandler () {
				angular.element(document).ready(function() {
					var chatContentContainer = document
						.getElementById('chat_content_container');

					chatContentContainer.scrollTop =
						chatContentContainer.scrollHeight;
				});
			}

			function changePassword () {
				$('#change_password_form')
				.modal('setting', {
					onApprove : function() {
						SimpleLoginService.changePassword(vm.user,
							vm.oldPassword, vm.newPassword)
							.then(
								passwordChangeSuccess,
								passwordChangeError
							);
						vm.oldPassword = '';
						vm.newPassword = '';
					}
				})
					.modal('show')
				;

				function passwordChangeSuccess (result) {
					vm.notifications.push(
						{
							summary: 'Congratation, you\'ve changed your ' +
								'password successfully.',
							icon: 'checkmark'
						}
					);
				}

				function passwordChangeError (error) {
					vm.notifications.push(
						{
							summary: 'We\'ve failed to change your ' +
						'password.',
							detail: error.message,
							icon: 'warning'
						}
					);
				}
			}

			function dismissNotification (index) {
				vm.notifications.splice(index, 1);
			}
		}
	}
);