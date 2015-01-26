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
		activateSemantikPopup();
		activateBarcharts();
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

	function activateTooltips () {
		$('[data-toggle="tooltip"]').tooltip();
	}

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

	function activateSemantikPopup () {
		$('a.words-lists-link').magnificPopup({
			items: {
			  src: $('#semantik-popup')
			},
			type: 'inline'
		});
	}

	function activateBarcharts() {
		var defaultBarchartOptions = {
			axis: {
				x: {
					tick: {
						outer: false
					}
				},
				y: {
					tick: {
						outer: false
					}
				}
			},
			size: {
				height: 220
			},
			legend: {
				show: false
			},
			padding: {
				top: 20,
				right: 10,
				bottom: 20,
				left: 25
			},
			data: {
				type: 'bar'
			},
			color: {
				pattern: ['#ff656a', '#c9c9c9']
			},
			bar: {
				zerobased: true,
				width: {
					ratio: 1.1
				}
			},
			tooltip: {
				format: {}
			}
		};

		function roundMe(x) {
			return Math.round(x);
		}

		var optionsPriceDistribution = $.extend({}, defaultBarchartOptions, true);
		optionsPriceDistribution.bindto = '#distribution-chart';
		optionsPriceDistribution.axis.y.label = 'Anzahl Angebote';
		optionsPriceDistribution.axis.x.label = 'Preis';
		optionsPriceDistribution.axis.y.tick.format = roundMe;
		optionsPriceDistribution.axis.x.tick.format = roundMe;
		optionsPriceDistribution.axis.x.tick.values = [20,40,60,80,100,120,140,160,180,200];
		optionsPriceDistribution.data.columns = [[optionsPriceDistribution.axis.x.label, 0, 0, 0, 0, 0, 0, 0, 0, 2, 11, 21, 4, 12, 7, 13, 57, 17, 17, 35, 31, 152, 22, 64, 53, 47, 395, 49, 61, 121, 168, 539, 48, 100, 86, 64, 631, 92, 58, 130, 301, 779, 52, 123, 74, 88, 752, 49, 14, 125, 305, 608, 36, 88, 52, 75, 391, 53, 69, 96, 226, 515, 20, 54, 42, 50, 374, 28, 37, 85, 221, 382, 7, 34, 17, 28, 314, 17, 34, 38, 135, 338, 4, 15, 14, 33, 177, 3, 11, 33, 84, 201, 0, 12, 6, 2, 97, 6, 10, 15, 99, 187, 3, 0, 2, 5, 35, 4, 2, 4, 19, 61, 3, 2, 0, 4, 21, 3, 1, 5, 23, 125, 1, 1, 1, 2, 29, 2, 2, 2, 14, 38, 10, 0, 1, 8, 23, 0, 4, 1, 9, 42, 2, 0, 1, 2, 21, 1, 1, 2, 16, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
		optionsPriceDistribution.regions = [
			{axis: 'x', start: 8, end: 153, class: 'inserate-exists'}
		];
		optionsPriceDistribution.tooltip.contents = function (d) {
			if (d[0].value > 1) {
				return '<div class="custom-tooltip">' +
					'Es gibt ' + d[0].value + ' Angebote, die ' + d[0].index + '€ kosten' +
				'</div>';
			}
			else if (d[0].value === 1) {
				return '<div class="custom-tooltip">' +
					'Es gibt nur ein Angebot, das ' + d[0].index + '€ kostet' +
				'</div>';
			}
			else {
				return '<div class="custom-tooltip">' +
						'Es gibt kein Angebot, das ' + d[0].index + '€ kostet' +
					'</div>';
			}
		};

		window.c3.generate(optionsPriceDistribution);

		var optionsUsersDistribution = $.extend({}, defaultBarchartOptions, true);
		optionsUsersDistribution.bindto = '#users-chart';
		optionsUsersDistribution.axis.y.label = 'Anzahl Anbieter';
		optionsUsersDistribution.axis.x.label = 'Durchschnitt an Schlafplätze';
		optionsUsersDistribution.axis.x.min = 1;
		optionsUsersDistribution.axis.x.tick.values = [2,4,6,8,10,12,14];
		optionsUsersDistribution.data.columns = [[optionsUsersDistribution.axis.x.label, 0,749,4657,1397,1779,386,241,46,40,5,10,5,1,1,1,4]];
		optionsUsersDistribution.padding.left = 35;
		optionsUsersDistribution.tooltip.contents = function (d) {
			return '<div class="custom-tooltip">' +
				d[0].value + ' Anbietern können durchschnittlich ' + d[0].index + ' Schlafplätze anbieten' +
			'</div>';
		};

		window.c3.generate(optionsUsersDistribution);
	}

})( jQuery, window );
