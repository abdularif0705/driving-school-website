(function ($) {
    "use strict";
    const rtltrue =jQuery('body').hasClass('rtl');
    const doAnimations1= (elements) =>{
        let animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        elements.each(function () {
			let $this = $(this);
			let $animationDelay = $this.data('animation-delay');
			let $animationType = 'animated ' + $this.data('animation');
          $this.css({
            'animation-delay': $animationDelay,
            '-webkit-animation-delay': $animationDelay
          });
          $this.addClass($animationType).one(animationEndEvents, function () {
            $this.removeClass($animationType);
          });
          if ($this.hasClass('animate')) {
            $this.removeClass('animation');
          }
        });
      };
    

    function mainSlider() {
        let $el =$('.mainSlider');
        $el.find('.slide').first().imagesLoaded({
          background: true
        });
        $el.on('init', function (e, slick) {
          let $firstAnimatingElements = $('div.slide:first-child').find('[data-animation]');
          doAnimations1($firstAnimatingElements);
        });
        $el.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
          let $currentSlide = $('div.slide[data-slick-index="' + nextSlide + '"]');
          let $animatingElements = $currentSlide.find('[data-animation]');
          doAnimations1($animatingElements);
        });
        let ajax_slickslider = $('.mainSlider').data('slick');
       
        $el.not('.slick-initialized').slick({
          rtl:rtltrue,
          arrows: JSON.parse(ajax_slickslider.arrows),
          dots: JSON.parse(ajax_slickslider.dots),
          autoplay: JSON.parse(ajax_slickslider.autoplay),
          autoplaySpeed: parseInt(ajax_slickslider.autoplay_speed),
          fade: JSON.parse(ajax_slickslider.fade),
          speed: parseInt(ajax_slickslider.speed),
          pauseOnHover: JSON.parse(ajax_slickslider.pause_on_hover),
          pauseOnDotsHover: JSON.parse(ajax_slickslider.pause_on_dots_hover),
          responsive: [{
              breakpoint: 768,
              settings: {
                  arrows: false
              }
          },{
            breakpoint: 1025,
            settings: {
              dots: false,
              arrows: false
            }
          }]
        });
    };
    const ttCaruselele =()=>{
      $('.tt-carusel').each(function() {
        let ajax_ttslider = $(this).data('slick');
        $(this).not('.slick-initialized').slick({
            rtl:rtltrue,
            slidesToShow: parseInt(ajax_ttslider.slides_to_show),
            slidesToScroll: parseInt(ajax_ttslider.slides_to_scroll),
            arrows: JSON.parse(ajax_ttslider.arrows),
            dots: JSON.parse(ajax_ttslider.dots),
            autoplay: JSON.parse(ajax_ttslider.autoplay),
            autoplaySpeed: parseInt(ajax_ttslider.autoplay_speed),
            pauseOnHover: JSON.parse(ajax_ttslider.pause_on_hover),
            responsive: [{
            breakpoint: 1209,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
            }, {
            breakpoint: 700,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
            }]
        });
      });
    }
    
    const mainSliderimageheight=()=>{
        let el=$('.mainSlider')
        let windowWidth = window.innerWidth || $window.width();
        if (el && windowWidth > 768) {
            let viewportHeight = $(window).height(),
                headerHeight = $("#tt-header").height(),
                sliderHeight = viewportHeight - headerHeight;
                el.find('.img--holder').height(sliderHeight);
        };
    }

    // tt-testimonials-carousel
    const ttTestimonialsCarouselele=() =>{
      
      
      $('.tt-testimonials-carousel').each(function() {
        let ajax_tesSlider = $(this).data('slick');
        if (typeof ajax_tesSlider != "undefined"){
          $(this).not('.slick-initialized').slick({
              rtl:rtltrue,
              slidesToShow: parseInt(ajax_tesSlider.slides_to_show),
              slidesToScroll: parseInt(ajax_tesSlider.slides_to_scroll),
              arrows: JSON.parse(ajax_tesSlider.arrows),
              dots: JSON.parse(ajax_tesSlider.dots),
              autoplay: JSON.parse(ajax_tesSlider.autoplay),
              autoplaySpeed: parseInt(ajax_tesSlider.autoplay_speed),
              pauseOnHover: JSON.parse(ajax_tesSlider.pause_on_hover),
              infinite: JSON.parse(ajax_tesSlider.infinite),
              adaptiveHeight: JSON.parse(ajax_tesSlider.adaptiveHeight),
                responsive: [{
                  breakpoint: 1420,
                  settings: {
                    arrows: false
                  }
                }]
          });
        }
      });
      
	  }
	
	const ttPromoTableCaruselele=() =>{
    $('.tt-promo-table-carusel').each(function() {
      let ajax_priceSlider = $(this).data('slick');
      $(this).not('.slick-initialized').slick({
        rtl:rtltrue,
        mobileFirst: false,
        slidesToShow: parseInt(ajax_priceSlider.slides_to_show),
        slidesToScroll: parseInt(ajax_priceSlider.slides_to_scroll),
        infinite: true,
        autoplay: JSON.parse(ajax_priceSlider.autoplay),
        autoplaySpeed: parseInt(ajax_priceSlider.autoplay_speed),
        arrows: JSON.parse(ajax_priceSlider.arrows),
        dots: JSON.parse(ajax_priceSlider.dots),
        pauseOnHover: JSON.parse(ajax_priceSlider.pause_on_hover),
        responsive: [{
        breakpoint: 1209,
        settings: {
          slidesToShow: 2
        }
        }, {
        breakpoint: 769,
        settings: {
          slidesToShow: 1
        }
        }]
      });
  
    });

	}

	const ajax_newsSliderele=() =>{
		let ajax_newsSlider = $('.tt-news-carousel').data('slick');
		$('.tt-news-carousel').slick({
			rtl:rtltrue,
			slidesToShow: parseInt(ajax_newsSlider.slides_to_show),
			slidesToScroll: parseInt(ajax_newsSlider.slides_to_scroll),
			arrows: JSON.parse(ajax_newsSlider.arrows),
			dots: JSON.parse(ajax_newsSlider.dots),
			autoplay: JSON.parse(ajax_newsSlider.autoplay),
			autoplaySpeed: parseInt(ajax_newsSlider.autoplay_speed),
			pauseOnHover: JSON.parse(ajax_newsSlider.pause_on_hover),
			infinite: JSON.parse(ajax_newsSlider.infinite),
			adaptiveHeight: JSON.parse(ajax_newsSlider.adaptiveHeight),
			responsive: [{
			breakpoint: 1209,
			settings: {
				slidesToShow: 2
			}
			}, {
			breakpoint: 700,
			settings: {
				slidesToShow: 1
			}
			}]
		});
  }

  //-- Countdown
  const ttBannerTimer=() =>{
    if ($('.countdown').length) {
      var showZero = showZero || false;
      $('.countdown').each(function() {
          var $this = $(this),
            date = $this.data('date'),
            set_year = $this.data('year') || 'Yrs',
            set_month = $this.data('month') || 'Mths',
            set_week = $this.data('week') || 'Wk',
            set_day = $this.data('day') || 'Day',
            set_hour = $this.data('hour') || 'Hrs',
            set_minute = $this.data('minute') || 'Min',
            set_second = $this.data('second') || 'Sec';

          if (date = date.split('-')) {
            date = date.join('/');
          } else return;

      $this.countdown(date , function(e) {
        var format = '<span class="countdown-row">';

        function addFormat(func, timeNum, showZero) {
          if(timeNum === 0 && !showZero) return;

          func(format);
        };

        addFormat(function() {
          format += '<span class="countdown-section">'
                  + '<span class="countdown-amount">' + e.offset.totalDays + '</span>'
                  + '<span class="countdown-period">' + set_day + '</span>'
                + '</span>';
        }, e.offset.totalDays, showZero);

        addFormat(function() {
          format += '<span class="countdown-section">'
                  + '<span class="countdown-amount">' + e.offset.hours + '</span>'
                  + '<span class="countdown-period">' + set_hour + '</span>'
                + '</span>';
        }, e.offset.hours, showZero);

        addFormat(function() {
          format += '<span class="countdown-section">'
                  + '<span class="countdown-amount">' + e.offset.minutes + '</span>'
                  + '<span class="countdown-period">' + set_minute + '</span>'
                + '</span>';
        }, e.offset.minutes, showZero);

        addFormat(function() {
          format += '<span class="countdown-section">'
                  + '<span class="countdown-amount">' + e.offset.seconds + '</span>'
                  + '<span class="countdown-period">' + set_second + '</span>'
                + '</span>';
        }, e.offset.seconds, showZero);

        format += '</span>';

          $(this).html(format);
      });
      });
    }
  
  }

          
  //-- Countdown
   

    $(window).on('elementor/frontend/init', function () {
        elementorFrontend.hooks.addAction('frontend/element_ready/driving_school_slick_slider.default', mainSlider);
        elementorFrontend.hooks.addAction('frontend/element_ready/driving_school_slick_slider.default', mainSliderimageheight);
        elementorFrontend.hooks.addAction('frontend/element_ready/driving_school_team_carousel.default', ttCaruselele);
        elementorFrontend.hooks.addAction('frontend/element_ready/driving_schools_programs.default', ttCaruselele);
        elementorFrontend.hooks.addAction('frontend/element_ready/driving_school_testimonials.default', ttTestimonialsCarouselele);
		    elementorFrontend.hooks.addAction('frontend/element_ready/driving_school_news_slider.default', ajax_newsSliderele);
		    elementorFrontend.hooks.addAction('frontend/element_ready/driving_school_price.default', ttPromoTableCaruselele);
		    elementorFrontend.hooks.addAction('frontend/element_ready/driclub_timer_banner.default', ttBannerTimer);
    });
})(jQuery);