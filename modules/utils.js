var Utils = function() {


}

Array.prototype.isInArray = function ( needle ) {
    var i;
    for (i in this) {
        if (i == needle) return true;
    }
    return false;
};

Utils.prototype.ifIsAdmin = function(req, res, next) {
    //   if (typeof req.user !== "undefined" && req.user.username == "kubaa") {
    next();
    //   } else {
    //      var error = new Error("forbidden access");
    //       next(error);
    ///   }
}
Utils.prototype.isEmptyObject = function(obj) {
    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length && obj.length > 0) return false;
    if (obj.length === 0) return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and toValue enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}


module.exports = new Utils();
