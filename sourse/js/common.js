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

	const videoWrap = document.querySelectorAll('.slider-wrapper--video');
	for (let wrap of videoWrap) {
		const videoSlider = new Swiper('.sVideoSlider__slider--js', {
			slidesPerView: 'auto',
			spaceBetween: 24,
			pagination: {
				el:  wrap.querySelector('.swiper-pagination'),
				clickable: true,
			},
			navigation: {
				nextEl: wrap.querySelector('.swiper-button-next'),
				prevEl:  wrap.querySelector('.swiper-button-prev'),
			},
		});
	}

	document.addEventListener('click', (event)=> {
		let searchBtn = event.target.closest('.mobile-search-open');
		let searchBlock = event.target.closest('.search-block');
		if (searchBtn) {
			document.querySelector('.search-block').classList.toggle('active');
			document.querySelector('.mobile-search-open').classList.toggle('active');
		} 
		else if (!searchBlock) {
			document.querySelector('.search-block').classList.remove('active');
			document.querySelector('.mobile-search-open').classList.remove('active');
		}
	});

	// Tooltips
	
	const tooltipBtn = document.querySelectorAll('.tooltip-btn')
	tooltipBtn.forEach((btn) => {
		let tooltip = btn.nextElementSibling;
		const popperInstance = Popper.createPopper(btn, tooltip, {
			placement: 'top-end',
			container: 'body',
			boundary: document.body,
		});
		function show() {
			tooltip.setAttribute('data-show', '');
			popperInstance.setOptions((options) => ({
				...options,
				modifiers: [
					...options.modifiers,
					{ name: 'eventListeners', enabled: true },
				],
			}));
			popperInstance.update();
		}
		
		function hide() {
			tooltip.removeAttribute('data-show');
			popperInstance.setOptions((options) => ({
				...options,
				modifiers: [
					...options.modifiers,
					{ name: 'eventListeners', enabled: false },
				],
			}));
		}
		const showEvents = ['mouseenter', 'focus'];
		const hideEvents = ['mouseleave', 'blur'];
			
		showEvents.forEach((event) => {
			btn.addEventListener(event, show);
		});
		
		hideEvents.forEach((event) => {
			btn.addEventListener(event, hide);
		});
	});

	new Swiper('.freemode-slider--js', {
		slidesPerView: 'auto',
		freeMode: true,
		watchOverflow: true
	});

	const guideSwiper = new Swiper('.sGuide__swiper', {
		spaceBetween: 8,
		slidesPerView: 'auto',
		freeMode: true,
		grid: {
			fill: 'row',
			rows: 3,
		},
		breakpoints: {
			768: {
				slidesPerView: 4,
				spaceBetween: 24,
				grid: {
					fill: 'row',
					rows: 3,
				},
			},
		},
	});

	const smSliders = document.querySelectorAll('.sm-swiper-js');
	smSliders.forEach((fieldSlider) => {
		fieldSlider = new Swiper('.sm-swiper-js',{
		 spaceBetween: 8,
		 freeMode: true,
			 slidesPerView: 'auto',
	 });
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