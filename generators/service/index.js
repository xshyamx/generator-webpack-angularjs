'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');
const path = require('path')


function titleCase(input){
  return toKebabCase(input)
    .split('-')
    .map(p => p[0].toUpperCase() + p.slice(1))
    .join(' ')
}

function camelCase(input){
  return input
    .replace(/[ _-](\w)/g, (groups) => groups[1].toUpperCase());
}

function kebabCase(input){
  return input
    .replace(/[ _]/g, '-')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()
}

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.props = this.options.props || {}
  }
  prompting() {
    const prompts = [];
    if ( !this.props || !this.props.serviceName ) {
      prompts.push({
        name: 'serviceName',
        message: 'Your service name',
        validate: str => str.length > 0
      })
    } else {
      this.props.serviceName = camelCase(this.props.serviceName).replace(/Svc$/, '');
    }

    return this.prompt(prompts).then(props => {
      if ( props.serviceName ) {
        this.props.serviceName = camelCase(props.serviceName).replace(/Svc$/, '');
      }
    });
  }
  default() {
    if ( !this.props.appName ) {
      this.props.appName = this.config.get('app').name
    }
    if ( !this.props.moduleName ) {
      this.props.moduleName = this.config.get('module')
    }
    if (path.basename(this.destinationPath()) !== this.props.appName) {
      this.log(
        'Your generator must be inside a folder named ' + this.props.appName + '\n' +
          'I\'ll automatically create this folder.'
      );
      mkdirp(this.props.appName);
      this.destinationRoot(this.destinationPath(this.props.appName));
    }
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('_service.js'),
      this.destinationPath(`src/services/${kebabCase(this.props.serviceName)}.js`),
      this.props
    );
    let svcs = this.config.get('services') || []
    svcs.push(this.props.serviceName)
    this.config.set('services', svcs)
  }

};
