/*global define, Firebase*/

define(
	[
		'simpleChat.module',
		'firebase'
	],
	function (app) {
		'use strict';

		AdminCtrl.$inject =
			[
				'$scope',
				'$log',
				'$q',
				'$window',

				'$state',

				'$firebase',

				'SimpleLoginService',

				'currentUser'
			];

		return app
			.controller('AdminCtrl', AdminCtrl);

		function AdminCtrl (
			$scope, $log, $q, $window,
			$state,
			$firebase,
			SimpleLoginService,
			currentUser) {

			var firebaseRef =
				new Firebase('https://fire-chat-room.firebaseio.com/');
			var roomsRef = firebaseRef.child('rooms');
			var usersRef = firebaseRef.child('users');
			var membersRef = firebaseRef.child('members');

			var vm = this;

			// variables
			vm.user = currentUser;
			vm.rooms = $firebase(roomsRef).$asArray();
			vm.users = $firebase(usersRef).$asArray();
			vm.members = $firebase(membersRef).$asArray();

			if (vm.user.role !== 'Admin') {
				// only admin can access here
				$state.go('chat', {'roomName': 'public'});
			}

			// functions
			vm.addRoom = addRoom;
			vm.removeRoom = removeRoom;
			vm.saveRoomAccess = saveRoomAccess;

			vm.addMember = addMember;
			vm.removeMember = removeMember;
			vm.getMembers = getMembers;

			vm.assignUserRole = assignUserRole;

			vm.sendResetPasswordEmail = sendResetPasswordEmail;
			vm.logout = logout;

			function addRoom () {
				vm.rooms
					.$inst()
					.$set(
						vm.newRoomName,
						{
							name: vm.newRoomName
						}
					);

				vm.newRoomName = '';
			}

			function removeRoom (roomName) {
				vm.rooms
					.$inst()
					.$ref()
					.child(roomName)
					.remove();
			}

			function saveRoomAccess (roomName, roomIsPrivate) {
				vm.rooms
					.$inst()
					.$ref()
					.child(roomName)
					.child('private')
					.set(roomIsPrivate);
			}

			function addMember (roomName, newMember) {
				vm.members
					.$inst()
					.$ref()
					.child(roomName)
					.child(newMember.$id)
					.set(
						{
							displayName: newMember.displayName,
							isInRoom: true
						}
					);

				vm.users
					.$inst()
					.$ref()
					.child(newMember.$id)
					.child('rooms')
					.child(roomName)
					.set(
						{
							name: roomName
						}
					);

				newMember = '';
			}

			function removeMember (roomName, member) {
				vm.members
					.$inst()
					.$ref()
					.child(roomName)
					.child(member.$id)
					.remove();

				vm.users
					.$inst()
					.$ref()
					.child(member.$id)
					.child('rooms')
					.child(roomName)
					.remove();
			}

			function getMembers (roomName) {
				return $firebase(
					vm.members
						.$inst()
						.$ref()
						.child(roomName)
				).$asArray();
			}

			function assignUserRole (user, role) {
				if (role === 'Admin') {
					if (!$window.confirm('Are you sure you want to assign this user ' +
						user.displayName + ' admin right?')) {
						return;
					}
				}

				vm.users
					.$inst()
					.$set(
						user.$id,
						{
							displayName: user.displayName,
							provider: user.provider,
							role: role
						}
					);
			}

			function sendResetPasswordEmail (user) {
				if(!$window.confirm('Are you sure you want to send password ' +
					'reset email to this user ' + user.displayName + ' ?')) {
					return;
				}

				SimpleLoginService.sendResetPasswordEmail(user);
			}

			function logout () {
				SimpleLoginService.logout();
			}
		}
	}
);