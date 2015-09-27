/**
 * Created by Apple on 15/9/27.
 */
function onRequest(request, response, modules) {
    var db = modules.oData;
    db.insert({
        "table": "AuthData",             //表名
        "data": {
            "date": "",
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



    response.end("done!!");
}

exports.MakeAuthColumns = onRequest;