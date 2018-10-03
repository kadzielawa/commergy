var Code = function(req, res) {
    this.request = req;
    this.response = res;
};

Code.prototype.getCode = function(req) {

var hash = req.user.comm_uid;
    return "<script>var commergyManagger = null; var script = document.createElement('script');script.src = 'http://localhost:3000/javascripts/commergy.js';script.onload = function () {   commergyManagger = new _comgy.init('" + hash + "'); };document.head.appendChild(script);</script>";
};



module.exports = new Code();
