/**
 * Created by Apple on 15/9/27.
 */


function onRequest(request, response, modules) {
    var db = modules.oData;

    //var nowTimeString = require("../cloud/MyDate.js").nowTimeString;

    db.insert({
        "table": "AuthData",
        "data": {
            "date": nowTimeString(),
            "endtime":"",
            "infoid":"",
            "isok":"",
            "key":"",
            "microtime":"",
            "openid":"",
            "microtime":"",
            "regtime":"",
            "sign":"",
            "str":"",
            "unix":"",
            "authState":"0"
        }
    }, function (err, data) {
        response.end(data || err);
    });


    //-----------------------------------------------
    //-----------------------------------------------
    Date.prototype.format = function(format) {
        var date = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S+": this.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1
                    ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
            }
        }
        return format;
    }

    function nowTimeString(){
        var date = new Date();
        return timeStringWithDate(date);
    }

    function timeStringWithDate(date){
        return date.format('yyyy-MM-dd hh:mm:ss');
    }
}

exports.makeAuthColumns = onRequest;