const AntiTheftDevice = require('../src/anti-theft-device');

describe('AntiTheftDevice', () => {
  const defaultOptions = {
    home: 'webdeveric.com',
    hostnames: [
      'webdeveric.com',
    ],
  };

  describe('options', () => {
    it('Does not throw when given valid options', () => {
      const options = {
        enabled: true,
        entryOnly: false,
        home: 'webdeveric.com',
        hostnames: [
          'localhost',
          'webdeveric.com',
        ],
        callback: function( /* url */ ) {
        }
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

  describe('getHomeString()',() => {
    it('Returns the home string', () => {
      const atd = new AntiTheftDevice( defaultOptions );

      expect( atd.getHomeString() ).toBe("'webdeveric.com'");
    });

    it('Returns code that replaces /* with location.pathname', () => {
      const atd = new AntiTheftDevice( {
        ...defaultOptions,
        home: 'webdeveric.com/*',
      } );

      expect( atd.getHomeString() ).toBe("'webdeveric.com/*'.replace( /\\/\\*$/, window.location.pathname )");
    });
  });

  describe('makeScript()', () => {
    it('Returns code', () => {
      const atd = new AntiTheftDevice( defaultOptions );

      expect( atd.makeScript() ).toEqual( expect.stringMatching(/^\(function\(/) );
    });
  });

  describe('apply()', () => {
    it.todo('Works with Webpack');
  });
});
