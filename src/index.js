'use strict';

// const validateOptions = require('schema-utils');
const { ConcatSource } = require('webpack-sources');
const { iife } = require('./utils');

class AntiTheftDevice
{
  constructor( options )
  {
    this.options = {
      enabled: true,
      entryOnly: true,
      hostnames: [],
      callback( url ) {
        window.location.replace( url );
      },
      ...options,
    };

    if ( ! this.options.home ) {
      throw new Error('home is required');
    }

    if ( ! this.options.hostnames.length ) {
      throw new Error('at least one valid hostname is required');
    }
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

    const escapeDots = word => word.replace(/\./g, '\\.');

    const pattern = `/${hostnames.map( escapeDots ).join('|')}/i`;

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

      compilation.hooks.afterOptimizeChunkAssets.tap( this.constructor.name, chunks => {
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
