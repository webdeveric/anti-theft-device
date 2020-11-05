const path = require('path');
const AntiTheftDevice = require('../src/anti-theft-device');

describe('AntiTheftDevice', () => {
  const defaultOptions = {
    home: 'https://webdeveric.com',
    hostnames: [ 'webdeveric.com' ],
  };

  describe('options', () => {
    it('Does not throw when given valid options', () => {
      const options = {
        enabled: true,
        entryOnly: false,
        home: 'https://webdeveric.com',
        hostnames: [
          'localhost',
          'webdeveric.com',
        ],
        callback: function( /* url */ ) {
        },
      };

      expect( () => new AntiTheftDevice( options ) ).not.toThrow();
    });

    it('Throws an error when given invalid options', () => {
      const options = {
        enabled: 'Yes',
        entryOnly: '0',
        home: '',
        hostnames: [],
        callback: null,
      };

      expect( () => new AntiTheftDevice( options ) ).toThrow();
    });
  });

  describe('getHomeString()', () => {
    it('Returns the home string', () => {
      const atd = new AntiTheftDevice( defaultOptions );

      expect( atd.getHomeString() ).toBe('\'https://webdeveric.com\'');
    });

    it('Returns code that replaces /* with location.pathname', () => {
      const atd = new AntiTheftDevice( {
        ...defaultOptions,
        home: 'webdeveric.com/*',
      } );

      expect( atd.getHomeString() ).toBe('\'webdeveric.com/*\'.replace( /\\/\\*$/, window.location.pathname )');
    });
  });

  describe('makeScript()', () => {
    it('Returns code', () => {
      const atd = new AntiTheftDevice( defaultOptions );

      expect( atd.makeScript() ).toEqual( expect.stringMatching(/^\(function\(/) );
    });
  });

  describe('apply()', () => {
    it('Does nothing if not enabled', done => {
      const config = require('./fixtures/webpack.config.js');

      const atd = new AntiTheftDevice( {
        ...defaultOptions,
        enabled: false,
      });

      const compiler = makeCompiler( config, atd );

      compiler.run( err => {
        expect( err ).toBeNull();

        const content = compiler.outputFileSystem.readFileSync( path.join( compiler.options.output.path, 'client.js') ).toString('utf8');

        expect( content.startsWith( atd.makeScript() ) ).toBeFalsy();

        done();
      });
    });

    it('Prefixes code in the chunk', done => {
      const config = require('./fixtures/webpack.config.js');

      const atd = new AntiTheftDevice( defaultOptions );

      const compiler = makeCompiler( config, atd );

      compiler.run( err => {
        expect( err ).toBeNull();

        const content = compiler.outputFileSystem.readFileSync( path.join( compiler.options.output.path, 'client.js') ).toString('utf8');

        expect( content.startsWith( atd.makeScript() ) ).toBeTruthy();

        done();
      });
    });

    it('Prefixes code in all chunks', done => {
      const config = require('./fixtures/webpack.config.js');

      const atd = new AntiTheftDevice({
        ...defaultOptions,
        entryOnly: false,
      });

      const script = atd.makeScript();

      const checker = {
        apply(compiler)
        {
          compiler.hooks.emit.tapAsync('checker', (compilation, callback) => {
            Object.entries( compilation.assets ).forEach( ([ , src ]) => {
              expect( src.source().startsWith( script ) ).toBeTruthy();
            });

            callback();
          });
        },
      };

      const compiler = makeCompiler( config, atd, checker );

      compiler.run( err => {
        expect( err ).toBeNull();

        done();
      });
    });
  });
});
