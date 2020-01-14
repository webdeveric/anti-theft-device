const demo = require('./demo');

import(/* webpackChunkName: 'hello' */ './hello').then( mod => {
  const hello = mod.default;

  hello();
});

demo();
