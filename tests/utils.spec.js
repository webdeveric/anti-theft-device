const { iife, convertToRegexString } = require('../src/utils');

describe('utils', () => {
  describe('iife', () => {
    it('Returns a string representation of an iife', () => {
      const obj = {
        fn1(){},
        fn2: function() {},
        fn3: new Function(''),
      };

      const startOfIIFE = expect.stringMatching(/^\(function\(/);

      expect( iife( obj.fn1 ) ).toEqual( startOfIIFE );
      expect( iife( obj.fn2 ) ).toEqual( startOfIIFE );
      expect( iife( obj.fn3 ) ).toEqual( startOfIIFE );
      expect( iife( function() {} ) ).toEqual( startOfIIFE );
      expect( iife( function temp() {} ) ).toEqual( startOfIIFE );
      expect( iife( new Function('') ) ).toEqual( startOfIIFE );
    });

    it('Returns a string representation of an iife with arguments', () => {
      /* eslint-disable no-unused-vars */
      expect( iife( function( url ) {}, JSON.stringify('webdeveric.com') ) ).toBe('(function(url){})("webdeveric.com")');
      expect( iife( function( url, redirect ) {}, JSON.stringify('webdeveric.com'), true ) ).toBe('(function(url, redirect){})("webdeveric.com",true)');
      /* eslint-enable no-unused-vars */
    });
  });

  describe('convertToRegexString', () => {
    it('Plain strings without meta-characters should match exactly', () => {
      expect( convertToRegexString('localhost') ).toBe('^localhost$');
      expect( convertToRegexString('webdeveric.com') ).toBe('^webdeveric\\.com$');
    });

    it('RegExp can be used', () => {
      expect( convertToRegexString(/localhost/) ).toBe('^localhost$');
      expect( convertToRegexString(/\.webdeveric\.com$/) ).toBe('\\.webdeveric\\.com$');
    });

    it('meta-characters can be used', () => {
      expect( convertToRegexString('^localhost$') ).toBe('^localhost$');
      expect( convertToRegexString('.webdeveric.com$') ).toBe('\\.webdeveric\\.com$');
    });
  });
});
