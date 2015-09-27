/**
 * Created by Apple on 15/9/27.
 */

const var callbackNames = "date,endtime,infoid,isok,key,microtime,openid,microtime,regtime,sign,str,unix,authState";

function onRequest(request, response, modules){
    var db = modules.oData;
    db.find({
        "table":"AuthData",
        "keys":callbackNames,
        "where":{"openid":request.body.openid}
    },function (err, data){

        if (data && data.count>0) {
            if (data.count>1){
                for (let dic in data){
                    var dicJsonObj = JSON.parse(dic);
                    if(dicJsonObj.openid.equal(request.body.openid)){
                        response(dic);//success
                        return;
                    }
                }
                    //未查找到符合的openid，返回error
                    doError(request,response);

                }else{
                response(data);//success
            }
        } else {
                 //未查找到符合的openid，返回error
                doError(request,response);
        }
        response(data || err);
    });
}

function doError(request, response){
    var jsonObj = JSON.parse({});
    jsonObj.date = Date.now;
    jsonObj.endtime = "0";
    jsonObj.infoid = request.body.infoid;
    jsonObj.isok = "0";
    jsonObj.key = request.body.key;
    jsonObj.microtime = request.body.microtime;
    jsonObj.openid = request.body.openid;
    jsonObj.regtime = "0";
    jsonObj.sign = "md5";//取md5
    jsonObj.str = "账户不存在";
    jsonObj.unix = request.body.unix;//取随机值
    jsonObj.authState = "0";

    response(JSON.stringify(jsonObj));
}