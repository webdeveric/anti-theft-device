const AntiTheftDevice = require('@webdeveric/anti-theft-device');

const atd = new AntiTheftDevice({
  home: 'https://example.com/*',
  hostnames: [ 'example.com' ],
  callback() {
    try {
      navigator.sendBeacon('https://report.example.com/', document.location.href);
    } catch (error) {}
  },
});
