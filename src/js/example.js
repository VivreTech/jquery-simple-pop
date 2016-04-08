$(function(){

    /*
     * Example 1
     */



    $('.js-open-modal').each(function(){

        var modalClass = $(this).data('what');
        var $modal = $('.' + modalClass);
        var $this = $(this);


        var code = $modal.html();
        var textarea = $this.parents('.example__item').append('<div class="example__code"><textarea></textarea></div>').find('textarea');
        textarea.val(code);

        $this.on('click', function(){
            $modal.simplePop();
        });

    });


});