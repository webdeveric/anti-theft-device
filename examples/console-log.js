const AntiTheftDevice = require('@webdeveric/anti-theft-device');

const atd = new AntiTheftDevice({
  home: 'https://example.com/*',
  hostnames: [ 'example.com' ],
  callback( url ) {
    // console.log usually gets removed during minification
    window['console'].log( url, process.env.NODE_ENV );
  },
});
