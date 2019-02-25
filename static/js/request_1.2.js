var requestJSON = function (listname, func) {
    console.log('request file name:' + listname);
    $.ajax({
        url: "./static/data/" + listname,
        type: "GET",
        dataType: "json",
        beforeSend: function (info) {
            console.log('before send ajax');
        },
        error: function (info) {
            console.log("request faild");
            func(null, info);
        },
        success: function (info) {
            console.log('request success');
            func(info, null);
        }
    });
};

var requestText = function (listname, func) {
    console.log('request list name:' + listname);
    $.ajax({
        url: "./static/data/" + listname,
        type: "GET",
        dataType: "text",
        beforeSend: function (info) {
            console.log('before send ajax');
        },
        error: function (info) {
            console.log("request faild");
            func(null, info);
        },
        success: function (info) {
            console.log('request success');
            func(info, null);
        }
    });
};

var getTypeFile = function (type) {
    var requestfile = type + ".json";
    //if (type == "love") {
    //    requestfile = "love.json";
    //} else if (type == "essay") {
    //    requestfile = "essay.json";
    //}
    return requestfile;
};

var requestList = function (type, func) {
    var requestfile = getTypeFile(type);
    requestJSON(requestfile, func);
};

var requestDocList = function (type) {
    var list = $(".blogs");
    list.text("正在加载数据");

    var requestfile = getTypeFile(type);
    requestJSON(requestfile, function (info, error) {
        list.text("");
        if (info != null) {
            var data_list = info["data"];

            for (var i = 0; i < data_list.length; i++) {
                var tmpval = data_list[i];

                var div_blok = $("<div></div>");   // 最外层的父元素
                var div_h = $("<h2></h2>");
                var div_a = $("<a></a>");
                var div_f = $("<font></font>");
                var simple_p = $("<p></p>");

                if (tmpval["title_color"] != null) {
                    div_f.attr("color", tmpval["title_color"]);
                }
                div_f.text(tmpval["title"]);
                div_a.attr("href", "./doc.html?id=" + tmpval["id"] + "&type=love");
                simple_p.text(tmpval["context_simple"]);
                div_blok.addClass("bloglist");

                div_a.append(div_f);
                div_h.append(div_a);
                div_blok.append(div_h);
                div_blok.append(simple_p);
                //添加到最外层去
                list.append(div_blok);
            }
        } else {
            list.text("此栏目没有数据");
        }
    });
};

var getDocCount = function (callback) {
    var callList = [];
    callList["DOC_INFO"] = [];
    callList["DOC_INFO"]["length"] = 0;

    callList["essay"] = {"length": 0};
    callList["family"] = {"length": 0};
    callList["life"] = {"length": 0};
    callList["links"] = {"length": 0};
    callList["love"] = {"length": 0};
    callList["psy"] = {"length": 0};

    var requestCount = 0;
    var requestCall = function (info, error) {
        requestCount--;
        if (info != null) {
            var type = info["type"];
            var data_list = info["data"];
            callList[type].length = data_list.length;

            for (var i = 0; i < data_list.length; i++) {
                var dataItem = data_list[i];

                var id = dataItem["id"];

                callList["DOC_INFO"][id] = [];
                callList["DOC_INFO"][id]["id"] = dataItem["id"];
                callList["DOC_INFO"][id]["title"] = dataItem["title"];
                if (dataItem["title_color"] != null) {
                    callList["DOC_INFO"][id]["color"] = dataItem["title_color"];
                }
                callList["DOC_INFO"][id]["type"] = type;


                callList["DOC_INFO"]["length"] += data_list.length;
            }
        } else {
            console.log(error);
        }
        if (requestCount == 0) {
            callback(callList);
        }
    };
    for (var key in callList) {
        if(key=="DOC_INFO")continue;
        requestCount++;
        requestList(key, requestCall);
    }
};