function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  const re = /\([^()]+\)/;
  let expression = expr.replace(/ /g, '');
  let matchedCalcExpr;

  if (!validParentheses(expression))
    throw new Error('ExpressionError: Brackets must be paired');

  while (re.test(expression)) {
    matchedCalcExpr = expression.match(re);
    expression =
      expression.substring(0, matchedCalcExpr['index']) +
      matchExpr(
        matchExpr(matchedCalcExpr[0].replace(/[()]/g, ''), '/', '*'),
        '+',
        '-'
      ) +
      expression.substring(
        matchedCalcExpr['index'] + matchedCalcExpr[0].length
      );
  }

  expression = expression.replace(/\+\-|\-\+/g, '-');
  expression = expression.replace(/\+\+/g, '+');
  expression = matchExpr(expression, '/', '*');
  expression = matchExpr(expression, '+', '-');

  return +expression;
}

function matchExpr(expression, operand1, operand2) {
  const re = new RegExp('(-?\\d+(\\.\\d+)?)[' + operand1 + operand2 + ']');
  const re2 = new RegExp(
    '(-?\\d+(\\.\\d+)?)[' + operand1 + operand2 + '](-?\\d+(\\.\\d+)?)'
  );
  let matchedCalcExpr;
  let resultOfCalc;
  let operand;

  while (re.test(expression)) {
    matchedCalcExpr = expression.match(re2);
    operand = matchedCalcExpr[0].includes(operand1) ? operand1 : operand2;
    resultOfCalc = calc(+matchedCalcExpr[1], operand, +matchedCalcExpr[3]);
    expression =
      expression.substring(0, matchedCalcExpr['index']) +
      resultOfCalc +
      expression.substring(
        matchedCalcExpr['index'] + matchedCalcExpr[0].length
      );
  }
  return expression;
}

function calc(num1, operand, num2) {
  switch (operand) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*': {
      if (num1 < 0 && num2 < 0) return '+' + (num1 * num2).toFixed(14);
      return (num1 * num2).toFixed(14);
    }
    case '/': {
      if (num2 === 0) throw new TypeError('TypeError: Division by zero.'); // Division by zero
      if (num1 < 0 && num2 < 0) return '+' + (num1 / num2).toFixed(14);
      return (num1 / num2).toFixed(14);
    }
  }
}

function validParentheses(parens) {
  const re = /\(\)/;
  parens = (parens.match(/[()]/g) || []).join('');
  while (re.test(parens)) parens = parens.replace(re, '');
  return !parens;
}

module.exports = {
  expressionCalculator,
};
