const prompt = require('prompt-sync')();

const date = prompt('Enter Date');

const day = new Date(date).getDay();
days = ['sunday','monday','tuesday','wednessday','thursday','frieday','saturday'];
console.log(days[day]);

function add_10_days(user_date) {
    var date = new Date(user_date);
    date.setDate(date.getDate() + 10);
    return date.toString();
  }
  
  var user_input = prompt("Enter the date (YYYY-MM-DD): ");
  var result = add_10_days(user_input);
  console.log("10 days after the entered date:", result);
  




