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
			simulateTouch: false,
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
		let tooltip = document.querySelector(btn.dataset.tooltip);
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

	document.addEventListener('click', function (event) {
		let searchBlockTarget = event.target.closest('.sRpnContent__map-wrap');
		if (searchBlockTarget) {
			let searchBlock = searchBlockTarget.querySelector('.sRpnContent__search');
			let searchBlockInput = searchBlock.querySelector('input');
			searchBlockInput.addEventListener('input', function () {
				if (searchBlockInput.value.length > 0) {
					searchBlockTarget.querySelector('.sRpnContent__delete-btn').classList.add('active');
					searchBlockTarget.querySelector('.sRpnContent__search-result').classList.add('active');
				} else {
					searchBlockTarget.querySelector('.sRpnContent__delete-btn').classList.remove('active');
					searchBlockTarget.querySelector('.sRpnContent__search-result').classList.remove('active');
				}
			});
			searchBlockTarget.querySelector('.sRpnContent__delete-btn').addEventListener('click', function (el) {
				el.preventDefault();
				searchBlockInput.value = '';
				searchBlockInput.focus();
				searchBlockTarget.querySelector('.sRpnContent__delete-btn').classList.remove('active');
				searchBlockTarget.querySelector('.sRpnContent__search-result').classList.remove('active');
			})
		}
	})

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

// document.addEventListener('DOMContentLoaded', ()=>{




function init() {
  const markIcon = 'img/location.svg';
  const markIconColor = 'img/svg/map-color.png';
  var center = [46.75380038320217, 90.62071970898438];
  var myMap = new ymaps.Map('map2', {
    center: center,
    zoom: 2,
    controls: ['zoomControl']
  }),

  objectManager = new ymaps.ObjectManager({
    // Чтобы метки начали кластеризоваться, выставляем опцию.
    clusterize: true,
    // ObjectManager принимает те же опции, что и кластеризатор.
    gridSize: 34,
    clusterDisableClickZoom: true
});

        // Чтобы задать опции одиночным объектам и кластерам,
    // обратимся к дочерним коллекциям ObjectManager.
    objectManager.objects.options.set({
        iconLayout: 'default#image',
        iconImageHref: markIcon,
        // Размеры метки.

        iconImageSize: [34, 34],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-17, -7]
    });
    objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
    myMap.geoObjects.add(objectManager);
    

      let  points = [];

    $.ajax({
      url: "data.json"
  }).done(function(data) {
      objectManager.add(data); 
      points.push(data.features)
  });
	
	// console.log(points);

  let searchList = document.querySelector(".sRpnContent__search-result"); 
  function showBaloon(index, el) {
    
		var objectState = objectManager.getObjectState(el); 
		myMap.setCenter(points[0][index].geometry.coordinates, 14);

		myMap.geoObjects.add(objectManager);
        // if (objectState.isClustered) {
        //     // Сделаем так, чтобы указанный объект был "выбран" в балуне.
        //     objectManager.clusters.state.set('activeObject', objectManager.objects.getById(el));
        //     // Все сгенерированные кластеры имеют уникальные идентификаторы.
        //     // Этот идентификатор нужно передать в менеджер балуна, чтобы указать,
        //     // на каком кластере нужно показать балун.
        //     objectManager.clusters.balloon.open(objectState.cluster.id);
        // } else {
            objectManager.objects.balloon.open(el);
        // }
  }
  searchList.addEventListener("click", function (e) {
    const target = e.target.closest(".sRpnContent__search-link")
    if (!target) return;
    e.preventDefault();
    showBaloon(target.dataset.index, target.dataset.coords)
    // ymaps.geoQuery(geoObjects).getClosestTo().balloon.open();  
  })

  let input = document.querySelector("#suggest1");
  input.addEventListener('input', function () {
    var filter, ul, li, a, i;
    filter = this.value.toUpperCase(); 
    searchList.innerHTML = '';
    for (i = 0; i < points[0].length; i++) { 
      let title= points[0][i].properties.balloonContentHeader
      let id = points[0][i].id
      if (title.toUpperCase().indexOf(filter) > -1) {
        let text = `
          <li class="sRpnContent__search-item">
            <a href="#" class="sRpnContent__search-link" data-index="${i}" data-coords="${id}">
              ${title}
            </a>
          </li>
      `
      searchList.insertAdjacentHTML('beforeend', text);
        // li[i].style.display = "";
      } else {
        // li[i].style.display = "none";
      }
    }
  })


  let button = document.querySelector(".sRpnContent__search button");
  button.addEventListener('click', function () {
    var filter, ul, li, a, i;
    filter = input.value.toUpperCase();
    let searchList = document.getElementById("myDropdown");
    li = searchList.querySelectorAll("li");

    for (i = 0; i < li.length; i++) {
      let txtValue = li[i].querySelector("a").innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        showBaloon(li[i].querySelector("a"))
				document.querySelector(".sRpnContent__search-result").classList.remove('active');
      }
    }
  })

}; 