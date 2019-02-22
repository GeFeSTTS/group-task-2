function balanceOfBrackets(str) {
  let result = '';
  let amountOfRoundBr = 0;
  let amountOfCurlyBr = 0;
  let amountOfSquareBr = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] == '(') {
      amountOfRoundBr++;
    } else if (str[i] == ')') {
      amountOfRoundBr--;
    } else if (str[i] == '{') {
      amountOfCurlyBr++;
    } else if (str[i] == '}') {
      amountOfCurlyBr--;
    } else if (str[i] == '[') {
      amountOfSquareBr++;
    } else if (str[i] == ']') {
      amountOfSquareBr--;
    }
  }

  if (amountOfRoundBr !== 0 && amountOfCurlyBr !== 0 && amountOfSquareBr !== 0) {
    result = 'Correct brackets balance'
  } else {
    result = 'Incorrect brackets balance'
  }

  return result;