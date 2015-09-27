/**
 * Created by Apple on 15/9/27.
 */


function onRequest(request, response, modules){
    var db = modules.oData;
    db.find({
        "table":"AuthData",
        // "keys":"date,endtime,infoid,isok,key,microtime,openid,microtime,regtime,sign,str,unix,authState",
        "where":{"openid":request.body.openid}
    },function (err, data){

        var dataJsonObj = JSON.parse(data);

        if (dataJsonObj) {
            for (var results in dataJsonObj){

                var array = dataJsonObj[results];

                for (var index in array){

                    var dicJsonObj = array[index];
                    if (dicJsonObj.openid == request.body.openid){
                        doSuccess(request, response, modules, dicJsonObj);//success
                        return;
                    }
                }
            }
            //未查找到符合的openid，返回error
            doError(request,response);
        } else {
            //未查找到符合的openid，返回error
            doError(request,response);
        }
    });


    //-----------------------------------------------
    //-----------------------------------------------
    function doSuccess(request, response, modules, dicJsonObj){

        var now = new Date();

        var newDicJsonObj = {
            "date":nowTimeString(),
            "endtime":dicJsonObj.endTime?dicJsonObj.endTime:"0",
            "infoid":"1080",
            "isok":"1",
            "key":"0",
            "microtime":".10158",
            "openid":dicJsonObj.openid,
            "regtime":dicJsonObj.regtime?dicJsonObj.regtime:"0",
            "sign":"0",
            "str":"同步成功",
            "unix":""+now.getTime()/1000,//取随机值
            "authState":"1",
        };

        response.end(JSON.stringify(newDicJsonObj,null,3));//success

    }
    function doError(request, response){

        var dicJsonObj = {
            "date":"0",
            "endtime":"0",
            "infoid":"999",
            "isok":"0",
            "key":"0",
            "microtime":"0",
            "openid":request.body.openid,
            "regtime":"0",
            "sign":"0",
            "str":"用户不存在",
            "unix":"0",//取随机值
            "authState":"0",
        };

        // var nowTimeString = require("../cloud/MyDate.js").nowTimeString;
        dicJsonObj.date = nowTimeString();
        //dicJsonObj.sign = doEncrypt('asdf',modules);//取md5  //error状态  不取MD5值

        response.end(JSON.stringify(dicJsonObj,null,3));

    }

    //-----------------------------------------------
    //-----------------------------------------------
    function md5(str){
        var crypto = require('crypto');
        var md5 = crypto.createHash('md5');
        md5.update(str);
        var d = md5.digest('hex');  //MD5
        return d;
    }

    function doEncrypt(request, response, modules, dicJsonObj){
        var http = modules.oHttp;

        var str = ""
            + dicJsonObj.openid
        + "9ueEy15MsmIy7xR"
        + dicJsonObj.infoid
        + dicJsonObj.endtime
        + dicJsonObj.regtime
        + dicJsonObj.isok
        + dicJsonObj.unix;

        http.post('http://tool.zzblo.com/api/md5/encrypt', {form:{text:str}}, function(err,httpResponse,body){

        });
    }

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




exports.getAuthInfo = onRequest;


