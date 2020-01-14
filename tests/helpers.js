const webpack = require('webpack');
const MemoryFs = require('memory-fs');

global.makeCompiler = ( config, ...plugins ) => {
  const compiler = webpack({
    ...config,
    plugins,
  });

  compiler.outputFileSystem = new MemoryFs();

  return compiler;
};
