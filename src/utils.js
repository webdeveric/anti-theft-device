function iife( func, ...args )
{
  const script = func.toString().replace(/^function anonymous\(/, 'function(');

  const argStr = args.join(',');

  return `(${script})(${argStr})`;
}

function convertToRegexString( word )
{
  let { source } = new RegExp( word );

  // If the word does not have the ^ or $ meta-character, assume the user wants the word to match exactly.
  if ( ! /^\^|\$$/.test( source ) ) {
    source = `^${source}$`;
  }

  // If word is a string, lets treat the dots as literal dots and not the RegExp meaning of that meta-character.
  return typeof word === 'string' ? source.replace(/\./g, '\\.') : source;
}

module.exports = {
  iife,
  convertToRegexString,
};
