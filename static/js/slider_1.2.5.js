var ztbox = $(".ztbox");
var paihang = $(".paihang>ul");

var ultishi = $("<ul></ul>");
var litishi = $("<li></li>");

var tishia = $("<a></a>").text("正在加载数据");
var tishi = $("<p></p>").text("正在加载数据");
litishi.append(tishia);
ultishi.append(litishi);


if (ztbox != null) {
    ztbox.append(ultishi);
}
if (paihang != null) {
    paihang.append(tishi);
}

var ilove = $("#index_love");
var ifamily = $("#index_family");
var ilinks = $("#index_links");
var iessay = $("#index_essay");
var ilife = $("#index_life");
if (ilove != null) {
    var a = $("<a></a>").text("正在加载数据");
    var li = $("<li></li>");
    li.append(a);
    ilove.append(li);
}
if (ifamily != null) {
    var a = $("<a></a>").text("正在加载数据");
    var li = $("<li></li>");
    li.append(a);
    console.log("追加提示");
    ifamily.append(li);
}
if (ilinks != null) {
    var p = $("<p></p>").text("正在加载数据");
    ilinks.append(p);
}
if (iessay != null) {
    var p = $("<p></p>").text("正在加载数据");
    iessay.append(p);
}
if (ilife != null) {
    var p = $("<p></p>").text("正在加载数据");
    ilife.append(p);
}


getDocCount(function (countList) {

        if (ztbox != null) {
            ztbox.empty(ultishi);

            var ul = $("<ul></ul>");

            var essayli = $("<li></li>");
            var loveli = $("<li></li>");
            var familyli = $("<li></li>");
            var linksli = $("<li></li>");
            var lifeli = $("<li></li>");

            var essaya = $("<a></a>");
            var lovea = $("<a></a>");
            var familya = $("<a></a>");
            var linksa = $("<a></a>");
            var lifea = $("<a></a>");

            essaya.text(" 生活随笔  ( " + countList["essay"].length + " ) ");
            essaya.attr("href", "./essay.html");
            lovea.text(" 爱情文章  ( " + countList["love"].length + " ) ");
            lovea.attr("href", "./love.html");
            familya.text(" 亲情文章  ( " + countList["family"].length + " ) ");
            familya.attr("href", "./family.html");
            linksa.text(" 友情文章  ( " + countList["links"].length + " ) ");
            linksa.attr("href", "./links.html");
            lifea.text(" 人生哲理  ( " + countList["life"].length + " ) ");
            lifea.attr("href", "./life.html");

            essayli.append(essaya);
            loveli.append(lovea);
            familyli.append(familya);
            linksli.append(linksa);
            lifeli.append(lifea);

            ul.append(essayli);
            ul.append(loveli);
            ul.append(familyli);
            ul.append(linksli);
            ul.append(lifeli);

            ztbox.append(ul);
        }

        var isApendId = [];

        function getAppendInfo() {
            for (var key in countList["DOC_INFO"]) {
                if (key == "length")continue;
                if (isApendId.indexOf(key) != -1) {
                    //console.log("已经存在这个key了：" + key + "  " + isApendId.indexOf(key));
                    continue
                }
                isApendId.push(key);
                appendInfo = countList["DOC_INFO"][key];
                return appendInfo;
            }
            return null;
        }

//    站长推荐和排行榜
        if (paihang != null) {
            paihang.empty(tishi);

            function randomFrom(lowerValue, upperValue) {
                return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
            }

            var docTypeList = [];
            docTypeList[0] = "essay";
            docTypeList[0] = "love";
            docTypeList[0] = "family";
            docTypeList[0] = "links";
            docTypeList[0] = "life";


            var count = 10;
            console.log(countList["DOC_INFO"]);

            function appendToVal(val) {
                var pendCount = 0;
                var arrLen = countList["DOC_INFO"]["length"] - 1; //数组中还没有被遍历过的数据长度
                for (var i = 0; i < count; i++) {
                    if (pendCount >= countList["DOC_INFO"]["length"]) {
                        break;
                    }
                    var appendInfo = getAppendInfo();

                    if (appendInfo != null) {
                        arrLen--;
                        if ((count - pendCount) < arrLen) {  //随机决定是否跳过
                            var randomVal = randomFrom(0, arrLen);
                            if (randomVal < Math.round((arrLen / 2))) continue;
                        }
                        var itemLi = $("<li></li>");
                        var itemA = $("<a></a>");
                        if (appendInfo["color"] != null) {
                            var itemFont = $("<font></font>");
                            itemFont.attr("color", appendInfo["color"]);
                            itemFont.text(appendInfo["title"]);
                            itemA.append(itemFont);
                        } else {
                            itemA.text(appendInfo["title"]);
                        }
                        itemA.attr("href", "./doc.html?id=" + appendInfo["id"] + "&type=" + appendInfo["type"]);

                        itemLi.append(itemA);

                        $(val).append(itemLi);
                        pendCount++;
                    }
                }
            }

            paihang.each(function (index, val) {
                isApendId = [];
                appendToVal(val);
            });
        }

        //首页加载
        isApendId = [];
        var loveap = 5;
        var familyap = 5;
        var linksap = 1; //友情
        var essayap = 1; //生活
        var lifeap = 1; //人生哲理
        var arrLen = countList["DOC_INFO"]["length"] - 1; //数组中还没有被遍历过的数据长度
        //清空数据
        ilove.empty();
        ifamily.empty();

        for (var i = 0; i < arrLen; i++) {
            var appendInfo = getAppendInfo();
            if (appendInfo != null) {
                if (appendInfo["type"] == "love" && loveap > 0) {
                    var a = $("<a></a>");
                    if (appendInfo["color"] == null) {
                        a.text(appendInfo["title"]);
                    } else {
                        var col = $("<font></font>").text(appendInfo["title"]);
                        col.attr("color", appendInfo["color"]);
                        a.append(col);
                    }
                    a.attr("href", "./doc.html?id=" + appendInfo["id"] + "&type=" + appendInfo["type"]);
                    var li = $("<li></li>");
                    li.append(a);
                    ilove.append(li);
                    loveap--;
                }
                if (appendInfo["type"] == "family" && familyap > 0) {
                    var a = $("<a></a>");
                    if (appendInfo["color"] == null) {
                        a.text(appendInfo["title"]);
                    } else {
                        var col = $("<font></font>").text(appendInfo["title"]);
                        col.attr("color", appendInfo["color"]);
                        a.append(col);
                    }
                    a.attr("href", "./doc.html?id=" + appendInfo["id"] + "&type=" + appendInfo["type"]);
                    var li = $("<li></li>");
                    li.append(a);
                    ilove.append(li);
                    familyap--;
                }
                if (appendInfo["type"] == "links" && linksap > 0) {

                }

                if (loveap <= 0 && familyap <= 0 && linksap <= 0 && essayap <= 0 && lifeap <= 0) {
                    break;
                }
            }
        }
        if (loveap == 5) {
            var a = $("<a></a>").text("该栏目为空");
            var li = $("<li></li>");
            li.append(a);
            ilove.empty();
            ilove.append(li);
        }
        if (familyap == 5) {
            var a = $("<a></a>").text("该栏目为空");
            var li = $("<li></li>");
            li.append(a);
            ifamily.empty();
            ifamily.append(li);
        }
    }
)
;
