# su-datepicker-angular
Flexible angular date range picker without dependencies. For a demo visit [https://github.io/StudentUniverse/su-datepicker-angular](http://studentuniverse.github.io/su-datepicker-angular/)

## Use
This package is intended to be used with [angular](https://angularjs.org/) 1.x.
Tested with 1.2.29.

Although (bootstrap)[http://getbootstrap.com/] is not necessary for the code to
work many of the templates use bootstrap structures. These templates can
be overwritten to get a custom look and feel.

You can download su-datepicker-angular using [bower](http://bower.io/).
`bower install su-datepicker-angular`

Make sure that the javascript is referenced in the page typically

    <script src="bower_components/su-datepicker-angular/dist/su-datepicker-angular.min.js"></script>

Declare su-datepicker-angular as angular module dependency

    angular.module('myApp', ['su.datepicker'])

## Building
Bower is used as the build system so you need to have it installed globally. `npm install -g grunt-cli` should do it.
- clone the repo
- run `npm install` to get the dev dependencies
- run `grunt`

To generate a new version of the dist run `grunt dist`.

## Testing
Karma is used to execute Jasmine tests. Get the command line interface `npm install -g karma-cli` and then run `grunt test` to build and run the tests.
