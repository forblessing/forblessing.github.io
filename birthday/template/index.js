var photolist = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg"];
var backbase = "https://luangeng2008.gitee.io/cdn/backpic/";
var backpic = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg"];
var pi = 0;
var bi = 0;
var fworks = undefined;
var audio = document.getElementById("audio");
//var sound = document.getElementById("sound");
var timer;
var bopen = 0;

$(document).ready(function () {
    audio.addEventListener('ended', mp3.next, false);
    $(document).on('touchmove', function (e) {
        e.preventDefault();
    });
    $('div').on('touchmove', function (e) {
        e.preventDefault();
    });

    bokeh();
    setTimeout("$('.loading').fadeOut()", 4000);
    $('.list li').css("animation-play-state", "paused");
});

function bokeh() {
    for (var i = 1; i <= 30; i++) {
        var body = document.getElementsByTagName("body")[0];
        var bokeh = document.createElement("bokeh");
        body.appendChild(bokeh);
    }
}

function mp3Show() {
    if (bopen == 1) {
        photoHide();
    }
    bopen = 4;
    $('.mp3_div').fadeIn();
    allHide();
}

function mp3Hide() {
    allShow();
    $('.mp3_div').fadeOut();
    bopen = 0;
}

function mp3ul() {
    for (var m in mp3list) {
        var mm = "<li onclick='playn(" + m + ")'>" + mp3list[m] + "</li>";
        $('.mp3-ul').append(mm);
    }
}

function stop() {
    $('bokeh').addClass('stop');
}

function restart() {
    $('bokeh').removeClass('stop');
}

function cakeShow() {
    if (bopen == 1) {
        photoHide();
    }
    $('.cake-div').fadeIn();
    $('.spinner').hide();
    bopen = 3;
    allHide();
    var cakesvg = document.getElementById('cake-svg').innerHTML;
    $('.cake2').html(cakesvg);
}

function cakeHide() {
    $('.cake-div').fadeOut();
    $('.spinner').show();
    allShow();
    bopen = 0;
}

function photoShow() {
    if (bopen == 0) {
        $('.photos').css("background-image", 'url("pic/' + photolist[pi] + '")');
        $('.photos').addClass('pmove');
        $('.photos').show();
        timer = setInterval("photoShift()", 6000);
        bopen = 1;
    } else {
        photoHide();
    }
}

function photoHide() {
    $('.photos').removeClass('pmove');
    $('.photos').hide();
    clearInterval(timer);
    bopen = 0;
}

function photoShift() {
    pi = pi + 1;
    if (pi >= photolist.length) {
        pi = 0;
    }
    $('.photos').css("background-image", 'url("pic/' + photolist[pi] + '")');
}

function clickGift() {
    mp3.play();
    mp3Hide();
    $('.step-1').removeClass('step-1');
    $('.step1').addClass('step-2');
    $('.gift-div').fadeOut();
    $('.list1').addClass("list");
    $('.list').children().css("animation-play-state", "running");
    setTimeout("photoShow()", 2000);
}

function aboutShow() {
    allHide();
    $('.about-div').fadeIn();
}

function aboutHide() {
    $('.about-div').fadeOut();
    allShow();
}

//function loading2(){
//        let r = Math.ceil(Math.random()*100)%sconfig.loadingpic.length;
//        let load2 = sconfig.loadingpic[r];
//     if(load2!=undefined){$('.loading2').css('background-image', "url('https://luangeng2008.gitee.io/cdn/loading/p1.svg')");}
//    $('.loading2').show();
//    setTimeout("$('.loading2').hide()",2000)
//}

function fireShow() {
    if (bopen == 1) {
        photoHide()
    }
    $('.firework-div').show();
    stop();
    bopen = 2;
    if (fworks == undefined) {
        fworks = new Fireworks();
    }
}

function fire() {
    fworks.show();
    $('.firestart').hide();
}

function fireHide() {
    $('.firework-div').fadeOut();
    bopen = 0;
    restart();
}

function allShow() {
    $('.body-div').show();
}

function allHide() {
    $('.body-div').hide();
}

function changeBack() {
    bi = bi + 1;
    if (bi >= backpic.length) {
        bi = 0;
    }
    $('body').css('background-image', "url('" + backbase + backpic[bi] + "')");
}

function changeBackto(n) {
    $('body').css('background-image', "url('" + backbase + backpic[n] + "')");
}

function listtoggle(a) {
    if ($(a).children().css("animation-play-state") == 'running') {
        $(a).children().css("animation-play-state", "paused");
    } else {
        $(a).children().css("animation-play-state", "running");
    }
}