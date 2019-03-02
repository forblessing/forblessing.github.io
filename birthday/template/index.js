var photolist = [];
var pi = 0;
var audio = document.getElementById("audio");
var timer;

var v1 = 1,
    v2 = 1,
    v3 = 1;
let timerp = setInterval(function () {
    $('#pg1').css('width', v1 + '%');
    v1 = v1 + 9;
    $('#pg2').css('width', v2 + '%');
    v2 = v2 + 7;
    $('#pg3').css('width', v3 + '%');
    v3 += 5;
    if (v3 > 110) {
        clearInterval(timerp);
        $('#button').fadeIn();
    }
}, 350);

$(document).ready(function () {
    $(document).on('touchmove', function (e) {
        e.preventDefault();
    });
    $('div').on('touchmove', function (e) {
        e.preventDefault();
    });
    $('.list2 li').css("animation-play-state", "paused");

    let data = null;
    let mode = getUrlParam('mode');
    if(mode=='preview'){
        data = defaultData;
        refresh(data);
        return;
    }
    if (window.parent == window) {
        //phone
        let id = getUrlParam('token');
        query(id);
    } else {
        data = JSON.parse(localStorage.getItem("data"));
        refresh(data);
    }
});

$("#button").click(function () {
    bokeh();
    mp3.play();
    $('.loading').fadeOut()
    $('.list2').children().css("animation-play-state", "running");
    setTimeout("photoShow()", 1500);
});

function refresh(data) {
    if (data == null) {
        $('html').html("请先编辑网页，然后再预览。");
        return; // del
    }
    for (p in data) {
        $("#" + p).html(data[p]);
    }
    for(let i=1; i<=6;i++ ){
        photolist.push(data['p'+i]);
    }
    audio.src = data.music; //encodeURI
    $('body').css('background-image', "url('" + data.backpic + "')");
}

function bokeh() {
    for (var i = 1; i <= 30; i++) {
        var body = document.getElementsByTagName("body")[0];
        var bokeh = document.createElement("bokeh");
        body.appendChild(bokeh);
    }
}

function photoShow() {
    $('.photos').css("background-image", 'url("' + photolist[pi] + '")');
    $('.photos').addClass('pmove');
    $('.photos').show();
    timer = setInterval("photoShift()", 6000);
}

function photoShift() {
    pi = pi + 1;
    if (pi >= photolist.length) {
        pi = 0;
    }
    $('.photos').css("background-image", 'url("' + photolist[pi] + '")');
}

function listtoggle(a) {
    if ($(a).children().css("animation-play-state") == 'running') {
        $(a).children().css("animation-play-state", "paused");
    } else {
        $(a).children().css("animation-play-state", "running");
    }
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}

function query(id) {
    var query = new AV.Query('Birthday');
    query.get(id).then(function (res) {
        var data = res.get('data');
        refresh(JSON.parse(data));
    }, function (error) {
        console.info('Failed to create new object, with error message: ' + error.message);
    });
}