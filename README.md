# generator-webpack-angularjs [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Creating an AngularJS + UI-Router app with Webpack

Basic app includes

- Bootstrap
- Login page with authentication
- Sample directive
- Sample filter
- Production webpack build config

## Installation

First, install [Yeoman](http://yeoman.io) and generator-webpack-angularjs using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-webpack-angularjs
```

Then generate your new project:

```bash
yo webpack-angularjs
```

If the app name does not match directory name app will be initialized in a new directory with the app name.

## Usage ##

The main app generator creates a default AngularJS app with login and home page using webpack build

Example
```sh
yo webpack-angular --module mod
```
This will create:
```sh
.gitignore
.env
package.json
webpack.config.js
README.md
src/index.html
src/app.js
src/constants.js
src/filters/title-case.js
src/directives/<module>-table.js
src/directives/<module>-table.html
src/services/login.js
src/login/login.js
src/login/login.html
src/css/login.css
src/home/home.js
src/includes/navbar.html
src/home/home.html
src/css/home.css
```

### Sub-generators ###

#### Service ####

Creates a new Angular service. Prompts for the service name. Picks app and module from .yo-rc.json

Example:
```sh
yo webpack-angularjs:service
```
This will create:
```sh
src/services/<service-name>.js
```

#### State ####

Creates a new ui-router state with corresponding template and controller

Example:

``` sh
yo webpack-angularjs:state --state dashboard --parent home
```

This will create:

``` sh
src/home/dashboard/dashboard.js
src/home/dashboard/dashboard.html
```

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

Apache-2.0 © [shyam]()


[npm-image]: https://badge.fury.io/js/generator-webpack-angularjs.svg
[npm-url]: https://npmjs.org/package/generator-webpack-angularjs
[travis-image]: https://travis-ci.org/xshyamx/generator-webpack-angularjs.svg?branch=master
[travis-url]: https://travis-ci.org/xshyamx/generator-webpack-angularjs
[daviddm-image]: https://david-dm.org/xshyamx/generator-webpack-angularjs.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/xshyamx/generator-webpack-angularjs
