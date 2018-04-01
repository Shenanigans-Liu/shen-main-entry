(function($) {
  "use strict";
  $(window).on("load", function() { // makes sure the whole site is loaded
    //preloader
  });

  $(document).ready(function(){  
    //active menu
    $(document).on("scroll", onScroll);
    $('a[href^="#"]').on('click', function (e) {
      e.preventDefault();
      $(document).off("scroll");
 
      $('a').each(function () {
        $(this).removeClass('active');
      })
      $(this).addClass('active');
 
      var target = $(this.hash);
      $('html, body').stop().animate({
        'scrollTop': target.offset().top
      }, 1000, function () {
        //window.location.hash = target;
        $(document).on("scroll", onScroll);
      });
    });
    
    //scroll js
    smoothScroll.init({
      selector: '[data-scroll]', // Selector for links (must be a valid CSS selector)
      selectorHeader: '[data-scroll-header]', // Selector for fixed headers (must be a valid CSS selector)
      speed: 500, // Integer. How fast to complete the scroll in milliseconds
      easing: 'easeInOutCubic', // Easing pattern to use
      updateURL: true, // Boolean. Whether or not to update the URL with the anchor hash on scroll
      offset: 0, // Integer. How far to offset the scrolling anchor location in pixels
      callback: function ( toggle, anchor ) {} // Function to run after scrolling
    });

    //menu
    var bodyEl = document.body,
    content = document.querySelector( '.content-wrap' ),
    openbtn = document.getElementById( 'open-button' ),
    closebtn = document.getElementById( 'close-button' ),
    isOpen = false;

    function inits() {
      preloadMedia();
      initEvents();
      preloadEnd();    
    }
    
    //preload media  
    function preloadMedia() {
      $(".loadMore").html("<i class='fa fa-spinner fa-pulse fa-3x fa-fw'></i><span class='sr-only'>Loading...</span>");    
      let folder = "images/photography/";
      $.ajax({
        url : folder,
        success: function (images) {
          $(images).find("a").attr("href", function (i, img) {
            if( img.match(/\.(jpe?g|png|gif)$/) ) { 
              $("#photo-list").append( '<div class="grid-item"><a href="' + img + '"><img alt="photography" class="wrap-img" src="' + img + '"></a></div>' );
            }
          });
            
          //display first four photography and smart rearrange   
          $(".grid-item:hidden").slice(0, 4).show(function() {
            $('.grid').masonry({
              itemSelector: '.grid-item',
            });
            $(".loadMore").html("<p style='font-size:11pt; font-weight:500;'>Load More<br><i class='fa fa-angle-double-down fa-2x' aria-hidden='true'></i></p>");    
          });
            
          //initializing photo gallery
          $('.photography a').magnificPopup({
            type: 'image',
            gallery: {
              enabled: true
            }
          });
        }
      });    
    }  

    function initEvents() {
      openbtn.addEventListener( 'click', toggleMenu );
      if( closebtn ) {
        closebtn.addEventListener( 'click', toggleMenu );
      }
        
      // close the menu element if the target it´s not the menu element or one of its descendants..
      content.addEventListener( 'click', function(ev) {
        var target = ev.target;
        if( isOpen && target !== openbtn ) {
          toggleMenu();
        }
      });
        
      // set video volume
      $("video").prop("volume", 0.3);
    }
    
    function preloadEnd() {
      $("#status").fadeOut(); // will first fade out the loading animation
      $("#preloader").delay(450).fadeOut("slow"); // will fade out the white DIV that covers the website.
    }
      
      

    function toggleMenu() {
      if( isOpen ) {
        classie.remove( bodyEl, 'show-menu' );
        $(".menu-button").removeClass("toggle-close");
      }
      else {
        classie.add( bodyEl, 'show-menu' );
        $(".menu-button").addClass("toggle-close");
      }
      isOpen = !isOpen;
    }
    
    inits();

    //typed js
    $(".typed").typed({
        strings: ["I am a Software Engineer,", "a DESIGN LOVER,", "and a PHOTOGRAPHY ENTHUSIAST"],
        typeSpeed: 35,
        backDelay: 500,
        // loop
        loop: true
    });

      
    //contact
    $('#gooForm').on('submit', function(e) {
      $('#gooForm *').fadeOut(500);
      $('#gooForm').prepend('<p style="color:#5f5f5f; font-size:12pt;">Thank you for your message. You will hear from me shortly.<p>');
    });
      
    $('input').blur(function() {
      // check if the input has any value (if we've typed into it)
      if ($(this).val())
        $(this).addClass('used');
      else
        $(this).removeClass('used');
    });
    
    //Skill
    jQuery('.skillbar').each(function() {
      jQuery(this).appear(function() {
        var year = jQuery(this).attr('data-percent');
        var percent = parseFloat(year, 10);
        percent = Math.sqrt(percent) * 33.3;
        percent = percent + "%";
        jQuery(this).find('.count-bar').animate({
          width:percent
        },2000);
        year += '+ yrs';
        jQuery(this).find('.count').html('<span>' + year + '</span>');
      });
    });
      
      
    $(".loadMore").on('click', function (e) {
        e.preventDefault();
        $(".loadMore").html("<i class='fa fa-spinner fa-pulse fa-3x fa-fw'></i><span class='sr-only'>Loading...</span>");
        $(".grid-item:hidden").slice(0, 5).show(function() {
            //masonry
            $('.grid').masonry({
              itemSelector: '.grid-item',
            });
            $(".loadMore").html("<p style='font-size:11pt; font-weight:500;'>Load More<br><i class='fa fa-angle-double-down fa-2x' aria-hidden='true'></i></p>");
        });
        if ($(".grid-item:hidden").length == 0) {
            $(".loadMore").fadeOut();
        }
    });
    
      
    // project toggle event
    $(".project-img-loading").html("<i class='fa fa-spinner fa-pulse fa-3x fa-fw'></i><span class='sr-only'>Loading...</span>");  
    $("#workTab0").click(function(e) {
      e.preventDefault();
      let parentElement = "#fullstack-img";
      let childElement = '<a target="_blank" href="https://www.shen-confusion.com"><img alt="full stack" src="images/fullstack.png"></a>';    
      lazyLoadImg(parentElement, childElement);
      $("#workContent0").slideToggle(600);
      $("#workContent1").slideUp(500);
    });
    $("#arrow0").click(function(e) {
      e.preventDefault();
      $("#workContent0").slideUp(600);
    });
    $("#workTab1").click(function(e) {
      e.preventDefault();
      let parentElement = "#deeplearning-img";
      let childElement = '<a target="_blank" href="https://ml.supshen.com"><img alt="Deep Learning" src="images/deeplearning.jpg"></a>';    
      lazyLoadImg(parentElement, childElement);    
      $("#workContent1").slideToggle(600);
      $("#workContent0").slideUp(500);
    });
    $("#arrow1").click(function(e) {
      e.preventDefault();
      $("#workContent1").slideUp(600);
    });
    $("#workTab2").click(function(e) {
      e.preventDefault();
      let parentElement = "#facial-img";
      let childElement = '<a><img style="width:90%;" alt="facial recognition" src="images/faces.jpg"></a>'; 
      lazyLoadImg(parentElement, childElement);
      $("#workContent2").slideToggle(600);
      $("#workContent3").slideUp(500);
    });
    $("#arrow2").click(function(e) {
      e.preventDefault();
      $("#workContent2").slideUp(600);
    });
      $("#workTab3").click(function(e) {
      e.preventDefault();
      let parentElement = "#robotics-img";
      let childElement = '<a><video controls loop muted><source src="images/robotics.mp4" type="video/mp4">Your browser does not support the video.</video></a>';    
      lazyLoadImg(parentElement, childElement);
      $("#workContent3").slideToggle(600);
      $("#workContent2").slideUp(500);
    });
    $("#arrow3").click(function(e) {
      e.preventDefault();
      $("#workContent3").slideUp(600);
    });
    
    //load project images  
    function lazyLoadImg(parent, child) {      
      if (!$(parent).has("a").length) {  // if div contains <a></a>
        $(parent).html(child);
      }      
    }  
      
  }); // !!!!!! END OF DOCUMENT.READY()
  
    
  //header
  function inits() {
    window.addEventListener('scroll', function(e){
        var distanceY = window.pageYOffset || document.documentElement.scrollTop,
            shrinkOn = 300,
            header = document.querySelector(".for-sticky");
        if (distanceY > shrinkOn) {
            classie.add(header,"opacity-nav");
        } else {
            if (classie.has(header,"opacity-nav")) {
                classie.remove(header,"opacity-nav");
            }
          }
      });
    }

  window.onload = inits();

  //nav-active
  function onScroll(event){
    var scrollPosition = $(document).scrollTop();
    $('.menu-list a').each(function () {
      var currentLink = $(this);
      var refElement = $(currentLink.attr("href"));
      if (refElement.position().top <= scrollPosition && refElement.position().top + refElement.height() > scrollPosition) {
        $('.menu-list a').removeClass("active");
        currentLink.addClass("active");
      }
      /*else{
        currentLink.removeClass("active");
      }*/
    });
  }

})(jQuery);