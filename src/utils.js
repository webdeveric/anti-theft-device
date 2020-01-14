function iife( func, ...args )
{
  const script = func.toString().replace(
    /^(?:function\s)*(?<name>[a-z0-9_]+)?\s?\((?<args>[^)]+)?\)\s?{/i,
    function( ...replaceArgs ) {
      // Named capture groups are the last argument.
      const { args = '' } = replaceArgs.pop();

      return `function(${args.trim()}){`;
    }
  );

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
