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
			'$firebase',
			'$firebaseSimpleLogin'
		];

		return app
			.factory('SimpleLoginService', SimpleLoginService);

		function SimpleLoginService ($rootScope, $log, $firebase, $firebaseSimpleLogin) {
			var ref = new Firebase('https://fire-chat-room.firebaseio.com/');
			var existingUserRef = new Firebase('https://fire-chat-room.firebaseio.com')
				.child('users');

			$firebaseSimpleLogin(ref)
				.$getCurrentUser()
				.then(updateUser);

			// listener to login
			$rootScope.$on('$firebaseSimpleLogin:login', storeUser);

			return $firebaseSimpleLogin(ref);

			function updateUser (user) {
				var userRef = existingUserRef.child(user.id);

				$rootScope.user = $firebase(userRef)
					.$asObject();
				console.log($rootScope.user);
			}

			function storeUser (event, user) {
				if (event) {
					// TODO: add handler here

				}
				if (user) {
					var existingUser = $firebase(existingUserRef)
						.$asObject()
						.$value;

					if(!existingUser) {
						// save new user's profile into Firebase so we can
						// list users, use them in security rules, and show profiles
						$firebase(existingUserRef)
							.$set(
								user.id,
								{
									displayName: user.displayName || user.email || user.username,
									provider: user.provider
								}
							);
					}

				} else {
					console.log('wtf')
				}
			}
		}
	}
);