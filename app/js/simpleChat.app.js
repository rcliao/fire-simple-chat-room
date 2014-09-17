/* global define */

define(
	[
		'angular',

		'firebase',
		'angular-firebase'
	],
	function(angular) {
		'use strict';

		return angular
			.module(
				'SimpleChat',
				[
					'firebase'
				]
			);
	}
);