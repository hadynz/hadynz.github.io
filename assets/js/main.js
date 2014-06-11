/**
 * Conditional fixing the position of my personal biography
 * section when a user scrolls down the page
 */
(function($){
    var $biography = $('.biography');
    var $biographyWrapper = $('.biography-wrapper');

    // A Safari-only check to implement an unfortunate hack
    var isSafari = function() {
        return /constructor/i.test(window.HTMLElement);
    };

    if ($biography.length > 0) {
        var top = $biography.offset().top - 40;

        var fixBiographyElement = function() {
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

}(jQuery));

/**
 * Conditional display of the twitter share popup when a user scrolls
 * down towards the end of a post. This method also uses different offset
 * properties to determine when to show or hide. For example, when a user
 * gets very close to the bottom, the popup show. However, when the user
 * scroll back up, the popup hides after a much larger offset to give
 * more visual time to the popup as possible and entice the user to click!
 */
(function($){

    // Return the actual document height
    $.getDocHeight = function(){
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

    var togglePopupVisibility = function() {
        var windowScrollTop = $window.scrollTop(),
            windowHeight = $window.height();

        if(windowScrollTop + windowHeight >= documentHeight - bottomOffset) {
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

        $twitterPopupCloseBtn.click(function(ev){
            ev.preventDefault();

            $twitterPopup.hide();
            $window.off('scroll', f);
        });
    }

}(jQuery));