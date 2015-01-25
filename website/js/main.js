(function( $, window ) {
    'use strict';

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
        activateTooltips();
        activateSemantikDonuts();
        activateTitlesCarousel();
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

    // Initialize a new plugin instance for all
    // e.g. $('input[type="range"]') elements.
    $('input[type="range"]').rangeslider({

        polyfill: false,

        onInit: function(position, value) {
            changeVisibility(value);
        },

        onSlide: function(position, value) {
            changeVisibility(value);
        }
    });

    var $networkImages = document.getElementsByClassName('network-image');
    var len_network = $networkImages.length;

    function changeVisibility (n) {
        var len = len_network,
            display = 'none';

        while(len--) {
            status = len >= n ? 'none' : 'block';
            $networkImages[len].style.display = status;
        }
    }

    function activateTooltips () {
        $('[data-toggle="tooltip"]').tooltip();
    }

    function activateSemantikDonuts () {
        var defaultDonutOptions = {
            data: {
                type : 'donut',
                labels: false,
                colors: {
                    matching: '#ff5a5f',
                    notMatching: '#dcdcdc'
                }
            },
            legend: {
                show: false
            },
            size: {
                width: 60,
                height: 60
            },
            interaction: {
                enabled: false
            }
        };

        var optionsLocation = $.extend({}, defaultDonutOptions, true);
        optionsLocation.bindto = '#location-donut';
        optionsLocation.data.columns = [
            ['notMatching', 35.54],
            ['matching',    64.46]
        ];
        window.c3.generate(optionsLocation);

        var optionsFurniture = $.extend({}, defaultDonutOptions, true);
        optionsFurniture.bindto = '#furniture-donut';
        optionsFurniture.data.columns = [
            ['matching',    42.11],
            ['notMatching', 57.89]
        ];
        window.c3.generate(optionsFurniture);

        var optionsSize = $.extend({}, defaultDonutOptions, true);
        optionsSize.bindto = '#size-donut';
        optionsSize.data.columns = [
            ['matching',    9.14],
            ['notMatching', 90.86]
        ];
        window.c3.generate(optionsSize);

        var optionsFeeling = $.extend({}, defaultDonutOptions, true);
        optionsFeeling.bindto = '#feeling-donut';
        optionsFeeling.data.columns = [
            ['matching',    45.47],
            ['notMatching', 54.53]
        ];
        window.c3.generate(optionsFeeling);

        var optionsPrice = $.extend({}, defaultDonutOptions, true);
        optionsPrice.bindto = '#price-donut';
        optionsPrice.data.columns = [
            ['matching',    1],
            ['notMatching', 99.7],
        ];
        window.c3.generate(optionsPrice);
    }

    function activateTitlesCarousel () {
        $('#flats-titles-carousel').owlCarousel({
            singleItem: true,
            paginationSpeed: 300,
            autoPlay: 5000
        });
    }
})( jQuery, window );