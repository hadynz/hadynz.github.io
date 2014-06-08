/**
 * Conditional fixing the position of my personal biography
 * section when a user scrolls down the page
 */
(function($){
    var $biography = $('.biography');

    if ($biography.length > 0) {
        var top = $biography.offset().top - 40;;

        $(window).scroll(function(){
            var y = $(this).scrollTop();
            if (y >= top) {
                $biography.addClass('biography-is-fixed');
            } else {
                $biography.removeClass('biography-is-fixed');
            }
        });
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
        $window = $(window),
        bottomOffset = 0;

    var togglePopupVisibility = function() {
        var windowScrollTop = $window.scrollTop(),
            windowHeight = $window.height(),
            documentHeight = $.getDocHeight(),
            bottomOffsetForHide = documentHeight * 0.55,
            bottomOffsetForShow = documentHeight * 0.12;

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
        $window.scroll($.throttle(250, togglePopupVisibility));
    }

}(jQuery));