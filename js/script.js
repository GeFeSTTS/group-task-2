let dictionary = {
  int: 'var',
  float: 'var',
  string: 'var',
  repeat: 'for'
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

  readyStr = readyStr.replace(/\w: var/g, match => {
    let arrayOfVariableAndVar = match.split(' ');
    let beginDeleteFrom = 0;
    let endDelete = -1;
    let firstArrayItem = 0;
    let secondArrayItem = 1;
    return [
      arrayOfVariableAndVar[secondArrayItem],
      arrayOfVariableAndVar[firstArrayItem].slice(beginDeleteFrom, endDelete)
    ].join(' ');
  });

  return readyStr;
}
function balanceOfBrackets(str) {
  let lines = str.split('\n');
  let result = '';
  let lineNum = 0;
  let amounts = {
    RoundBr : {
      amount: 0,
      line: 0
    },
    CurlyBr : {
      amount: 0,
      line: 0
    },
    SquareBr : {
      amount: 0,
      line: 0
    }
  }
  
  for (let i = 0; i < lines.length; i++){
  for (let j = 0; j < lines[i].length; j++) {
    let currentymbol = lines[i][j]
      if (currentymbol === '(') {
          amounts.RoundBr.amount++;
          amounts.RoundBr.line = i+1;
      } else if (currentymbol === ')') {
        amounts.RoundBr.amount--;
        amounts.RoundBr.line = i+1;
      } else if (currentymbol === '{') {
          amounts.CurlyBr.amount++;
          amounts.RoundBr.line = i+1;
      } else if (currentymbol === '}') {
          amounts.CurlyBr.amount--;
          amounts.RoundBr.line = i+1;
      } else if (currentymbol === '[') {
          amounts.SquareBr.amount++;
          amounts.SquareBr.line = i+1;
      } else if (currentymbol === ']') {
          amounts.SquareBr.amount--;
          amounts.RoundBr.line = i+1;
      }
  }
}
  if (amounts.RoundBr.amount !== 0 || amounts.CurlyBr.amount !== 0 || amounts.SquareBr.amount !== 0) {
    for (let key in amounts) {
      if (amounts[key].line !== 0) {
        lineNum = amounts[key].line;
        break;
      }
    }
      result = `Line ${lineNum}: Incorrect brackets balance`
  }
  
  return result;
}
function validateInput(str) {
  let bracketsBalance = balanceOfBrackets(str);
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
  const assignmentRegExp = /\w+ <= \w+ (\+\+|--|%|\^).*;/g;

  const lineStrings = str.split('\n');

  for (let i = 0; i < lineStrings.length; i++) {
    const syntaxError = `Line #${i + 1}: syntax error`;

    if (
      lineStrings[i] === '' ||
      lineStrings[i] === ' ' ||
      lineStrings[i] === '}'
    ) {
      continue;
    }

    if (lineStrings[i].match(/.*#.*/g)) {
      if (!lineStrings[i].match(commentRegExp)) {
        return syntaxError;
      }
    }

    if (lineStrings[i].match(/\w:/g)) {
      if (
        !(
          lineStrings[i].match(intDeclareRegExp) ||
          lineStrings[i].match(floatDeclareRegExp) ||
          lineStrings[i].match(stringDeclareRegExp)
        )
      ) {
        return syntaxError;
      }
      continue;
    }
    if (lineStrings[i].match(/repeat/g)) {
      if (!lineStrings[i].match(intRepeatRegExp)) {
        return syntaxError;
      }
      if (
        !(
          lineStrings[i].match(incrementRegExp) ||
          lineStrings[i].match(decrementRegExp)
        )
      ) {
        return syntaxError;
      }
      continue;
    }

    if (lineStrings[i].match(/\+/g)) {
      if (lineStrings[i].match(/(?:\(|\))/g)) {
        console.log(lineStrings[i]);
        let newLine = lineStrings[i].replace(/\(/g, '');
        console.log(newLine);
        newLine = newLine.replace(/\)/g, '');
        console.log(newLine);

        if (!newLine.match(addRegExp)) {
          return syntaxError;
        }
      } else if (!lineStrings[i].match(addRegExp)) {
        return syntaxError;
      }
    }

    if (lineStrings[i].match(/-/g)) {
      if (lineStrings[i].match(/(?:\(|\))/g)) {
        let newLine = lineStrings[i].replace(/\(/g, '');
        newLine = newLine.replace(/\)/g, '');

        if (!newLine.match(subtractRegExp)) {
          return syntaxError;
        }
      } else if (!lineStrings[i].match(subtractRegExp)) {
        return syntaxError;
      }
    }

    if (lineStrings[i].match(/\^/g)) {
      if (lineStrings[i].match(/(?:\(|\))/g)) {
        let newLine = lineStrings[i].replace(/\(/g, '');
        newLine = newLine.replace(/\)/g, '');

        if (!newLine.match(multiplyRegExp)) {
          return syntaxError;
        }
      } else if (!lineStrings[i].match(multiplyRegExp)) {
        return syntaxError;
      }
    }

    if (lineStrings[i].match(/%/g)) {
      if (lineStrings[i].match(/(?:\(|\))/g)) {
        let newLine = lineStrings[i].replace(/\(/g, '');
        newLine = newLine.replace(/\)/g, '');
        console.log(newLine);

        if (!newLine.match(divideRegExp)) {
          return syntaxError;
        }
      } else if (!lineStrings[i].match(divideRegExp)) {
        return syntaxError;
      }
    }

    if (lineStrings[i].match(/\w/g)) {
      if (lineStrings[i].match(/(?:\(|\))/g)) {
        let newLine = lineStrings[i].replace(/\(/g, '');
        newLine = newLine.replace(/\)/g, '');

        if (!newLine.match(assignmentRegExp)) {
          return syntaxError;
        }
      } else if (!lineStrings[i].match(assignmentRegExp)) {
        return syntaxError;
      }
    }
  }
    if(bracketsBalance) {
      return bracketsBalance;
    }else {
      return 'Transpilation completed...no errors found';
    }
    
  } 


document.getElementById('transpile').onclick = function() {
  let string = document.getElementById('input').value;
  let changeString = changeValue(string);
  document.getElementById('output').innerHTML = changeString;
  document.getElementById('info').value = validateInput(string);
  console.log(string, validateInput(string));
}