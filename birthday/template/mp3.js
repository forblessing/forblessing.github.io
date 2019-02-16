var MP3 = {
  make: function () {
    var mp3 = {};
    var mi = 0;
    var timer;
    var mp3one = false;
    var mp3list = ["生日快乐钢琴曲", "生日快乐歌", "生日快乐韩语歌", "Joyeux anniversaire"];
    var mp3base = 'https://luangeng2008.gitee.io/cdn/mp3/';

    mp3.caltime = function (t) {
      if (isNaN(t)) return '00:00';
      let v1 = parseInt(t / 60);
      let v2 = parseInt(t) % 60;
      if (v1 < 10) {
        v1 = '0' + v1;
      }
      if (v2 < 10) {
        v2 = '0' + v2;
      }
      return v1 + ':' + v2;
    };

    mp3.play = function () {
      console.log(audio.src)
      audio.play();
      $(".spinner").removeClass("stop");
      $('.spinner').show();
      $('.mp3-ul li:lt(90)').removeClass('blueyellowf');
      $('.mp3-ul li:eq(' + mi + ')').addClass('blueyellowf');
      $('.pause').html('☆暂停');
      timer = setInterval(function () {
        $('.expand').width(audio.currentTime * 100 / audio.duration + '%');
        $('.mp3time').html(mp3.caltime(audio.currentTime) + '/' + mp3.caltime(audio.duration));
      }, 500);
    };

    mp3.playn = function (n) {
      if (n >= mp3list.length || n < 0) {
        return;
      }
      mi = n;
      audio.src = encodeURI(mp3base + mp3list[mi] + '.mp3');
      mp3.play();
    };

    mp3.one = function () {
      if (mp3one) {
        mp3one = false;
        $('.order').html('☆单曲');
      } else {
        mp3one = true;
        $('.order').html('☆顺序');
      }
    }

    mp3.pause = function () {
      audio.pause();
      $(".spinner").addClass("stop");
      $('.pause').html('☆播放');
      clearInterval(timer);
    };

    mp3.shift = function () {
      if (audio.paused) {
        mp3.play();
      } else {
        mp3.pause();
      }
    };

    mp3.next = function () {
      mi++;
      if (mi >= mp3list.length) {
        mi = 0;
      }
      audio.src = encodeURI(mp3base + mp3list[mi] + '.mp3');
      mp3.play();
    };

    mp3.mp3ul = function () {
      for (var m in mp3list) {
        var mm = "<li onclick='mp3.playn(" + m + ")'>" + mp3list[m] + "</li>";
        $('.mp3-ul').append(mm);
      }
    };

    mp3.mp3ul();
    return mp3;
  }
};

var mp3 = MP3.make();