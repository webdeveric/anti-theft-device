const { iife, convertToRegexString } = require('../src/utils');

describe('utils', () => {
  describe('iife', () => {
    it('Returns a string representation of an iife', () => {
      expect( iife( function() {} ) ).toBe('(function(){})()');
      expect( iife( function temp() {} ) ).toBe('(function(){})()');
      expect( iife( new Function('') ).replace(/\s/g,'') ).toBe('(function(){})()');
    });

    it('Returns a string representation of an iife with arguments', () => {
      expect( iife( function( url ) {}, JSON.stringify('webdeveric.com') ) ).toBe('(function(url){})("webdeveric.com")');
      expect( iife( function( url, redirect ) {}, JSON.stringify('webdeveric.com'), true ) ).toBe('(function(url, redirect){})("webdeveric.com",true)');
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
      expect( convertToRegexString('\.webdeveric\.com$') ).toBe('\\.webdeveric\\.com$');
    });
  });
});
