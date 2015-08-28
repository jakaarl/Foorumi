var authentication = function(req, res, next){
  if (!req.session.userId) {
    res.send(403);
  } else {
    next();
  }
}

module.exports = authentication;
