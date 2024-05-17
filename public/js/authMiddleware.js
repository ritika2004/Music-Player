const isLoggedIn = (req) => {
  // Check if the user is authenticated based on the presence of access token in cookies
  return req.cookies && req.cookies.accessToken;
};

// Middleware to protect routes that require authentication
const authenticate = (req, res, next) => {
  if (isLoggedIn(req)) {
    // User is authenticated, proceed to the next middleware
    console.log(req.body);
    next();
  } else {
    // User is not authenticated, redirect to login page or send unauthorized response
    // res.status(401).send("Unauthorized");
    res.redirect("alert");
  }
};

module.exports = { isLoggedIn, authenticate };
