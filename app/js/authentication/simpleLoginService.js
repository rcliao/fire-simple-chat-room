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

			$rootScope.user = $firebaseSimpleLogin(ref).$getCurrentUser() || undefined;

			// listener to login
			$rootScope.$on('$firebaseSimpleLogin:login', storeUser);

			return $firebaseSimpleLogin(ref);

			function storeUser (event, user) {
				if (event) {
					// TODO: add handler here

				}
				if (user) {
					var existingUserRef = new Firebase('https://fire-chat-room.firebaseio.com')
						.child('users');

					var existingUser = $firebase(existingUserRef)
						.$asObject().$value;

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