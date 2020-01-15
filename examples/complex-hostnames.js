const AntiTheftDevice = require('@webdeveric/anti-theft-device');

const atd = new AntiTheftDevice({
  home: 'https://example.com/',
  hostnames: [
    'example.com',
    '.demo.example.com$',
    /^(www|some-other-subdomain)\.example\.com$/,
  ],
});
