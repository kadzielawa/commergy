window._comgy = window._comgy || {}, ! function() {

    function generateHash() {
        var e = (new Date).getTime(),
            hash = "xxxxxxxxxxxxxx4xxxxyxxxxxxxxxxxxxxxxxxxx".replace(/[xy]/g, function(o) {
                var r = (e + 16 * Math.random()) % 16 | 0;
                return e = Math.floor(e / 16), ("x" == hash ? r : 7 & r | 8).toString(16)
            });
        return hash
    }

    function r() {
        var hash = generateHash();
        localStorage.getItem("cId") || localStorage.setItem("cId", hash)
    }
    function n(event_name, data, url, sync) {
        var n = localStorage.getItem("cId"),
            d = screen.width + "x" + screen.height,
            _ = navigator.cookieEnabled ? 1 : 0;
        _comgy.async = sync;
        t(event_name, data, url, sync)
    }
    //funkcja odpowiedzialna za wysylke danych do serwera
    function t(event_name,data, url, async) {

        stringData = '';
        for (var property in data) {
            if (data.hasOwnProperty(property)) {
                if(stringData =='') {
                    stringData += property+'='+data[property];
                } else {
                    stringData+='&'+property+'='+data[property];
                }

            }
        }

        stringData+= '&event_name='+event_name;
        var request, t = new Date,
            d = t.getTime();
        window.XMLHttpRequest ? (request = new XMLHttpRequest, request.open("POST", url, async),
            request.withCredentials = !0,
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
            request.send(stringData),
            request.onreadystatechange = function() {
                4 == request.readyState && 200 == request.status && (t = new Date,
                void 0 !== window._comgy_report_time && window._comgy_report_time(t.getTime() - d))
            }) : (request = new ActiveXObject("Microsoft.XMLHTTP"),
            request.open("POST", url, async), request.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
            request.send(data)),
            _comgy.send_status = 1
    }
    _comgy.first_run = !0, _comgy.handler_injected = !1, _comgy.handler_list = [], _comgy.prep = function() {
        _comgy.handler_injected || void 0 === window._comgy_send_handler || (_comgy.handler_injected = !0, window._comgy_send_handler()), _comgy.first_run && (_comgy.first_run = !1, _comgy.send_status = 0)
    }, _comgy.init = function(e,h) {

        //temporary - idk what the fuck'in e/h means
        _comgy.uid = e;
        r(), void 0 === e && (e = !0);
      /*  var dataObject = {
            app_id: h,
            version: '2.21.1',

        };*/
      //  n('first_call',dataObject, "http://localhost:3000/api/main", e)
    },

        _comgy.pass = function(data)  {
        console.log('uid:');
            var dataToSend = this.fetchAllData(data);
            console.log(_comgy.uid);
            console.log('sent');
            console.log(data);
            n('pass_data',dataToSend, "http://vps495535.ovh.net:3000/api/main");
        },
        _comgy.fetchAllData = function(data){
            data.app_id = _comgy.uid;
            return data; 
        }
}(), ! function() {
    function e(e, o) {
        o || (o = window.location.href), e = e.replace(/[\[\]]/g, "\\$&");
        var r = RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)"),
            n = r.exec(o);
        return n ? n[2] ? decodeURIComponent(n[2].replace(/\+/g, " ")) : "" : null
    }

    function o() {
      
    }
    function r(e, o, r) {
        "complete" == document.readyState ? r() : e.addEventListener ? e.addEventListener(o, r, !1) : e.attachEvent && e.attachEvent("on" + o, r)
    }
    _comgy.externalLoaded = !1, void 0 !== _comgy.app_id ? o() : setTimeout(o, 500);
    var n = function() {
        _comgy.prep()
    };
    r(window, "load", function() {
        o(), setTimeout(o, 500), n()
    })
}();