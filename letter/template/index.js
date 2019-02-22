Element.prototype.typewriter = function (a) {
    var d = this,
        s = '，．。；：！？,.;:!?',
        c = d.innerHTML,
        w = 0,
        b = 0;
    if (this.run == undefined) {
        this.run = 1;
    } else {
        return this;
    }
    d.innerHTML = "";
    let e = setInterval(function () {
        var f = c.substr(b, 1);
        if (f == "<") {
            b = c.indexOf(">", b) + 1
        } else if (s.indexOf(f) != -1 && w < 3) {
            w++;
            d.innerHTML = c.substring(0, b + 1) + "_";
            return;
        } else {
            w = 0;
            b++
        }
        d.innerHTML = c.substring(0, b) + (((b & 1) && (b < c.length)) ? "_" : "");
        if (b >= c.length) {
            clearInterval(e);
            document.getElementById("bb_text").run = undefined;
            //        $('#nextp').fadeIn();
        }
    }, 150)
    return this;
};

var timerpic;
var slideCurrent = 0;
var slidesLength;
var slidesArr;

function init() {
    let letter = null;
    let mode = getUrlParam('mode');
    if(mode=='preview'){
        letter = defaultData;
        refresh(letter);
        return;
    }
    if (window.parent == window) {
        //phone
        let id = getUrlParam('token');
        query(id);
    } else {
        letter = JSON.parse(localStorage.getItem("letter"));
        refresh(letter);
    }
}

function refresh(letter){
    if (letter == null) {
        $('html').html("请先编辑网页，然后再预览。");
        return; // del
    }
    for (p in letter) {
        $("#" + p).html(letter[p]);
    }
    let ps = '';
    for (let i = 6; i >= 1; i--) {
        if (letter["p" + i].length == 0) {
            continue;
        }
        ps += "<figure class='slide slider-back' style='background-image:url(" + letter["p" + i] + ")'></figure>";
    }
    $(".slider-ctr").html(ps);
    audio.src = letter.music; //encodeURI
    $('body').css('background-image', "url('" + letter.backpic + "')");
    var together = new Date(letter.date);
    // together.setHours(0);
    // together.setMinutes(0);
    // together.setSeconds(0);
    // together.setMilliseconds(0);
    setInterval(function () {
        timeElapse(together);
    }, 500);

    // slides informations
    var slides = document.querySelectorAll(".slide");
    slidesLength = slides.length;
    slidesArr = [].slice.call(slides);
    slidesArr = slidesArr.reverse();
}

function nextp() {
    $('.bb_div').fadeOut();
    $('.photos').fadeIn();
}

function nextp2() {
    $('.mp3_div').fadeIn();
    $('.photos').fadeOut();
}

function backp() {
    $('.photos').fadeOut();
    $('.bb_div').fadeIn();
}

function backp2() {
    $('.mp3_div').fadeOut();
    $('.photos').fadeIn();
}

$(document).on('touchmove', function (e) {
    e.preventDefault();
});
$('div').on('touchmove', function (e) {
    e.preventDefault();
});
$('body').on('touchmove', function (e) {
    e.preventDefault();
});

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

$("#button").click(function () {
    mp3.play();
    $('.photos').hide();
    $('.mp3_div').hide();
    $('.loading').fadeOut();
    $('.bb_div').fadeIn();
    start_heart();
    pbegin();
    document.getElementById("bb_text").typewriter();
    for (let i = 1; i <= 20; i++) {
        let body = document.getElementsByTagName("body")[0];
        let bokeh = document.createElement("bokeh");
        body.appendChild(bokeh);
    }
});

function pbegin() {
    if (timerpic == undefined) {
        timerpic = setInterval("nextpic()", 5000);
    }
}

function nextpic() {
    if (slideCurrent === slidesLength - 1) {
        for (var i = 0; i < slidesArr.length; i++) {
            slidesArr[i].classList.remove("slide-on");
            slidesArr[i].classList.remove("text-on");
        }
        slidesArr[0].classList.add("text-on");
        slideCurrent = 0;
        return;
    }
    nextSlide = slidesArr[slideCurrent + 1];
    slide = slidesArr[slideCurrent];
    slide.classList.add("slide-on");
    slide.classList.remove("text-on");
    nextSlide.classList.add("text-on");
    slideCurrent += 1;
}

function timeElapse(c) {
    var e = Date();
    var m = (Date.parse(e) - Date.parse(c)) / 1000;
    if (m < 0) m = 0;

    var y = Math.floor(m/(3600*24*365));
    if(y!=0){
        m = m %(3600*24*365);
    }

    var d = Math.floor(m / (3600 * 24));
    m = m % (3600 * 24);
    var h = Math.floor(m / 3600);
    if (h < 10) h = "0" + h

    m = m % 3600;
    var day = Math.floor(m / 60);
    if (day < 10) day = "0" + day

    m = m % 60;
    if (m < 10) m = "0" + m

    var a;
    if(y==0){
        a = '<span class="digit">' + d + '</span> 天 <span class="digit">' + h + '</span> 小时 <span class="digit">' + day + '</span> 分钟 <span class="digit">' + m + "</span> 秒";
    }else {
        a = '<span class="digit">'+y+'</span> 年 <span class="digit">' + d + '</span> 天 <span class="digit">' + h + '</span> 小时 <span class="digit">' + day + '</span> 分钟 <span class="digit">' + m + "</span> 秒";
    }
    $("#elapseClock").html(a)
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}

function query(id) {
    var query = new AV.Query('Letter');
    query.get(id).then(function (res) {
        var data = res.get('data');
        refresh(JSON.parse(data));
    }, function (error) {
        console.info('Failed to create new object, with error message: ' + error.message);
    });
}