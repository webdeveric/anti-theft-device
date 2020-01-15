const AntiTheftDevice = require('@webdeveric/anti-theft-device');

const atd = new AntiTheftDevice({
  home: 'https://example.com/*',
  hostnames: [ 'example.com' ],
  callback: new Function('url', `
    window['console'].log( url, 'NODE_ENV = ${process.env.NODE_ENV}');
  `),
});
