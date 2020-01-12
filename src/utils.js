function iife( func, ...args )
{
  const script = func.toString().replace(/^function anonymous\(/, 'function(');

  const argStr = args.join(',');

  return `(${script})(${argStr})`;
}

module.exports = {
  iife,
};
