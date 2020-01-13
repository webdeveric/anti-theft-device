# Anti Theft Device

This Webpack plugin will add a snippet of code to your chunks that will check to see if
the code is running on one of your hostnames.
Its useful for when someone copies your files to make a clone of your site.
By default, it will `window.location.replace()` back to your `home` URL.

## Example Usage

```js
const AntiTheftDevice = require('@webdeveric/anti-theft-device');

// Add this to your Webpack config plugins.

new AntiTheftDevice({
  enabled: process.env.NODE_ENV === 'production', // Defaults to true.
  entryOnly: false, // This adds the snippet to all chunks, not just entry points.
  home: 'https://webdeveric.com/*', // Strings ending in /* will use the location.pathname instead.
  // This should contain strings or RegExp objects.
  hostnames: [
    // You can use your own RegExp.
    /^localhost$/,
    // Strings without ^ or $ meta characters will match the location.hostname exactly.
    'local.webdeveric.com',
    // Strings are passed to new RegExp so you can use meta-characters if you want.
    '.?webdeveric.com$',
  ],
  // The default callback will use location.replace( url ) so the user is taken back to your site.
  // callback should be a simple ES5 compatilbe function.
  // Babel is not involved here.
  // This will recieve the home URL with updated pathname.
  callback: function( url ) {
    // console.log() gets removed during optimization. If you want to use it, use window['console'].log() instead.
    window['console'].log( url );
  },
}),

```
