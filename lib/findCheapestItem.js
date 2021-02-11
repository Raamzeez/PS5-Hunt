const findCheapestItem = (items) => {
  let cheapestItem = null;
  items.forEach((itemArray) => {
    itemArray.forEach((item) => {
      if (!cheapestItem) {
        cheapestItem = { link: item.link, price: item.price };
      } else if (item.price <= cheapestItem.price && item.price) {
        cheapestItem = { link: item.link, price: item.price };
      }
    });
  });
  return cheapestItem;
};

module.exports = findCheapestItem;
