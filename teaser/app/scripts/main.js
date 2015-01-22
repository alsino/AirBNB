(function( $, window ) {
	'use strict';

	$('[data-toggle="tooltip"]').tooltip();

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
		['matching', 	64.46]
	];
	window.c3.generate(optionsLocation);

	var optionsFurniture = $.extend({}, defaultDonutOptions, true);
	optionsFurniture.bindto = '#furniture-donut';
	optionsFurniture.data.columns = [
		['matching', 	42.11],
		['notMatching', 57.89]
	];
	window.c3.generate(optionsFurniture);

	var optionsSize = $.extend({}, defaultDonutOptions, true);
	optionsSize.bindto = '#size-donut';
	optionsSize.data.columns = [
		['matching', 	9.14],
		['notMatching', 90.86]
	];
	window.c3.generate(optionsSize);

	var optionsFeeling = $.extend({}, defaultDonutOptions, true);
	optionsFeeling.bindto = '#feeling-donut';
	optionsFeeling.data.columns = [
		['matching', 	45.47],
		['notMatching', 54.53]
	];
	window.c3.generate(optionsFeeling);

	var optionsPrice = $.extend({}, defaultDonutOptions, true);
	optionsPrice.bindto = '#price-donut';
	optionsPrice.data.columns = [
		['matching', 	1],
		['notMatching', 99.7],
	];
	window.c3.generate(optionsPrice);

	$('.icon').click(function openWordsList(event) {
		var $list = $(event.target).closest('.teaser-content').next('.words-list'),
			isSelf = $list.hasClass('open');
		$('.words-list').slideUp(200).removeClass('open');
		if (!isSelf) {
			$list.slideDown(200, function() {
				$('html, body').animate({ scrollTop: $list.prev('.teaser-content').offset().top }, 500);
			});
			$list.addClass('open');
		}
	});

	$('.glyphicon-remove').click(function closeWordsList(event) {
		var $list = $(event.target).closest('.words-list');
		$list.slideUp(200, function() {
			$('html, body').animate({ scrollTop: $list.prev('.teaser-content').offset().top }, 500);
		});
		$list.removeClass('open');
	});

	$('#flats-titles-carousel').owlCarousel({
		singleItem: true,
		paginationSpeed: 300,
		autoPlay: 5000
	});

})( jQuery, window );