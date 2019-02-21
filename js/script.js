let dictionary = {
  'int': 'var',
  'float': 'var',
  'string': 'var',
  '^': '*',
  '--': '-',
  '++': '+',
  '%': '/',
  '<=': '=',
  '#': '//',
  'repeat': 'for'
};

let string = `a: int <= 10;
b: string <= 'Start '; # comment example
repeat(int i = 0; i < 10; i++) {
  a <= a ++ i ^ 2;
}
b <= b ++ 'End';`;

function changeValue(str) {
  let newString = str.split(' ');

  for (let i = 0; i < newString.length; i++) {
    for (let key in dictionary) {
      if (newString[i] === key) {
        newString[i] = dictionary[key];
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

console.log(changeValue(string));