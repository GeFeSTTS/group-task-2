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

function replaceAll(string, find, replace) {
  return string.replace(new RegExp(find, 'g'), replace);
}

function changeValue(str) {
  let result = '';
  for (let key in dictionary) {
    if (dictionary.hasOwnProperty(key)) {
      result = replaceAll(str, key, dictionary[key]);
      str = result;
    }
  }
  let newString = str.split(' ');

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

function validateInput(str) {
  let result = 0;
  const intDeclareRegExp = / ?\w+: int <= \d+;/g;
  const intRepeatRegExp = / ?repeat\(int \w+ = \d+; \w+ < \d+; \w(\+\+|--)\)/g;
  const floatDeclareRegExp = / ?\w+: float <= [-+]?[0-9]\.?[0-9]+;/g;
  const stringDeclareRegExp = / ?\w+: string <= '.*';/g;
  const commentRegExp = /^[^#]*#[^#]*$/g;
  const multiplyRegExp = /(?:\w|') \^ (?:\w|')/g;
  const divideRegExp = /(?:\w|') % (?:\w|')/g;
  const subtractRegExp = /(?:\w|') -- (?:\w|')/g;
  const addRegExp = /(?:\w|') \+\+ (?:\w|')/g;
  const decrementRegExp = /\w+--/g;
  const incrementRegExp = /\w+\+\+/g;
  const assignmentRegExp = /\w+ <= \w+ (\+\+|--|%|^).*;/g;

  const lineStrings = str.split('\n');

  for (let i = 0; i < lineStrings.length; i++) {

    if (lineStrings[i] === '' ||
      lineStrings[i] === ' ' ||
      lineStrings[i] === '}') {
      continue;
    }

    if (lineStrings[i].match(/.*#.*/g)) {
      if (!lineStrings[i].match(commentRegExp)) {
        return i + 1;
      }
    }

    if (lineStrings[i].match(/\w:/g)) {
      if (!(lineStrings[i].match(intDeclareRegExp) ||
        lineStrings[i].match(floatDeclareRegExp) ||
        lineStrings[i].match(stringDeclareRegExp))) {
        return i + 1;
      }
      continue;
    }
    if (lineStrings[i].match(/repeat/g)) {
      if (!lineStrings[i].match(intRepeatRegExp)) {
        return i + 1;
      }
      if (!(lineStrings[i].match(incrementRegExp) ||
        lineStrings[i].match(decrementRegExp))) {
        return i + 1;
      }
      continue;
    }

    if (lineStrings[i].match(/\w /g)) {
      if (!lineStrings[i].match(assignmentRegExp)) {
        return i + 1;
      }
    }

    if (lineStrings[i].match(/\+/g)) {
      if (lineStrings[i].match(/(?:\(|\))/g)) {
        let newLine = lineStrings[i].replace(/\(/g, '');
        newLine = newLine.replace(/\)/g, '');
        console.log(newLine);

        if (!newLine.match(addRegExp)) {
          return i + 1;
        }
      } else if (!lineStrings[i].match(addRegExp)) {
        return i + 1;
      }
    }

    if (lineStrings[i].match(/-/g)) {
      if (lineStrings[i].match(/(?:\(|\))/g)) {
        let newLine = lineStrings[i].replace(/\(/g, '');
        newLine = newLine.replace(/\)/g, '');

        if (!newLine.match(subtractRegExp)) {
          return i + 1;
        }
      } else if (!lineStrings[i].match(subtractRegExp)) {
        return i + 1;
      }
    }

    if (lineStrings[i].match(/\^/g)) {
      if (lineStrings[i].match(/(?:\(|\))/g)) {
        let newLine = lineStrings[i].replace(/\(/g, '');
        newLine = newLine.replace(/\)/g, '');

        if (!newLine.match(multiplyRegExp)) {
          return i + 1;
        }
      } else if (!lineStrings[i].match(multiplyRegExp)) {
        return i + 1;
      }
    }

    if (lineStrings[i].match(/%/g)) {
      if (lineStrings[i].match(/(?:\(|\))/g)) {
        let newLine = lineStrings[i].replace(/\(/g, '');
        newLine = newLine.replace(/\)/g, '');
        console.log(newLine);

        if (!newLine.match(divideRegExp)) {
          return i + 1;
        }
      } else if (!lineStrings[i].match(divideRegExp)) {
        return i + 1;
      }
    }
  }

  if (result === 0) {
    return 'Transpilation completed...no errors found';
  } else {
    return `Line #${result}: syntax error`;
  }
}

document.getElementById('transpile').onclick = function () {
  let string = document.getElementById('input').value;
  let changeString = changeValue(string);
  document.getElementById('output').innerHTML = changeString;
  document.getElementById('info').value = validateInput(string);
  console.log(string, validateInput(string));
};