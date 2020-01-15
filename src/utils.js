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
  // Check for plain hostnames and escape the dots so they aren't treated as meta-characters.
  if ( typeof word === 'string' && /^[a-z0-9.-]+$/.test( word ) ) {
    word = word.replace('.', '\\.');
  }

  const { source } = new RegExp( word );

  // If the word does not have the ^ or $ meta-character, assume the user wants the word to match exactly.
  return ! /^\^|\$$/.test( source ) ? `^${source}$` : source;
}

module.exports = {
  iife,
  convertToRegexString,
};
