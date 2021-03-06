/*global ga, twttr  */

/**
 * Conditional fixing the position of my personal biography
 * section when a user scrolls down the page
 */
jQuery(function($) {
    var $biography = $('.biography'),
        $biographyWrapper = $('.biography-wrapper');

    // A Safari-only check to implement an unfortunate hack
    var isSafari = function () {
        return (/constructor/i).test(window.HTMLElement);
    };

    /**
     * Method ensures that the blog content is big enough to warrant us to fix the
     * biography element on the page. If we don't do this check, we end up with a
     * flicker on the page because fixing the biography element, takes it out of the
     * page flow and all of a sudden shortens the page and in turn removes the fixing.
     */
    var isLongEnough = function() {
        var $header = $('header'),
            $blogContent = $('.blog-content');

        return $header.height() + $blogContent.height() > $biography.height() + 200;
    };

    if ($biography.length > 0 && isLongEnough()) {
        var top = $biography.offset().top - 40;

        var fixBiographyElement = function () {
            var y = $(this).scrollTop();
            if (y >= top) {
                $biography.addClass('biography-is-fixed');
                $biographyWrapper.filter(isSafari).css('width', '100%');
            } else {
                $biography.removeClass('biography-is-fixed');
                $biographyWrapper.filter(isSafari).css('width', '');
            }
        };

        $(window).scroll(fixBiographyElement);
        fixBiographyElement();
    }
});

/**
 * Conditional display of the twitter share popup when a user scrolls
 * down towards the end of a post. This method also uses different offset
 * properties to determine when to show or hide. For example, when a user
 * gets very close to the bottom, the popup show. However, when the user
 * scroll back up, the popup hides after a much larger offset to give
 * more visual time to the popup as possible and entice the user to click!
 */
jQuery(function($){

    // Return the actual document height
    $.getDocHeight = function () {
        return Math.max(
            $(document).height(),
            $(window).height(),
            document.documentElement.clientHeight /* For opera: */
        );
    };

    var $twitterPopup = $('.twitter-popup'),
        $twitterPopupCloseBtn = $('.twitter-popup .twitter-popup--close-btn'),
        $window = $(window),
        documentHeight = $.getDocHeight(),
        bottomOffsetForHide = documentHeight * 0.40,
        bottomOffsetForShow = documentHeight * 0.10,
        bottomOffset = bottomOffsetForShow;

    var togglePopupVisibility = function () {
        var windowScrollTop = $window.scrollTop(),
            windowHeight = $window.height();

        if (windowScrollTop + windowHeight >= documentHeight - bottomOffset) {
            $twitterPopup.addClass('twitter-popup-is-visible');
            bottomOffset = bottomOffsetForHide;
        }
        else {
            $twitterPopup.removeClass('twitter-popup-is-visible');
            bottomOffset = bottomOffsetForShow;
        }
    };

    if ($twitterPopup.length > 0) {
        var f = $.throttle(250, togglePopupVisibility);
        $window.scroll(f);

        $twitterPopupCloseBtn.click(function (ev) {
            ev.preventDefault();

            $twitterPopup.hide();
            $window.off('scroll', f);
        });
    }

});

/**
 * Track twitter events with Google Analytics
 */
jQuery(function($){
    var pageTitle = $('meta[name=title]').attr('content'),
        pageUrl = $('meta[name=page_url]').attr('content');

    twttr.ready(function (twttr) {

        twttr.events.bind('follow', function(event) {
            ga('send', 'social', 'twitter', 'follow', event.data.screen_name, { 'page': pageUrl });
        });

        twttr.events.bind('tweet', function(event) {
            ga('send', 'social', 'twitter', 'tweet', pageTitle, { 'page': pageUrl });
        });

    });
});

/**
 * Setup gallery collections using Magnific Popup widget
 */
jQuery(function($){

    // Turn on slideshow for all photosets
    $('.photoset').slick({
        infinite: false,
        slide: 'figure',
        dots: true
    });
});