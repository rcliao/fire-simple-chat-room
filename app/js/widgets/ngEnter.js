/*global define*/

define(
	[
		'simpleChat.module'
	],
	function(app) {
		'use strict';

		return app
			.directive('ngEnter', ngEnter);

		function ngEnter () {
			var directive = {
				link: link
			};

			return directive;

			function link (scope, element, attrs) {
				element.bind('keydown keypress', function (event) {
					if(event.which === 13) {
						scope.$apply(function (){
							scope.$eval(attrs.ngEnter);
						});

						event.preventDefault();
					}
				});
			}
		}
	}
);