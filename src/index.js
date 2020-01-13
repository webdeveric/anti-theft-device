'use strict';

const validateOptions = require('schema-utils');
const { ConcatSource } = require('webpack-sources');
const { iife, convertToRegexString } = require('./utils');
const optionsSchema = require('./options-schema.json');

class AntiTheftDevice
{
  constructor( options )
  {
    this.options = {
      enabled: true,
      entryOnly: true,
      home: 'localhost',
      hostnames: [ '^localhost$' ],
      callback( url ) {
        window.location.replace( url );
      },
      ...options,
    };

    validateOptions(optionsSchema, this.options, {
      name: this.constructor.name,
      baseDataPath: 'options',
    });
  }

  getHomeString()
  {
    const { home } = this.options;

    if ( /\/\*$/.test(home) ) {
      return `'${home}'.replace( /\\/\\*$/, window.location.pathname )`;
    }

    return `'${home}'`;
  }

  makeScript()
  {
    const { hostnames, callback } = this.options;

    const pattern = `/${hostnames.map( convertToRegexString ).join('|')}/i`;

    const func = new Function(`
      if ( ! ${pattern}.test(window.location.hostname) ) {
        ${iife(callback, this.getHomeString())}
      }
    `);

    return iife( func );
  }

  apply(compiler)
  {
    const { enabled, entryOnly } = this.options;

    if ( ! enabled ) {
      return;
    }

    const script = this.makeScript();

    compiler.hooks.compilation.tap( this.constructor.name, compilation => {
      if ( ! compilation.updateAsset ) {
        console.log('compilation.updateAsset is not defined. Please update Webpack');

        return;
      }

      compilation.hooks.optimizeChunkAssets.tap( this.constructor.name, chunks => {
        for ( const chunk of chunks ) {
          if ( entryOnly && ! chunk.canBeInitial() ) {
            continue;
          }

          chunk.files.filter( f => f.endsWith('.js') ).forEach( f => {
            compilation.updateAsset( f, old => new ConcatSource( script, ';', old ) );
          });
        }
      });
    });
  }
}

module.exports = AntiTheftDevice;
