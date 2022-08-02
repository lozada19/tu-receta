function isLoggedIn(req, res, next) {
  if (req.session.user === undefined) {
    res.redirect("/auth/login");
  } else {
    next();
  }
}

function localsUpdate(req, res, next) {
  if (req.session.user === undefined) {
    res.locals.isUserActive = false;
  } else if (req.session.user !== undefined) {
    res.locals.isUserActive = true;
  }
  next();
}

module.exports = { isLoggedIn, localsUpdate };
