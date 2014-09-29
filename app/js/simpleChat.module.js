/* global define */

define(
	[
		'angular',
		'angular-animate',

		'angular.ui-router',
		'angular.ui-bootstrap',

		'firebase',
		'angular-firebase',
		'firebase-simple-login'
	],
	function (angular) {
		'use strict';

		return angular
			.module(
				'SimpleChat',
				[
					'ngAnimate',
					'ui.router',
					'ui.bootstrap',
					'firebase'
				]
			).run(['$rootScope', '$log', function($rootScope, $log) {
				$rootScope.$on('$routeChangeError', function (event, current, previous,
					rejection) {

					console.log(event);
					console.log(current);
					console.log(previous);
					console.log(rejection);

					$rootScope.criticalError = true;
					$rootScope.criticalErrorReason = rejection;
				});

				$rootScope.$on('$routeChangeSuccess', function() {
					$rootScope.criticalError = false;
					$rootScope.criticalErrorReason = '';
				});
			}]);
	}
);