exports.getMenu = (items, loggedIn) => (
  items.filter(item => item.onLoggedIn === loggedIn)
);
