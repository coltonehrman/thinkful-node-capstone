exports.getMenu = (items, loggedIn) => {
  return items.filter((item) => {
    if ((item.onLoggedIn && loggedIn) || (item.onLoggedOut && !loggedIn)) {
      return true;
    }
    return false;
  });
};
