/**
* Template Name: SmartGig - v4.1.0
* Template URL: https://bootstrapmade.com/SmartGig-one-page-bootstrap-template-free/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
   // Smooth scroll for the navigation menu and links with .scrollto classes
   var scrolltoOffset = $('#header').outerHeight() - 21;
   if (window.matchMedia("(max-width: 991px)").matches) {
     scrolltoOffset += 20;
   }
   $(document).on('click', '.navbar a, .scrollto', function(e) {
     if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
       var target = $(this.hash);
       if (target.length) {
         e.preventDefault();
 
         var scrollto = target.offset().top - scrolltoOffset;
 
         if ($(this).attr("href") == '#header') {
           scrollto = 0;
         }
 
         $('html, body').animate({
           scrollTop: scrollto
         }, 1500, 'easeInOutExpo');
 
         if ($(this).parents('.navbar').length) {
           $('.navbar .active').removeClass('active');
           $(this).closest('li').addClass('active');
         }
 
        
         return false;
       }
     }
   });
 
   // Activate smooth scroll on page load with hash links in the url
   $(document).ready(function() {
     if (window.location.hash) {
       var initial_nav = window.location.hash;
       if ($(initial_nav).length) {
         var scrollto = $(initial_nav).offset().top - scrolltoOffset;
         $('html, body').animate({
           scrollTop: scrollto
         }, 1500, 'easeInOutExpo');
       }
     }
   });
 
   // Navigation active state on scroll
   var nav_sections = $('section');
   var main_nav = $('.navbar');
 
   $(window).on('scroll', function() {
     var cur_pos = $(this).scrollTop() + 200;
 
     nav_sections.each(function() {
       var top = $(this).offset().top,
         bottom = top + $(this).outerHeight();
 
       if (cur_pos >= top && cur_pos <= bottom) {
         if (cur_pos <= bottom) {
           main_nav.find('li').removeClass('active');
         }
         main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
       }
       if (cur_pos < 300) {
         $(".navbar ul:first li:first,  ul:first li:first").addClass('active');
       }
     });
   });

 
   // Toggle .header-scrolled class to #header when page is scrolled
   $(window).scroll(function() {
     if ($(this).scrollTop() > 100) {
       $('#header').addClass('header-scrolled');
       $('#topbar').addClass('topbar-scrolled');
     } else {
       $('#header').removeClass('header-scrolled');
       $('#topbar').removeClass('topbar-scrolled');
     }
   });
 
   if ($(window).scrollTop() > 100) {
     $('#header').addClass('header-scrolled');
     $('#topbar').addClass('topbar-scrolled');
   }
 
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('fixed-top')
        nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

  /**
   * Hero carousel indicators
   */
  let heroCarouselIndicators = select("#hero-carousel-indicators")
  let heroCarouselItems = select('#heroCarousel .carousel-item', true)

  heroCarouselItems.forEach((item, index) => {
    (index === 0) ?
    heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>":
      heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>"
  });

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

})()