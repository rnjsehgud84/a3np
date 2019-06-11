$(document).ready(function () {
  // 헤더 및 컨텐츠 관련 스크롤 및 클릭 이벤트
  var menus = $('.menuUl li'), contents = $('.container > section:not(.top)');
  boxMotionFunc(15);

  menus.click(function (event) {
    event.preventDefault();

    var tg = $(this);
    var i = tg.index();
    var pl = tg.offset().left;
    boxMotionFunc(pl);

    var section = contents.eq(i);
    var tt = section.offset().top - 105.5;
    contMotionFunc(tt);
  });

  $('.header h1 a').click(function (evevt) {
    event.preventDefault();

    boxMotionFunc(15);
    contMotionFunc(0);
  });

  $(window).scroll(function () {
    var sct = $(window).scrollTop();
    contents.each(function () {
      var tg = $(this);
      var i = tg.index() - 1;
      var tgH = tg.height() + 105.5;

      if (tg.offset().top < sct + tgH) {
        $('.header h1 a').removeClass('on');
        menus.removeClass('on');
        menus.eq(i).addClass('on');
        boxMotionFunc(menus.eq(i).offset().left);
      }
    });

    var firstCont = $('.top').height();
    if (sct + firstCont <= firstCont) {
      menus.removeClass('on');
      $('.header h1 a').addClass('on');
      boxMotionFunc(15);
    }

    var lastCont = $('.contents:last-child');
    if (sct + lastCont.height() >= lastCont.offset().top + lastCont.height()) {
      menus.removeClass('on');
      $('.header h1 a').addClass('on');
      boxMotionFunc(15);
    }
  });

  $(window).resize(function () {
    if ($(window).width() <= 1400) {
      $('.header h1 a').addClass('on');
      boxMotionFunc(15);
    }
  });

  function boxMotionFunc(target) {
    $('.box')
      .stop()
      .animate({ left: target }, 400, 'easeInOutExpo');
  }

  function contMotionFunc(target) {
    $('html, body')
      .stop()
      .animate({ scrollTop: target }, 800, 'easeInOutExpo');
  }

  // TOP
  var time = 0, interval = 400, topIdx = 0;
  var slider = $('.sliderUl li');
  function topFunc() {
    time++;
    if (time % interval == 0) {
      slider.eq(topIdx).animate({ opacity: 0 }, 1000, 'easeInOutExpo')
      slider.eq(topIdx + 1).animate({ opacity: 1 }, 2000, 'easeInOutExpo');
      topIdx++;
      if (topIdx >= slider.length) {
        topIdx = 0;
        slider.eq(topIdx).animate({ opacity: 1 }, 2000, 'easeInOutExpo');
      }
    }

    requestAnimationFrame(topFunc);
  }
  topFunc();

  // qna
  var boardDt = $('.boardUl li dt'), boardDd = $('.boardUl li dd');
  boardDt.each(function (index) {
    $(this).on('click', function () {
      if (!$(this).hasClass('secret')) {
        if (!$(this).hasClass('on')) {
          boardDd.slideUp();
          $(this).addClass('on');
          $(this).next('dd').slideDown();
        } else {
          boardDd.slideUp();
          boardDt.removeClass('on');
        }
      } else {
        $('.modify').fadeIn().css('display', 'flex');
        $('body').css({ height: '100%', overflow: 'hidden' });
      }
    })
  });

  $('.boardBtnWrap.qna').click(function () {
    $('.layerWrap.qna').fadeIn().css('display', 'flex');
    $('body').css({ height: '100%', overflow: 'hidden' });
  });

  function checkboxFunc() {
    if (!$("input:checkbox[id='it_secret']").is(":checked")) {
      $('.layerUl_qna li.hidden').hide();
    } else {
      $('.layerUl_qna li.hidden').show();
    }
    requestAnimationFrame(checkboxFunc);
  }
  checkboxFunc();

  $('.layerBtn_x').click(function () {
    $('.layerWrap').fadeOut();
    $('body').css({ height: '', overflow: '' });
  });

  $('.boardBtnWrap.request').click(function () {
    $('.request').fadeIn().css('display', 'flex');
    $('body').css({ height: '100%', overflow: 'hidden' });
  })

});
