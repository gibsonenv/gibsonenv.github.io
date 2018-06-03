jQuery(document).ready(function( $ ) {
  // auto play iframe video when scrolled over
    var iframes = Array.prototype.slice.call(document.getElementsByClassName("autoplay-video")),
        disableAutoPlay = false;
    function isScrolledIntoView(el) {
        var elemTop = el.getBoundingClientRect().top,
            elemBottom = el.getBoundingClientRect().bottom,
            isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
        return isVisible;
    }
    iframes.forEach(function(iframe) {
      $(iframe).on("mouseleave", function () {
          disableAutoPlay = true;
      });
    });
  // Header fixed and Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
      $('#header').addClass('header-fixed');
    } else {
      $('.back-to-top').fadeOut('slow');
      $('#header').removeClass('header-fixed');
    }

    if (!disableAutoPlay) {
      iframes.forEach(function(iframe) {
        if (isScrolledIntoView(iframe)) {
            iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        } else {
            iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        }
      });
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},900, 'easeInOutExpo');
    return false;
  });

  // Initiate the wowjs
  new WOW().init();

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {opacity:'show'},
    speed: 400
  });

  // Mobile Navigation
  if( $('#nav-menu-container').length ) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({ id: 'mobile-nav'});
    $mobile_nav.find('> ul').attr({ 'class' : '', 'id' : '' });
    $('body').append( $mobile_nav );
    $('body').prepend( '<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>' );
    $('body').append( '<div id="mobile-body-overly"></div>' );
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function(e){
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function(e){
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
       if ( $('body').hasClass('mobile-nav-active') ) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ( $("#mobile-nav, #mobile-nav-toggle").length ) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smoth scroll on page hash links
  $('a[href*="#"]:not([href="#"])').on('click', function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if( $('#header').length ) {
          top_space = $('#header').outerHeight();

          if( ! $('#header').hasClass('header-fixed') ) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 900, 'easeInOutExpo');

        if ( $(this).parents('.nav-menu').length ) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ( $('body').hasClass('mobile-nav-active') ) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Porfolio filter
  $("#platform-data-flters li").click ( function() {
    $("#platform-data-flters li").removeClass('filter-active');
    $(this).addClass('filter-active');

    var selectedFilter = $(this).data("filter");
    $("#platform-data-wrapper").fadeTo(100, 0);

    $(".platform-data-item").fadeOut().css('transform', 'scale(0)');

    setTimeout(function() {
      $(selectedFilter).fadeIn(100).css('transform', 'scale(1)');
      $("#platform-data-wrapper").fadeTo(300, 1);
    }, 300);
  });

// custom code
  

});
