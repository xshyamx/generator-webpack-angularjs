'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-webpack-angularjs:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        appName: 'test-app',
        appDescription: 'This is a test app',
        appVersion: '0.0.2'
      });
  });

  it('creates files', () => {
    assert.file(['README.md', 'package.json', '.gitignore', '.yo-rc.json']);
  });
});
