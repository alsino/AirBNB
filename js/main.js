var	$window = $(window),
	$document = $(document),
	$body = $('body'),
	$navbar = $('.navbar');

var navbar_small = false;

var scrollPos = 0;

$window.scroll(function(){
	scrollActions();
});

$window.on('load', function() {
	scrollActions();
});

function scrollActions () {

	scrollPos = $document.scrollTop();

	if(scrollPos > 0) {
    	$navbar.addClass('scroll');
    }
    else {
    	$navbar.removeClass('scroll');
    }
    
    if(scrollPos > 150)
    {
        if(!navbar_small)
        {
            navbar_small = true;
            $navbar.stop().animate({
                padding: '0'
            }, 400);
        }
    }
    else
    {
        if(navbar_small)
        {
            navbar_small = false;
            
            $navbar.stop().animate({
                padding: '15px 0'
            }, 400);
        }  
    }
}
