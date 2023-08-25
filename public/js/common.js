"use strict";

const $ = jQuery;


function eventHandler() {

	JSCCommon.init()


	function whenResize() {
		JSCCommon.setFixedNav();
	}

	window.addEventListener('scroll', () => {
		JSCCommon.setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	const breadcrumbs = document.querySelector('.breadcrumb-slider--js');

	const breadcrumbsSlider =	new Swiper(breadcrumbs, {
		slidesPerView: 'auto',
		freeMode: true,
		watchOverflow: true,
		init: false,
	});


	breadcrumbsSlider.on('init', function () {
		breadcrumbsSlider.slideTo(breadcrumbsSlider.slides.length - 1)
	});

	if (breadcrumbsSlider) {
		breadcrumbsSlider.init();
	}

	const swiper4 = new Swiper('.sBanners__slider--js', { // если не используешь методы swiper  - можно обращаться без нее к Swiper
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});

	const moreSlider = new Swiper('.sSlider__slider--js', {
		slidesPerView: 4,
		pagination: {
			el: '.sSlider .swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.sSlider .swiper-button-next',
			prevEl: '.sSlider .swiper-button-prev',
		},
		spaceBetween: 8,
		slidesPerView: 1,
		breakpoints: {
			570: {
				slidesPerView: 2,
			},
			768: {
				slidesPerView: 3,
			},
			1024: {
				slidesPerView: 4,
			},
		},
	});

	const videoSlider = new Swiper('.sVideoSlider__slider--js', {
		slidesPerView: 'auto',
		spaceBetween: 24,
		pagination: {
			el: '.sVideoSlider .swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.sVideoSlider .swiper-button-next',
			prevEl: '.sVideoSlider .swiper-button-prev',
		},
	});

	const workSlider = new Swiper('.sWork__slider--js', {
		breakpoints: {
			768: {
				slidesPerView: 2,
				grid: {
					fill: 'row',
					rows: 3,
				},
			},
			992: {
				slidesPerView: 3,
				grid: {
					fill: 'row',
					rows: 3,
				},
			},
			1200: {
				slidesPerView: 4,
				grid: {
					fill: 'row',
					rows: 3,
				},
			},
		},
		spaceBetween: 24,
		pagination: {
			el: '.sWork .swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.sWork .swiper-button-next',
			prevEl: '.sWork .swiper-button-prev',
		},
	});
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }