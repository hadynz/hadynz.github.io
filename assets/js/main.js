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