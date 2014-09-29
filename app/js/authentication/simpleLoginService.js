/*global define, Firebase*/

define(
	[
		'simpleChat.module',
		'firebase'
	],
	function (app) {
		SimpleLoginService.$inject = [
			'$rootScope',
			'$log',
			'$q',
			'$state',
			'$firebase',
			'$firebaseSimpleLogin'
		];

		return app
			.factory('SimpleLoginService', SimpleLoginService);

		function SimpleLoginService ($rootScope, $log, $q, $state, $firebase, $firebaseSimpleLogin) {
			var ref = new Firebase('https://fire-chat-room.firebaseio.com/');
			var existingUserRef = new Firebase('https://fire-chat-room.firebaseio.com')
				.child('users');
			var simpleLogin = $firebaseSimpleLogin(ref);

			var tempUser;

			var service = {
				emailLogin: emailLogin,
				getCurrentUser: getCurrentUser,
				logout: logout,
				createUser: createUser,
				ref: simpleLogin // expose ref if necessary
			};

			// when user gets to the page, get the current user from firebase
			$firebaseSimpleLogin(ref)
				.$getCurrentUser()
				.then(updateUser);

			// listener to login
			$rootScope.$on('$firebaseSimpleLogin:login', storeUser);

			return service;

			function emailLogin (user) {
				return simpleLogin
					.$login(
						'password',
						{
							email: user.email,
							password: user.password
						}
					);
			}

			function getCurrentUser () {
				return simpleLogin.$getCurrentUser()
					.then(getUserFromDatabase);

				function getUserFromDatabase (user) {
					var deferred = $q.defer();

					if (user) {
						deferred.resolve(
							$firebase(
								existingUserRef
									.child(user.id)
							)
							.$asObject()
							.$loaded()
							.then(returnUserObject)
						);
					} else {
						deferred.reject('Failed to find user in database.');
					}

					return deferred.promise;

					function returnUserObject (user) {
						return user;
					}
				}
			}

			function createUser (email, password) {
				return simpleLogin.$createUser(email, password);
			}

			function logout () {
				simpleLogin.$logout();
				$state.go('login');
			}

			// update the rootscope user based on the current user in firebase
			function updateUser (user) {
				if(user) {
					var userRef = existingUserRef.child(user.id);

					$rootScope.user = $firebase(userRef)
						.$asObject();
				}
			}

			function storeUser (event, user) {
				if (event) {
					// TODO: add handler here
				}
				if (user) {
					$firebase(
						existingUserRef.child(user.id)
					)
						.$asObject()
						.$loaded()
						.then(function(existingUser) {
							if(!existingUser.$value) {
								// save new user's profile into Firebase so we can
								// list users, use them in security rules, and show profiles
								$firebase(existingUserRef)
									.$set(
										user.id,
										{
											displayName: user.email,
											provider: user.provider
										}
									);
							}
						});

				} else {
					console.log('wtf')
				}
			}
		}
	}
);