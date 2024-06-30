(function ($) {
  // -- Widget Class additional js

  ("use strict");
  $("#today").addClass("active");

  var $document = $(document),
    $window = $(window),
    $body = $("body"),
    $html = $("html"),
    $htmlBody = $("html, body"),
    // Template Blocks
    blocks = {
      mainSlider: $(".mainSlider"),
      ttCarusel: $(".tt-carusel"),
      ttPromoTableCarusel: $(".tt-promo-table-carusel"),
      ttNewsCarousel: $(".tt-news-carousel"),
      ttBoxLayoutIcon: $(".tt-box-layout-icon"),
      ttTestimonialsCarousel: $(".tt-testimonials-carousel"),
      ttContentSlider: $(".tt-content-slider"),
      ttMenuObj: $(".tt-menu"),
      ttBtnToggle: $(".btn-toggle"),
      ttAccordionBox: $(".tt-accordion-box"),
      googleMap: $("#googleMap"),
      backToTop: $(".back-to-top"),
      ttToggleMenu: $(".tt-toggle-menu"),
      videoBlock: $(".video-block"),
      ttCountdown: $(".countdown"),
      ttCalendarDatepicker: $(".calendarDatepicker"),
      ttCounter: $(".tt-counter"),
      ttTabs: $(".tt-tabs"),
      ttInstafeed: $("#instafeed"),
      ttTotalCarusel: $(".tt-total-carusel"),
      rtltrue: jQuery("body").hasClass("rtl"),
    };

  $document.ready(function () {
    if (blocks.mainSlider.length) {
      mainSlider();
    }
    if (blocks.ttInstafeed.length) {
      instaFeed();
    }

    var pageNumber = 1;
    $(document).on(
      "click",
      ".view-more-post.ajax_load_post_btn.blog-grid",
      function (e) {
        pageNumber++;
        var item;
        var post_per_load = $(this).data("post_per_load");
        var rdmoreBtn = $(this);
        $(".ajax_load_post_img").show(); // Disable the button, temp.
        $(rdmoreBtn).hide(); // Disable the button, temp.
        $.ajax({
          type: "POST",
          url: ajax_object.ajax_url,
          data: {
            action: "dricub_driving_school_more_post_ajax",
            security: ajax_object.ajax_nonce_morepost,
            post_per_load: post_per_load,
            pageNumber: pageNumber,
          },
          context: document.body,
          success: function (data) {
            $(".ajax_load_post_img").hide();
            $(rdmoreBtn).show();
            if (data == "") {
              $(rdmoreBtn).hide();
            }
            e.preventDefault();
            var obj = JSON.parse(data);
            if (obj.count == "blank") {
              $(rdmoreBtn).hide();
            }
            $("#postPreload").append(obj.html);
            $("#postPreload > .item").each(function () {
              item = $(this);
              $("#blog-masonry")
                .masonry()
                .append(item)
                .masonry("appended", item)
                .masonry();
            });
            $(".post-all-content .tt-content-slider").slick({
              rtl: blocks.rtltrue,
              mobileFirst: false,
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              autoplay: false,
              arrows: true,
              dots: false,
            });
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
          },
        });
        return false;
      }
    );

    if (typeof elementorFrontend != "undefined") {
      if (typeof elementorFrontend.hooks != "undefined") {
        elementorFrontend.hooks.addAction(
          "frontend/element_ready/widget",
          function (scrollTop) {
            if ($(".tt-content-slider").length) {
              ttContentSlider($(".tt-content-slider"));
            }
            if ($(".tt-tabs").length) {
              ttTabs($(".tt-tabs"));
            }
            var windowWidth = window.innerWidth || $window.width();
            if ($(".tt-box-layout-icon").length && windowWidth < 601) {
              ttBoxLayoutIcon($(".tt-box-layout-icon"));
            }
            if ($(".tt-total-carusel").length) {
              ttTotalCarusel($(".tt-total-carusel"));
            }
          }
        );
      }
    }

    const ttContentSlider = (ttContentSlider) => {
      ttContentSlider.slick({
        rtl: blocks.rtltrue,
        mobileFirst: false,
        infinite: true,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        pauseOnHover: false,
      });
    };
    if (blocks.ttContentSlider.length) {
      ttContentSlider(blocks.ttContentSlider);
    }
    //tabs(custom)
    const ttTabs = (ttTabs) => {
      ttTabs.ttTabs({
        singleOpen: true,
        anim_tab_duration: 270,
        anim_scroll_duration: 500,
        toggleOnDesktop: false,
        scrollToOpenMobile: false,
        effect: "slide",
      });
    };
    if (blocks.ttTabs.length) {
      ttTabs(blocks.ttTabs);
    }

    // tt-box-layout-icon

    const ttBoxLayoutIcon = (ttBoxLayoutIcon) => {
      blocks.ttBoxLayoutIcon.slick({
        rtl: blocks.rtltrue,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 4000,
        adaptiveHeight: true,
        pauseOnHover: false,
      });
    };
    var windowWidth = window.innerWidth || $window.width();
    if (blocks.ttBoxLayoutIcon.length && windowWidth < 601) {
      ttBoxLayoutIcon(blocks.ttBoxLayoutIcon.length);
    }

    const ttTotalCarusel = (ttTotalCarusel) => {
      if (!ttTotalCarusel.hasClass("slick-initialized")) {
        ttTotalCarusel.slick({
          rtl: blocks.rtltrue,
          mobileFirst: false,
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
          dots: true,
          autoplay: true,
          autoplaySpeed: 3200,
          pauseOnHover: false,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 700,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 551,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
        });
      }
    };
    if (blocks.ttTotalCarusel.length) {
      ttTotalCarusel(blocks.ttTotalCarusel);
    }

    $("#vdo video").removeAttr("width").removeAttr("height");
    // tt-boxSubjects-carusel
    if (blocks.ttCarusel.length) {
      if (typeof ajax_ttslider != "undefined") {
        blocks.ttCarusel.slick({
          rtl: blocks.rtltrue,
          slidesToShow: parseInt(ajax_ttslider.slides_to_show),
          slidesToScroll: parseInt(ajax_ttslider.slides_to_scroll),
          arrows: JSON.parse(ajax_ttslider.arrows),
          dots: JSON.parse(ajax_ttslider.dots),
          autoplay: JSON.parse(ajax_ttslider.autoplay),
          autoplaySpeed: parseInt(ajax_ttslider.autoplay_speed),
          pauseOnHover: JSON.parse(ajax_ttslider.pause_on_hover),
          responsive: [
            {
              breakpoint: 1209,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 700,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
        });
      }
    }

    // tt-promo-table-carusel
    if (blocks.ttPromoTableCarusel.length) {
      if (typeof ajax_priceSlider != "undefined") {
        blocks.ttPromoTableCarusel.slick({
          rtl: blocks.rtltrue,
          mobileFirst: false,
          slidesToShow: parseInt(ajax_priceSlider.slides_to_show),
          slidesToScroll: parseInt(ajax_priceSlider.slides_to_scroll),
          infinite: true,
          autoplay: JSON.parse(ajax_priceSlider.autoplay),
          autoplaySpeed: parseInt(ajax_priceSlider.autoplay_speed),
          arrows: JSON.parse(ajax_priceSlider.arrows),
          dots: JSON.parse(ajax_priceSlider.dots),
          pauseOnHover: JSON.parse(ajax_priceSlider.pause_on_hover),
          responsive: [
            {
              breakpoint: 1209,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 769,
              settings: {
                slidesToShow: 1,
              },
            },
            {
              breakpoint: 500,
              settings: {
                slidesToShow: 1,
              },
            }
          ],
        });
      }
    }

    // tt-news-carousel
    if (blocks.ttNewsCarousel.length) {
      if (typeof ajax_newsSlider != "undefined") {
        blocks.ttNewsCarousel.slick({
          rtl: blocks.rtltrue,
          slidesToShow: parseInt(ajax_newsSlider.slides_to_show),
          slidesToScroll: parseInt(ajax_newsSlider.slides_to_scroll),
          arrows: JSON.parse(ajax_newsSlider.arrows),
          dots: JSON.parse(ajax_newsSlider.dots),
          autoplay: JSON.parse(ajax_newsSlider.autoplay),
          autoplaySpeed: parseInt(ajax_newsSlider.autoplay_speed),
          pauseOnHover: JSON.parse(ajax_newsSlider.pause_on_hover),
          infinite: JSON.parse(ajax_newsSlider.infinite),
          adaptiveHeight: JSON.parse(ajax_newsSlider.adaptiveHeight),
          responsive: [
            {
              breakpoint: 1209,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 700,
              settings: {
                slidesToShow: 1,
              },
            },
          ],
        });
      }
    }
    // tt-testimonials-carousel
    if (blocks.ttTestimonialsCarousel.length) {
      if (typeof ajax_tesSlider != "undefined") {
        blocks.ttTestimonialsCarousel.slick({
          rtl: blocks.rtltrue,
          slidesToShow: parseInt(ajax_tesSlider.slides_to_show),
          slidesToScroll: parseInt(ajax_tesSlider.slides_to_scroll),
          arrows: JSON.parse(ajax_tesSlider.arrows),
          dots: JSON.parse(ajax_tesSlider.dots),
          autoplay: JSON.parse(ajax_tesSlider.autoplay),
          autoplaySpeed: parseInt(ajax_tesSlider.autoplay_speed),
          pauseOnHover: JSON.parse(ajax_tesSlider.pause_on_hover),
          infinite: JSON.parse(ajax_tesSlider.infinite),
          adaptiveHeight: JSON.parse(ajax_tesSlider.adaptiveHeight),
          responsive: [
            {
              breakpoint: 1420,
              settings: {
                arrows: false,
              },
            },
          ],
        });
      }
    }

    //btn toggle mobile header
    if (blocks.ttBtnToggle.length) {
      var $ttBtnToggle = $(".btn-toggle"),
        ttHeader = $("#tt-header");

      $ttBtnToggle.on("click", function (e) {
        e.preventDefault();
        ttHeader.toggleClass("open");
      });
    }
    //tt-accordion-box
    if (blocks.ttAccordionBox.length) {
      var $ttAccordionBox = blocks.ttAccordionBox,
        $ttAccordionBoxItem = $ttAccordionBox.find(".item");

      $ttAccordionBoxItem.on("click", function () {
        $(this).toggleClass("active");
      });
    }
    if (blocks.ttToggleMenu.length) {
      var $ttToggleMenu = $(".tt-toggle-menu"),
        $ttMenu = $(".tt-menu");

      $ttToggleMenu.on("click", function (e) {
        $(this).toggleClass("active");
        $ttMenu.toggleClass("open-menu");
        $body.toggleClass("open-menu");
        e.preventDefault();
      });
    }
  });
  $window.on("load", function () {
    var windowWidth = window.innerWidth || $window.width();

    $body.addClass("is-loaded");

    /* menu */
    if (blocks.ttMenuObj.length) {
      var ttMenuObjLevel_0 = blocks.ttMenuObj.find("> ul > li");
      blocks.ttMenuObj
        .find("ul")
        .parent("li")
        .addClass("is-subMenu")
        .append('<i class="tt-icon-subMenu icon-down-arrow"></i>');
      ttMenuObjLevel_0.on("mouseenter mouseleave", function (event) {
        $(this).toggleClass("is-hover");
      });
    }

    if (blocks.backToTop.length) {
      backToTop();
    }
    if (blocks.videoBlock.length) {
      videoPost();
    }
    if (blocks.ttCalendarDatepicker.length) {
      blocks.ttCalendarDatepicker.datepicker();
    }
    if (blocks.ttCountdown.length) {
      countDown(true);
    }
    if (windowWidth > 768) {
      setInterval("scroll_bg()", 1);
      setInterval("scroll_bg1()", 1);
    }
    if (blocks.ttMenuObj.length) {
      ttMenuStuck(windowWidth);
    }
    if (blocks.ttCounter.length) {
      ttCounter();
    }
  });

  $window.on("resize load", function () {
    var windowWidth = window.innerWidth || $window.width();
    if (blocks.googleMap.length) {
      if (windowWidth > 899) {
        var $googleMap = googleMap,
          pageMain = $("main"),
          pageMainHeight = $("main").height() + 282,
          $objMap = $(".google-map");

        $objMap.css({
          height: pageMainHeight,
        });
      }
    }
    if (blocks.ttToggleMenu.length) {
      if (windowWidth < 701) {
        var $mobilsubMenu = $(".tt-menu .is-subMenu .tt-icon-subMenu");
        $mobilsubMenu.off("click");
        $mobilsubMenu.on("click", function (e) {
          e.preventDefault();
          $(this).parent(".tt-menu .is-subMenu").find("> ul").slideToggle();
        });
      }
    }
    if (blocks.mainSlider.length && windowWidth > 768) {
      var viewportHeight = $(window).height(),
        headerHeight = $("#tt-header").height(),
        sliderHeight = viewportHeight - headerHeight;
      blocks.mainSlider.find(".img--holder").height(sliderHeight);
    }
  });

  /* ---------------------------------------------
        Functions
   --------------------------------------------- */

  // instagram feed
  function instaFeed() {
    var userFeed = new Instafeed({
      get: "user",
      userId: "self",
      template:
        '<a href="{{link}}" target="_blank"><img src="{{image}}" /></a>',
      accessToken: "3483630941.1677ed0.66c4618b32444ac08a70cb2fe84c1bf8",
      limit: 9,
      resolution: "low_resolution",
      sortBy: "most-recent",
    });
    userFeed.run();
  }
  //tt-menu-stuck
  function ttMenuStuck(windowWidth) {
    if ($body.hasClass("open-menu")) return;

    var $objStuck = $(".tt-menu-stuck-row"),
      $objStuckInsert = $objStuck.find(".tt-menu-stuck"),
      $objBreakpoint = $("#page-main"),
      $objColMenu = $(".col-menu"),
      $mobileObj = $(".tt-header-bottom"),
      valueHeight1 = $mobileObj.height(),
      $mobileObjParent = $(".tt-header-wrapper-bottom"),
      $returnMobileHeader = $mobileObjParent.find(".container"),
      $objBreakpointOffset1 = $objBreakpoint.offset().top + 70;
    $objColMenu.removeAttr("style");

    $window.scroll(function () {
      $body.addClass("scroll");
      if ($body.hasClass("open-menu")) return;
      if ($window.scrollTop() > $objBreakpointOffset1) {
        var $objDetach = $mobileObj.detach();
        $objStuckInsert.prepend($objDetach);
        $objStuck.addClass("stuck-is");
        $mobileObjParent.css({ minHeight: valueHeight1 });
      } else {
        var $objDetachBack = $objStuckInsert.find($mobileObj).detach();
        $returnMobileHeader.prepend($objDetachBack);
        $objStuck.removeClass("stuck-is");
        $body.removeClass("scroll");
      }
    });
    $(".tt-toggle-menu").one("click", function () {
      var heightViewport = $window.innerHeight(),
        errorHeight = $("#tt-header").innerHeight(),
        totalValue = heightViewport - errorHeight;
      $(".tt-menu.open-menu").height(totalValue);
    });
  }
  // main slider
  function mainSlider() {
    if (typeof ajax_slickslider != "undefined") {
      var $el = blocks.mainSlider;
      $el.find(".slide").first().imagesLoaded({
        background: true,
      });
      $el.on("init", function (e, slick) {
        var $firstAnimatingElements = $("div.slide:first-child").find(
          "[data-animation]"
        );
        doAnimations($firstAnimatingElements);
      });
      $el.on("beforeChange", function (e, slick, currentSlide, nextSlide) {
        var $currentSlide = $(
          'div.slide[data-slick-index="' + nextSlide + '"]'
        );
        var $animatingElements = $currentSlide.find("[data-animation]");
        doAnimations($animatingElements);
      });
      $el.slick({
        rtl: blocks.rtltrue,
        arrows: JSON.parse(ajax_slickslider.arrows),
        dots: JSON.parse(ajax_slickslider.dots),
        autoplay: JSON.parse(ajax_slickslider.autoplay),
        autoplaySpeed: parseInt(ajax_slickslider.autoplay_speed),
        fade: JSON.parse(ajax_slickslider.fade),
        speed: parseInt(ajax_slickslider.speed),
        pauseOnHover: JSON.parse(ajax_slickslider.pause_on_hover),
        pauseOnDotsHover: JSON.parse(ajax_slickslider.pause_on_dots_hover),
        responsive: [
          {
            breakpoint: 768,
            settings: {
              arrows: false,
            },
          },
          {
            breakpoint: 1025,
            settings: {
              dots: false,
              arrows: false,
            },
          },
        ],
      });
    }
  }

  // Slider Animation
  function doAnimations(elements) {
    var animationEndEvents =
      "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
    elements.each(function () {
      var $this = $(this);
      var $animationDelay = $this.data("animation-delay");
      var $animationType = "animated " + $this.data("animation");
      $this.css({
        "animation-delay": $animationDelay,
        "-webkit-animation-delay": $animationDelay,
      });
      $this.addClass($animationType).one(animationEndEvents, function () {
        $this.removeClass($animationType);
      });
      if ($this.hasClass("animate")) {
        $this.removeClass("animation");
      }
    });
  }
  // backToTop
  function backToTop() {
    var $obj = blocks.backToTop;
    if ($obj.length > 0) {
      $obj.on("click", function () {
        $htmlBody.animate(
          {
            scrollTop: 0,
          },
          500
        );
        return false;
      });

      $window.scroll(function () {
        if ($window.scrollTop() > 500) {
          $obj.stop(true.false).fadeIn(110);
        } else {
          $obj.stop(true.false).fadeOut(110);
        }
      });
    }
  }
  // Countdown
  function countDown(showZero) {
    if (blocks.ttCountdown.length) {
      var showZero = showZero || false;

      blocks.ttCountdown.each(function () {
        var $this = $(this),
          date = $this.data("date"),
          set_year = $this.data("year") || "Yrs",
          set_month = $this.data("month") || "Mths",
          set_week = $this.data("week") || "Wk",
          set_day = $this.data("day") || "Day",
          set_hour = $this.data("hour") || "Hrs",
          set_minute = $this.data("minute") || "Min",
          set_second = $this.data("second") || "Sec";

        if ((date = date.split("-"))) {
          date = date.join("/");
        } else return;

        $this.countdown(date, function (e) {
          var format = '<span class="countdown-row">';

          function addFormat(func, timeNum, showZero) {
            if (timeNum === 0 && !showZero) return;

            func(format);
          }

          addFormat(
            function () {
              format +=
                '<span class="countdown-section">' +
                '<span class="countdown-amount">' +
                e.offset.totalDays +
                "</span>" +
                '<span class="countdown-period">' +
                set_day +
                "</span>" +
                "</span>";
            },
            e.offset.totalDays,
            showZero
          );

          addFormat(
            function () {
              format +=
                '<span class="countdown-section">' +
                '<span class="countdown-amount">' +
                e.offset.hours +
                "</span>" +
                '<span class="countdown-period">' +
                set_hour +
                "</span>" +
                "</span>";
            },
            e.offset.hours,
            showZero
          );

          addFormat(
            function () {
              format +=
                '<span class="countdown-section">' +
                '<span class="countdown-amount">' +
                e.offset.minutes +
                "</span>" +
                '<span class="countdown-period">' +
                set_minute +
                "</span>" +
                "</span>";
            },
            e.offset.minutes,
            showZero
          );

          addFormat(
            function () {
              format +=
                '<span class="countdown-section">' +
                '<span class="countdown-amount">' +
                e.offset.seconds +
                "</span>" +
                '<span class="countdown-period">' +
                set_second +
                "</span>" +
                "</span>";
            },
            e.offset.seconds,
            showZero
          );

          format += "</span>";

          $(this).html(format);
        });
      });
    }
  }

  //videoPost
  function videoPost() {
    blocks.videoBlock.find(".link-video").on("click", function (e) {
      e.preventDefault();
      var myVideo = $(this).parent().find(".movie")[0];
      if (myVideo.paused) {
        myVideo.play();
        $(this).addClass("play");
      } else {
        myVideo.pause();
        $(this).removeClass("play");
      }
    });
  }

  function ttCounter() {
    $window.scroll(function () {
      var ttCounterObj = $(".tt-counter");

      ttCounterObj.each(function () {
        var cPos = $(this).offset().top,
          topWindow = $window.scrollTop();

        if (cPos < topWindow + 800) {
          $(".tt-counter").countTo().removeClass("tt-counter");
        }
      });
    });
  }

  var cssFix = (function () {
    var u = navigator.userAgent.toLowerCase(),
      is = function (t) {
        return u.indexOf(t) != -1;
      };
    $html.addClass(
      [
        !/opera|webtv/i.test(u) && /msie (\d)/.test(u)
          ? "ie ie" + RegExp.$1
          : is("firefox/2")
          ? "gecko ff2"
          : is("firefox/3")
          ? "gecko ff3"
          : is("gecko/")
          ? "gecko"
          : is("opera/9")
          ? "opera opera9"
          : /opera (\d)/.test(u)
          ? "opera opera" + RegExp.$1
          : is("konqueror")
          ? "konqueror"
          : is("applewebkit/")
          ? "webkit safari"
          : is("mozilla/")
          ? "gecko"
          : "",
        is("x11") || is("linux")
          ? " linux"
          : is("mac")
          ? " mac"
          : is("win")
          ? " win"
          : "",
      ].join("")
    );
  })();
  /*
    touch-device and gallery(mobile)
    */
  function is_touch_device() {
    return !!("ontouchstart" in window) || !!("onmsgesturechange" in window);
  }
  if (is_touch_device()) {
    $body.addClass("touch-device");
  }
  function getInternetExplorerVersion() {
    var rv = -1;
    if (navigator.appName == "Microsoft Internet Explorer") {
      var ua = navigator.userAgent;
      var re = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
      if (re.exec(ua) != null) rv = parseFloat(RegExp.$1);
    } else if (navigator.appName == "Netscape") {
      var ua = navigator.userAgent;
      var re = new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})");
      if (re.exec(ua) != null) rv = parseFloat(RegExp.$1);
    }
    return rv;
  }
  if (getInternetExplorerVersion() !== -1) {
    $html.addClass("ie");
  }
  /*
     tabs(custom)
   */
  $.fn.ttTabs = function (options) {
    function ttTabs(tabs) {
      var $tabs = $(tabs),
        $head = $tabs.find(".tt-tabs__head"),
        $head_ul = $head.find("> ul"),
        $head_li = $head_ul.find("> li"),
        $head_span = $head_li.find("> span"),
        $border = $head.find(".tt-tabs__border"),
        $body = $tabs.find(".tt-tabs__body"),
        $body_li = $body.find("> div"),
        anim_tab_duration = options.anim_tab_duration || 500,
        anim_scroll_duration = options.anim_scroll_duration || 500,
        breakpoint = 1025,
        scrollToOpenMobile =
          options.scrollToOpenMobile !== undefined
            ? options.scrollToOpenMobile
            : true,
        singleOpen =
          options.singleOpen !== undefined ? options.singleOpen : true,
        toggleOnDesktop =
          options.toggleOnDesktop !== undefined
            ? options.toggleOnDesktop
            : true,
        effect = options.effect !== undefined ? options.effect : "slide",
        offsetTop = options.offsetTop !== undefined ? options.offsetTop : "",
        goToTab = options.goToTab,
        $btn_prev = $("<div>").addClass("tt-tabs__btn-prev disabled"),
        $btn_next = $("<div>").addClass("tt-tabs__btn-next"),
        btn_act = false;

      function _closeTab($li, desktop) {
        var anim_obj = {
          duration: anim_tab_duration,
          complete: function () {
            $(this).removeAttr("style");
          },
        };

        function _anim_func($animElem) {
          if (effect === "toggle") {
            $animElem.hide().removeAttr("style");
          } else if (effect === "slide") {
            $animElem.slideUp(anim_obj);
          } else {
            $animElem.slideUp(anim_obj);
          }
        }

        var $animElem;

        if (desktop || singleOpen) {
          $head_li.removeClass("active");
          $animElem = $body_li
            .filter(".active")
            .removeClass("active")
            .find("> div")
            .stop();

          _anim_func($animElem);
        } else {
          var index = $head_li.index($li);

          $li.removeClass("active");
          $animElem = $body_li
            .eq(index)
            .removeClass("active")
            .find("> div")
            .stop();

          _anim_func($animElem);
        }
      }

      function _openTab($li, desktop, beforeOpen, afterOpen, trigger) {
        var index = $head_li.index($li),
          $body_li_act = $body_li.eq(index),
          $animElem,
          anim_obj = {
            duration: anim_tab_duration,
            complete: function () {
              if (afterOpen) afterOpen($body_li_act);
            },
          };

        function _anim_func($animElem) {
          if (beforeOpen) beforeOpen($li.find("> span"));

          if (effect === "toggle") {
            $animElem.show();
            if (afterOpen) afterOpen($body_li_act);
          } else if (effect === "slide") {
            $animElem.slideDown(anim_obj);
          } else {
            $animElem.slideDown(anim_obj);
          }
        }

        $li.addClass("active");
        $animElem = $body_li_act.addClass("active").find("> div").stop();

        _anim_func($animElem);
      }

      function _replaceBorder($this, animate) {
        if ($this.length) {
          var span_l = $this.get(0).getBoundingClientRect().left,
            head_l = $head.get(0).getBoundingClientRect().left,
            position = {
              left: span_l - head_l,
              width: $this.width(),
            };
        } else {
          var position = {
            left: 0,
            width: 0,
          };
        }

        if (animate) $border.stop().animate(position, anim_tab_duration);
        else $border.stop().css(position);
      }

      function _correctBtns($li, func) {
        var span_act_l = $li.find("> span").get(0).getBoundingClientRect().left,
          span_act_r = $li.find("> span").get(0).getBoundingClientRect().right,
          head_pos = {
            l: $head.get(0).getBoundingClientRect().left,
            r: $head.get(0).getBoundingClientRect().right,
          };

        if (span_act_l < head_pos.l) {
          _replace_slider(
            Math.ceil(head_pos.l - span_act_l),
            head_pos,
            false,
            function () {
              func();
            }
          );
        } else if (span_act_r > head_pos.r) {
          _replace_slider(
            Math.ceil(span_act_r - head_pos.r) * -1,
            head_pos,
            false,
            function () {
              func();
            }
          );
        } else {
          func();
        }
      }

      $head.on("click", "> ul > li > span", function (e, trigger) {
        var $this = $(this),
          $li = $this.parent(),
          wind_w = window.innerWidth,
          desktop = wind_w > breakpoint,
          trigger = trigger === "trigger" ? true : false;

        if ($li.hasClass("active")) {
          if (desktop && !toggleOnDesktop) return;

          _closeTab($li, desktop);

          _replaceBorder("", true);
        } else {
          _correctBtns($li, function () {
            _closeTab($li, desktop);

            _openTab(
              $li,
              desktop,
              function ($li_act) {
                if (desktop) {
                  var animate = !trigger;

                  _replaceBorder($li_act, animate);
                }
              },
              function ($body_li_act) {
                if (!desktop && !trigger && scrollToOpenMobile) {
                  var tob_t = $body_li_act.offset().top;
                  $htmlBody.stop().animate(
                    { scrollTop: tob_t },
                    {
                      duration: anim_scroll_duration,
                    }
                  );
                }
              }
            );
          });
        }
      });

      $body.on("click", "> div > span", function (e) {
        var $this = $(this),
          $li = $this.parent(),
          index = $body_li.index($li);

        $head_li.eq(index).find("> span").trigger("click");
      });

      function _toTab(tab, scrollTo, focus) {
        var wind_w = window.innerWidth,
          desktop = wind_w > breakpoint,
          header_h = 0,
          $sticky = $(offsetTop),
          $openTab = $head_li.filter('[data-tab="' + tab + '"]'),
          $scrollTo = $(scrollTo),
          toTab = {};

        if (desktop && $sticky.length) {
          header_h = $sticky.height();
        }

        if (!$openTab.hasClass("active")) {
          toTab = { scrollTop: $tabs.offset().top - header_h };
        }

        $htmlBody.stop().animate(toTab, {
          duration: anim_scroll_duration,
          complete: function () {
            _correctBtns($openTab, function () {
              _closeTab($openTab, desktop);

              _openTab(
                $openTab,
                desktop,
                function ($li_act) {
                  _replaceBorder($li_act, true);
                },
                function () {
                  if ($scrollTo.length) {
                    $htmlBody.animate(
                      { scrollTop: $scrollTo.offset().top - header_h },
                      {
                        duration: anim_scroll_duration,
                        complete: function () {
                          var $focus = $(focus);

                          if ($focus.length) $focus.focus();
                        },
                      }
                    );
                  }
                }
              );
            });
          },
        });
      }

      if ($.isArray(goToTab) && goToTab.length) {
        $(goToTab).each(function () {
          var elem = this.elem,
            tab = this.tab,
            scrollTo = this.scrollTo,
            focus = this.focus;

          $(elem).on("click", function (e) {
            _toTab(tab, scrollTo, focus);

            e.preventDefault();
            return false;
          });
        });
      }

      function _btn_disabled(head_pos) {
        var span_pos = {
          l: $head_li.first().find("> span").get(0).getBoundingClientRect()
            .left,
          r: $head_li.last().find("> span").get(0).getBoundingClientRect()
            .right,
        };

        if (span_pos.l < head_pos.l) $btn_prev.removeClass("disabled");
        else $btn_prev.addClass("disabled");

        if (span_pos.r > head_pos.r) $btn_next.removeClass("disabled");
        else $btn_next.addClass("disabled");
      }

      function _replace_slider(difference, head_pos, resize, afterReplace) {
        var ul_pos = parseInt($head_ul.css("left"), 10),
          border_pos = parseInt($border.css("left"), 10),
          duration = !resize ? anim_tab_duration : 0,
          anim_pos = {
            left: ul_pos + difference,
          };

        if (resize) {
          $head_ul.css(anim_pos);
          _btn_disabled(head_pos);
        } else {
          $border.animate({ left: border_pos + difference }, anim_tab_duration);

          $head_ul.animate(anim_pos, {
            duration: duration,
            complete: function () {
              _btn_disabled(head_pos);
              if (afterReplace) afterReplace();
              btn_act = false;
            },
          });
        }
      }

      $tabs.on("click", ".tt-tabs__btn-prev, .tt-tabs__btn-next", function () {
        var $btn = $(this);

        if ($btn.hasClass("disabled") || btn_act) return;

        btn_act = true;

        var head_pos = {
          l: $head.get(0).getBoundingClientRect().left,
          r: $head.get(0).getBoundingClientRect().right,
        };

        if ($btn.hasClass("tt-tabs__btn-next")) {
          $head_span.each(function (i) {
            var $this = $(this),
              this_r = $this.get(0).getBoundingClientRect().right;

            if (this_r > head_pos.r) {
              _replace_slider(Math.ceil(this_r - head_pos.r) * -1, head_pos);
              return false;
            }
          });
        } else if ($btn.hasClass("tt-tabs__btn-prev")) {
          $($head_span.get().reverse()).each(function (i) {
            var $this = $(this),
              this_l = $this.get(0).getBoundingClientRect().left;

            if (this_l < head_pos.l) {
              _replace_slider(Math.ceil(head_pos.l - this_l), head_pos);
              return false;
            }
          });
        }
      });

      $window.on("resize load", function () {
        var wind_w = window.innerWidth,
          desktop = wind_w > breakpoint,
          head_w = $head.innerWidth(),
          li_w = 0;

        $head_li.each(function () {
          li_w += $(this).innerWidth();
        });

        if (desktop) {
          var $li_act = $head_li.filter(".active"),
            $span_act = $li_act.find("> span");

          if (!singleOpen && $span_act.length > 1) {
            var $save_active = $li_act.first();

            _closeTab("", desktop);
            _openTab($save_active, desktop);
          }

          if (li_w > head_w) {
            $head.addClass("slider").append($btn_prev).append($btn_next);

            $head_ul.css({ "margin-right": (li_w - $head.innerWidth()) * -1 });

            if ($span_act.length) {
              var span_act_r = $span_act.get(0).getBoundingClientRect().right,
                span_last_r = $head_span.last().get(0).getBoundingClientRect()
                  .right,
                head_pos = {
                  l: $head.get(0).getBoundingClientRect().left,
                  r: $head.get(0).getBoundingClientRect().right,
                };

              if (span_act_r > head_pos.r) {
                _replace_slider(
                  Math.ceil(span_act_r - head_pos.r) * -1,
                  head_pos,
                  true
                );
              } else if (span_last_r < head_pos.r) {
                _replace_slider(head_pos.r - span_last_r, head_pos, true);
              }

              _replaceBorder($span_act, false);
            }
          } else {
            $head_ul.removeAttr("style");
            $btn_prev.remove();
            $btn_next.remove();
            $head.removeClass("slider");
            _replaceBorder($span_act, false);
          }

          $head.css({ visibility: "visible" });
        } else {
          $border.removeAttr("style");
        }
      });

      $head_li
        .filter('[data-active="true"]')
        .find("> span")
        .trigger("click", ["trigger"]);

      return $tabs;
    }

    var tabs = new ttTabs($(this).eq(0));

    return tabs;
  };
})(jQuery);

var bg_Offset = 0;
var bg_Offset1 = 0;
function scroll_bg() {
  bg_Offset = bg_Offset + 1;
  if (bg_Offset > 1119) bg_Offset = 0;
  jQuery(".tt-promo-02").css("backgroundPosition", bg_Offset + "px bottom");
}
function scroll_bg1() {
  bg_Offset1 = bg_Offset1 + 1;
  if (bg_Offset1 > 844) bg_Offset1 = 0;
  jQuery(".carObj-mobilemiter").css(
    "backgroundPosition",
    bg_Offset1 + "px bottom"
  );
}

jQuery(document).ready(function () {
  // obj.init();
  //mutation event for rtl
  if (jQuery("body").hasClass("rtl")) {
    var $targets = document.querySelectorAll(".vc_row[data-vc-full-width]");
    NodeList.prototype.forEach = Array.prototype.forEach;
    $targets.forEach(function ($target) {
      var $config = { attributes: true, childList: true, characterData: true };
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (
            mutation.attributeName == "style" &&
            $target.style.left.indexOf("-") != -1
          ) {
            var $right = $target.style.left;
            $target.style.left = "auto";
            $target.style.right = $right;
          }
        });
      });
      observer.observe($target, $config);
    });
  }
});
