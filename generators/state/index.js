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
    this.option('state', {
      type: String,
      required: true,
      alias: 's',
      desc: 'State name'
    })
    this.option('parent', {
      type: String,
      required: true,
      alias: 'p',
      desc: 'Parent state name'
    })
  }
  prompting() {
    let states = this.config.get('states')
    const prompts = [];
    if ( !this.props.stateName ) {
      prompts.push({
        name: 'stateName',
        message: 'Your state name',
        default: this.options.state,
        validate: str => str.length > 0
      })
    }
    if ( states.length > 0 ) {
      prompts.push({
        name: 'parent',
        message: 'Parent state',
        default: this.options.parent,
        validate: str => states.indexOf(str) != -1
      })
    }

    return this.prompt(prompts).then(props => {
      if ( props.stateName ) {
        this.props.stateName = camelCase(props.stateName).replace(/Ctrl$/, '');
        this.props.stateUrl = kebabCase(this.props.stateName)
      }
      if ( props.parent ) {
        this.props.parent = props.parent;
      }
    });
  }
  default() {
    if ( !this.props.appName ) {
      this.props.appName = this.config.get('app')
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
    let baseDir = !!this.props.parent
        ? `src/${this.props.parent}/${this.props.stateUrl}`
        : `src/${this.props.stateUrl}`;

    this.fs.copyTpl(
      this.templatePath('_controller.js'),
      this.destinationPath(`${baseDir}/${this.props.stateUrl}.js`),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('_controller.html'),
      this.destinationPath(`${baseDir}/${this.props.stateUrl}.html`),
      this.props
    );
    let states = this.config.get('states') || []
    states.push((!!this.props.parent ? this.props.parent + '.' : '') + this.props.stateName)
    this.config.set('states', states)
  }

};
