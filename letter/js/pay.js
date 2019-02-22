const ctime = 180;
var time = ctime;
var order;
var oldprice = '15';
var storage = sessionStorage;
var qrcode;
var qrcode2;
var timer;

var setting = {
    wechatUrl: "wxp://f2f0HZoEtbWThO-JXf5Kt2SjGdS72oGpzKnE",
    aliUrl: "https://qr.alipay.com/fkx04310cqou589zzew3k47"
};

function init() {
    qrcode = new QRCode(document.getElementById("qrcode"), {
        width: 220,
        height: 220
    });
    qrcode2 = new QRCode(document.getElementById("qrcode2"), {
        width: 220,
        height: 220
    });
    order = JSON.parse(storage.getItem('order'));
    if (order == null) {
        order = {};
    } else if (order.id != undefined) {
        ok();
    }
    AV.initialize("qGpowKJBhfJAFlsz4NtCLjlP-gzGzoHsz", "YKRMzp6TjQQ9op2YGxpYpmHg");
}


function begin() {
    clearInterval(timer);
    timer = setInterval(function () {
        time = time - 1;
        if (time < 0) {
            clearInterval(timer);
            $('.qrcode img').hide();
            $('#timeout').show();
            $('#timeo').hide();
            $('#loading').hide();
            return;
        }

        if (time <= (ctime - 15) && time % 5 == 0) {
            $('#loading').show()
            query();
        }
        document.getElementById('time').innerHTML = caltime(time);
    }, 1000);
}

function newOrder() {
    order.oldprice = oldprice;
    order.discount = random(100, 200);
    order.price = (order.oldprice - order.discount).toFixed(2);
    order.source = window.location.href;
    order.createtime = jsClockGMT();
    storage.setItem('order', JSON.stringify(order));
    time = ctime;
    $('#timeo').show();
    $('#timeout').hide();
    begin();
    $('.pay-b').hide();
    $('.pay-c').fadeIn();
    document.getElementById('oldprice').innerHTML = order.oldprice;
    document.getElementById('discount').innerHTML = order.discount;
    document.getElementById('price').innerHTML = '￥' + order.price;
    $('#loading').hide();
}

function weixin() {
    order.type = 'weixin';
    qrcode.makeCode(setting.wechatUrl);
    document.getElementById("typei").src = 'img/weixin.jpg';
    newOrder();
}

function alipay() {
    order.type = 'alipay';
    qrcode.makeCode(setting.aliUrl);
    document.getElementById("typei").src = 'img/alipay.jpg';
    newOrder();
}

function save() {
    var Order = AV.Object.extend('Order');
    var o = new Order();
    o.set('paytime', jsClockGMT());
    o.set('price', order.price);
    o.set('type', 'alipay');
    o.save().then(function (res) {}, function (error) {
        alert("错误：" + error.message);
    });
}

function update(order) {
    if (order.id != undefined) {
        var av = AV.Object.createWithoutData('Order', order.id);
        for (p in order) {
            av.set(p, order[p]);
        }
        av.save().then(function (res) {}, function (error) {
            alert("授权码错误：" + error.message);
        });
    }
}

function query() {
    var query1 = new AV.Query('Order');
    query1.greaterThan('paytime', order.createtime);
    query1.equalTo('price', order.price);
    query1.equalTo('type', order.type);
    var query2 = new AV.Query('Order');
    query2.lessThan('paytime', order.createtime + ctime + 10);
    var query = AV.Query.and(query1, query2);
    query.find().then(function (results) {
        if (results.length > 0) {
            order.id = results[0].id;
            ok();
        }
    }, function (error) {
        console.info('Failed to create new object, with error message: ' + error.message);
    });
}

function ok() {
    clearInterval(timer);
    $(".pay-b").hide();
    $(".pay-c").hide();
    $(".pay-r").show();
    storage.setItem('order', JSON.stringify(order));
    order.data = localStorage.getItem('letter');
    update(order);
    qrcode2.makeCode("https://letter.html?token=" + order.id);
}

function cancel() {
    clearInterval(timer);
    $('.pay-c').hide();
    $('.pay-b').fadeIn();
}

function jsClockGMT() {
    gmtMS = NTP.fixTime();
    var gmtTime = new Date(gmtMS);
    return Math.floor(gmtTime.getTime() / 1000);
}

function random(l, r) {
    return ((Math.random() * (r - l + 1) + l) / 100).toFixed(2);
}

function caltime(t) {
    if (isNaN(t)) return '00:00';
    let v1 = parseInt(t / 60);
    let v2 = parseInt(t) % 60;
    if (v1 < 10) v1 = '0' + v1;
    if (v2 < 10) v2 = '0' + v2;
    return v1 + ':' + v2;
}