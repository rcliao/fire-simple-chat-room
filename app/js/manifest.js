/* global require */

require.config({
	baseUrl: 'js',
	paths: {
		// angularjs official stuff
		'angular': 'libs/angular/angular',
		'angular-animate': 'libs/angular-animate/angular-animate',

		// angularjs-ui components
		'angular.ui-router': 'libs/angualr-ui-router',

		// firebase
		'angular-firebase': 'libs/angularfire/angularfire',
		'firebase': 'libs/firebase/firebase',

		// controllers
		'simpleChat.chat': 'chat/chatCtrl',

		// main app
		'simpleChat.app': 'simpleChat.app'
	},
	shim: {
		'angular': {
			exports: 'angular'
		},
		'angular-firebase': {
			deps: ['angular', 'firebase']
		},
		'angualr-ui-router': {
			deps: ['angular']
		}
	}
});

require(
	[
		'angular', // used for bootstrapping app

		'simpileChat.app' // main app definition
	],
	function(angular) {
		angular.bootstrap(document, ['SimpleChat']);
	}
);