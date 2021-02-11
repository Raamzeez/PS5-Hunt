const ebaySearch = require('./lib/ebaySearch')
const findCheapestItem = require('./lib/findCheapestItem')
const readline = require("readline");
const term = require("terminal-kit").terminal;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const products = [];

(async () => {
  term.cyan("--------------------------------------------\n");
  term.magenta("1. Find the cheapest PS5\n");
  term.magenta("2. Find a PS5 Under X Dollars\n");
  term.cyan("---------------------------------------------\n");
  rl.question("Enter option number: ", async (option) => {
    const optionInt = parseInt(option);
    if (optionInt === 2) {
      rl.question("Enter maximum dollar amount: ", async (maximumPrice) => {
        const maximumPriceInt = parseInt(maximumPrice)
        const ebayProducts = await ebaySearch()
        products.push(ebayProducts)
        const filteredProducts = products.filter(product => product.price <= maximumPriceInt)
        return console.log(filteredProducts)
      });
    } 
    else if (optionInt === 1) {
      const ebayProducts = await ebaySearch()
      products.push(ebayProducts)
      const cheapestItem = findCheapestItem(products)
      console.log(cheapestItem)
    }
    else {
      console.log("Invalid option. Please re-run the program");
    }
  });
})();