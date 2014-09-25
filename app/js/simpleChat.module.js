/* global define */

define(
	[
		'angular',
		'angular-animate',

		'angular.ui-router',

		'firebase',
		'angular-firebase'
	],
	function(angular) {
		'use strict';

		return angular
			.module(
				'SimpleChat',
				[
					'ngAnimate',
					'ui.router',
					'firebase'
				]
			);
	}
);