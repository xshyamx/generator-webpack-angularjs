'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');
const path = require('path')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option('module', {
      type: String,
      required: true,
      alias: 'm',
      desc: 'Module name'
    })
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the fantabulous ${chalk.green('webpack-angularjs')} generator!`)
    );

    const prompts = [{
      name: 'appName',
      message: 'Your project name',
      default: this.config.get('app.namd') || path.basename(process.cwd()),
      validate: str => str.length > 0
    }, {
      name: 'appDescription',
      message: 'Description'
    }, {
      name: 'appVersion',
      message: 'Version',
      default: '0.0.1'
    }, {
      name: 'moduleName',
      message: 'Module Name',
      default: this.options.module || this.config.get('module'),
      validate: str => str.length > 0
    }, {
      name: 'authorName',
      message: 'Author\'s Name',
      default: this.user.git.name()
    }, {
      name: 'authorEmail',
      message: 'Author\'s Email',
      default: this.user.git.email()
    }, {
      name: 'apiHost',
      message: 'API hostname'
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = Object.assign(this.props || {}, props);
    });
  }

  default() {
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
    this.fs.copy(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('_env'),
      this.destinationPath('.env'),
      this.props
    );
    this.fs.copy(
      this.templatePath('_webpack.config.js'),
      this.destinationPath('webpack.config.js'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath('README.md'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('_index.html'),
      this.destinationPath('src/index.html'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('_app.js'),
      this.destinationPath('src/app.js'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('_constants.js'),
      this.destinationPath('src/constants.js'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('_login.service.js'),
      this.destinationPath('src/services/login.js'),
      this.props
    );
    // login
    this.fs.copyTpl(
      this.templatePath('_login.ctrl.js'),
      this.destinationPath('src/login/login.js'),
      this.props
    )
    this.fs.copyTpl(
      this.templatePath('_login.html'),
      this.destinationPath('src/login/login.html'),
      this.props
    )
    this.fs.copyTpl(
      this.templatePath('_login.css'),
      this.destinationPath('src/css/login.css'),
      this.props
    )
    /*
    this.composeWith(require.resolve('../service'), {
      options: this.options,
      args: this.args,
      props: {
        appName: this.props.appName,
        moduleName: this.props.moduleName,
        serviceName: 'Login'
      }
    })
    */
  }

  install() {
    this.config.set('app', this.props.app);
    this.config.set('module', this.props.moduleName);
    this.config.set('services', ['LoginSvc']);
    this.config.set('directives', ['titlecase']);
    this.config.set('states', ['login', 'home']);
    this.installDependencies({ bower: false });
  }
};
