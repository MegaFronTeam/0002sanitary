function init() {
  const markIcon = 'img/location.svg';
  const markIconColor = 'img/svg/map-color.png';
  var center = [55.75380038320217, 37.62071970898438];
  var myMap = new ymaps.Map('map2', {
    center: center,
    zoom: 10,
    controls: ['zoomControl']
  }),
    clusterer = new ymaps.Clusterer({
      preset: 'islands#invertedVioletClusterIcons',
      groupByCoordinates: false,
      clusterDisableClickZoom: true,
      clusterHideIconOnBalloonOpen: false,
      geoObjectHideIconOnBalloonOpen: false
    }),
    getPointData = function (i, t, p, time) {
      return {
        balloonContent: `<div class="h5">${t}</div><p>${p}</p><span> Режим работы:</span> <span>${time}</span>`
      };
    },
    getPointOptions = function () {
      return {
        hideIconOnBalloonOpen: false,
        iconLayout: 'default#image',
        iconImageHref: markIcon,
        // Размеры метки.

        iconImageSize: [34, 34],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-17, -7]
      };
    },
    points = [
      { mark: [55.67455635081638, 37.64072341673275], t: '1111111Магазин Golden Decor в ТК Каширский Двор', p: 'Алтайский край 656 056, г. Барнаул, ул. М. Горького, 28', time: '10:00 — 22:00' },
      { mark: [55.684072399488265, 37.55676825847164], t: 'Магазин Golden Decor в ТК Каширский Двор', p: 'Амурская область 675 002, г. Благовещенск, ул. Первомайская, д. 30', time: '10:00 — 22:00' },
      { mark: [55.78843546026375, 37.656384548873845], t: 'Магазин Golden Decor в ТК Каширский Двор', p: ' Архангельская область 163 000, г. Архангельск, ул. Гайдара, д. 24', time: '10:00 — 22:00' },
      { mark: [55.744522, 37.616378], t: 'Магазин Golden Decor в ТК Каширский Двор', p: 'Астраханская область 414 057, г. Астрахань, ул. Н. Островского, 138', time: '10:00 — 22:00' },
      { mark: [55.716733, 37.589988], t: 'Магазин Golden Decor в ТК Каширский Двор', p: 'Белгородская область 308 023, г. Белгород, ул. Железнякова, д. 2', time: '10:00 — 22:00' },
      { mark: [55.716733, 37.59988], t: 'Магазин Golden Decor в ТК Каширский Двор', p: 'Брянская область 241 050, г. Брянск, 2-й Советский пер., д. 5А', time: '10:00 — 22:00' },
      { mark: [54.716733, 37.58988], t: 'Магазин Golden Decor в ТК Каширский Двор', p: 'Владимирская область 600 001, г. Владимир, ул. Офицерская, д. 20', time: '10:00 — 22:00' },
      { mark: [53.716733, 37.58988], t: 'Магазин Golden Decor в ТК Каширский Двор', p: 'Волгоградская область 400 005, г. Волгоград, пр. им. В. И. Ленина, д. 50 Б', time: '10:00 — 22:00' },
      { mark: [55.716733, 36.58998], t: 'Магазин Golden Decor в ТК Каширский Двор', p: 'Вологодская область 160 012, г. Вологда, ул. Яшина, 1а', time: '10:00 — 22:00' },
      { mark: [55.716733, 34.58998], t: 'Магазин Golden Decor в ТК Каширский Двор', p: 'Воронежская область 394 038, г. Воронеж, ул. Космонавтов, д. 21А', time: '10:00 — 22:00' },
    ],
    geoObjects = [];


  let searchList = document.querySelector(".sRpnContent__search-result");

  for (var i = 0, len = points.length; i < len; i++) {
    let mark = points[i].mark;
    let markdata = getPointData(points[i].i, points[i].t, points[i].p, points[i].time);
    geoObjects[i] = new ymaps.Placemark(mark, markdata, getPointOptions());
    geoObjects[i].events
      .add('balloonopen', e => {
        var target = e.get('target');
        target.options.set('iconImageHref', markIcon);
        target.options.set({ iconImageSize: [68, 74] });
        target.options.set({ iconImageOffset: [-34, -74] });
        $(".sOurStores__map-caption").html(`<div class="content">${target.properties.get('balloonContent')}</div><div class="closeButton"></div></div>`);
      })
      .add('balloonclose', (e) => {
        var target = e.get('target');
        target.options.set('iconImageHref', markIcon);
        target.options.set({ iconImageSize: [30, 32] });
        target.options.set({ iconImageOffset: [-15, -32] });
        $(".sOurStores__map-caption").html("");
      });

    let text = `
				<li class="sRpnContent__search-item">
					<a href="#" class="sRpnContent__search-link" data-coords="${i}">
						${points[i].p}
					</a>
				</li>
		`
    searchList.insertAdjacentHTML('beforeend', text);


  }
  function showBaloon(el) {
    var coords = geoObjects[el.getAttribute('data-coords')].geometry._coordinates;
    console.log(coords);
    myMap.setCenter(coords, 14);
    ymaps.geoQuery(geoObjects).getCentralObject(myMap).balloon.open();
  }
  searchList.addEventListener("click", function (e) {
    const target = e.target.closest(".sRpnContent__search-link")
    if (!target) return;
    e.preventDefault();
    showBaloon(target)
    // ymaps.geoQuery(geoObjects).getClosestTo().balloon.open();  
  })
  clusterer.options.set({
    gridSize: 80,
    clusterDisableClickZoom: true,
    iconColor: '#000000',
  });
  clusterer.add(geoObjects);
  myMap.geoObjects.add(clusterer);
  myMap.setBounds(clusterer.getBounds(), {
    checkZoomRange: true
  });
  $(document).on('click', '.closeButton', function () {
    myMap.balloon.close()
    // $(document).
  });


  let input = document.querySelector("#suggest1");
  input.addEventListener('input', function () {
    var filter, ul, li, a, i;
    filter = this.value.toUpperCase();
    let searchList = document.getElementById("myDropdown");
    li = searchList.querySelectorAll("li");

    for (i = 0; i < li.length; i++) {

      let txtValue = li[i].querySelector("a").innerText;
      console.log(li[i].querySelector("a").innerText)
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
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
      console.log(li[i].querySelector("a").innerText)
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        showBaloon(li[i].querySelector("a"))
      }
    }
  })

};
// let mapShow = true;
// $('.tabs__btn:nth-child(2)').bind('click', function () {
//   //- myMap.container.fitToViewport();
//   //- console.log(mapShow)
//   if (mapShow == true) {
//   }
//   mapShow = false;
// });
ymaps.ready(init);
// });
