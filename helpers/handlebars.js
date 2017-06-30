var register = function (Handlebars) {
  var helpers = {
    // put all of your helpers inside this object
    onNthElement: function (index, element) {
      return parseInt(index) % parseInt(element) === 0;
    },

    math: function (number1, number2, operator) {
      switch (operator) {
        case '+':
          return parseInt(number1) + parseInt(number2);
        case '-':
          return parseInt(number1) - parseInt(number2);
        case '*':
          return parseInt(number1) * parseInt(number2);
        case '/':
          return parseInt(number1) / parseInt(number2);
        case '%':
          return parseInt(number1) % parseInt(number2);
        default:
          console.log('Wrong operator used in math helper: ' + operator);
          break;
      }
    }
  };

  if (Handlebars && typeof Handlebars.registerHelper === "function") {
    // register helpers
    for (var prop in helpers) {
      Handlebars.registerHelper(prop, helpers[prop]);
    }
  } else {
    // just return helpers object if we can't register helpers here
    return helpers;
  }

};

module.exports.register = register;
module.exports.helpers = register(null);  