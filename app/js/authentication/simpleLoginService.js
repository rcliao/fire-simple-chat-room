/*global define, Firebase*/

define(
	[
		'simpleChat.module',
		'firebase'
	],
	function (app) {
		SimpleLoginService.$inject = ['$rootScope', '$firebaseSimpleLogin'];

		return app
			.factory('SimpleLoginService', SimpleLoginService);

		function SimpleLoginService ($rootScope, $firebaseSimpleLogin) {
			var ref = new Firebase('https://fire-chat-room.firebaseio.com/');

			$rootScope.user = $firebaseSimpleLogin(ref).$getCurrentUser() || undefined;

			return $firebaseSimpleLogin(ref);
		}
	}
);