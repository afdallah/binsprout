function isAllowedChar(value) {
  return (!value.match(/[0-9x]+$/i) && value !== '')
}

function formatCreditCard(string = '') {
  return string.replace(/(\w{4})/g, '$1 ').replace(/(^\s+|\s+$)/,'')
}

// Options for Month field
function generateMonths() {
  let months = [{ label: 'Random', value: 'random'}]
  for (let i = 1; i <= 12; i++) {
    let value = i.toString().padStart(2, '0')
    months.push({ label: value, value })
  }

  return months
}

function generateYears() {
  let years = [{ label: 'Random', value: 'random'}]
  let initYear = new Date().getFullYear()

  for (let i = 0; i <= 8; i++) {
    let value = initYear

    if (i > 0) {
      value = ++initYear
    }

    years.push({ label: value.toString(), value: value.toString() })
  }

  return years
}


function generateCvc() {
  let newCvc = []
  for (let i = 1; i <= 3; i++) {
    newCvc.push(randomize(0, 9))
  }

  return newCvc
}

function randomize(min, max) {
  let result = Math.floor(Math.random() * ((parseInt(max) - parseInt(min)) + 1) + parseInt(min))
  return result.toString()
}

function luhn(num) {
  let digits = num.toString().split("").reverse();
  let sum = 0;
  let digit;

  for (let i = 0, l = digits.length; l > i; ++i) {
      digit = +digits[i];
      if (i % 2 === 0) {
          digit *= 2;
          if (digit > 9) {
              digit -= 9;
          }
      }
      sum += digit;
  }
  return (sum * 9) % 10;
};

export { isAllowedChar, formatCreditCard, generateMonths, generateYears, generateCvc, randomize, luhn }