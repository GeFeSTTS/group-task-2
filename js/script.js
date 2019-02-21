let dictionary = {
  'int': 'var',
  'float': 'var',
  'string': 'var',
  'repeat': 'for'
};

let mathOperation = {
  '^': '*',
  '--': '-',
  '++': '+',
  '%': '/',
  '<=': '=',
  '#': '//'
};

let string = `a: int <= 10;
b: string <= 'Start '; # comment example
repeat(int i = 0; i < 10; i++) {
  a <= a ++ i ^ 2;
}
b <= b ++ 'End';`;

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

function changeValue() {
  let result = "";
  for (let key in dictionary) {
    result = replaceAll(string, key, dictionary[key]);
    string = result;
  }
  let newString = string.split(' ');

  for (let i = 0; i < newString.length; i++) {
    for (let key in mathOperation) {
      if (newString[i] === key) {
        newString[i] = mathOperation[key];
      }
    }
  }

  let readyStr = newString.join(' ');

  readyStr = readyStr.replace(/\w: var/g, (match) => {
    let arrayOfVariableAndVar = match.split(' ');
    let beginDeleteFrom = 0;
    let endDelete = -1;
    let firstArrayItem = 0;
    let secondArrayItem = 1;
    return [arrayOfVariableAndVar[secondArrayItem], arrayOfVariableAndVar[firstArrayItem]
      .slice(beginDeleteFrom, endDelete)].join(' ');
  });

  return readyStr;
}

console.log(changeValue());

function validateInput(str) {
  const intDeclareRegExp = /\w+: int <= \d+;/g;
  const intRepeatRegExp = /repeat\(int \w+ = \d+; \w+ < \d+; \w(\+\+|--)\)/g;
  const floatDeclareRegExp = /\w+: float <= [-+]?[0-9]\.?[0-9]+;/g;
  const stringDeclareRegExp = /\w+: string <= '.*';/g;
  const commentRegExp = /^[^#]*#[^#]*$/g;
  const multiplyRegExp = /\(?(?:\w|') \)?\^\(? (?:\w|')\)?/g;
  const divideRegExp = /\(?(?:\w|') \)?%\(? (?:\w|')\)?/g;
  const subtractRegExp = /\(?(?:\w|') \)?--\(? (?:\w|')\)?/g;
  const addRegExp = /\(?(?:\w|') \)?\+{2}\(? (?:\w|')\)?/g;

  const lineStrings = str.split('\n');

  for (let i = 0; i < lineStrings.length; i++) {
    const wordsInString = lineStrings[i].split(' ');

    if (lineStrings[i].match(/.*#.*/g)) {
      if (!(lineStrings[i].match(commentRegExp))) {
        return i + 1;
      }
    }

    if (wordsInString[0].endsWith(':')) {
      if (!(lineStrings[i].match(intDeclareRegExp) ||
        lineStrings[i].match(floatDeclareRegExp) ||
        lineStrings[i].match(stringDeclareRegExp))) {
        return i + 1;
      }
    }
    if (wordsInString[0].match(/repeat/g)) {
      if (!(lineStrings[i].match(intRepeatRegExp))) {
        return i + 1;
      }
    }

   /* TODO Case when first word doesn't contain ':' and is not 'repeat'
    if (wordsInString[0].match(/\w(?!:)(?!repeat)/g))   {
      if (!(lineStrings[i].match(/\w+ <= \w+ (\+\+|--|%|^)/g))) {
        return i + 1;
      }
    }

   */

    if (lineStrings[i].match(/\w+ <= \w+ (\+\+|--|%|^)/g)) {
      if (!(lineStrings[i].match(multiplyRegExp) ||
        lineStrings[i].match(divideRegExp) ||
        lineStrings[i].match(subtractRegExp) ||
        lineStrings[i].match(addRegExp))) {
        return i + 1;
      }
    }
  }
}

console.log(validateInput(string));
