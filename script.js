const dark = document.querySelector('.dark'),
      player = document.getElementsByTagName('iframe')[0],
	  play = document.getElementsByClassName('play')[0];

if(player && play) {
    play.addEventListener('click', function() {
        play.style.display = 'none';
        document.getElementsByClassName('video')[0].style.display = 'none';
        player.src += '&autoplay=1';
        document.getElementsByTagName('header')[0].style.zIndex = '0';
    });
}


const body = document.body.style,
      menu = document.querySelector('.menu-bar').style,
      services = document.querySelector('.services-bar').style;
let presentationItIs = false;
if(document.querySelector('.presentation')) {
    presentationItIs = true;
    videoPresentation = document.querySelector('.presentation').style;
}
let menuIsOpen = false;
document.querySelector('button.menu').addEventListener('click', function() {
    if(presentationItIs) videoPresentation.zIndex = '-1';
    dark.style.display = 'block';
    dark.style.opacity = '0.6';
    menu.zIndex = '3';
    menu.left = '0px';
    menu.overflow = 'auto';
    body.overflow = 'hidden';
    menuIsOpen = true;
});

document.querySelector('button.services-list').addEventListener('click', function() {
    services.left = '9.5vw';
    services.overflow = 'auto';
});

document.querySelector('.services-bar button').addEventListener('click', function() {
    services.left = '';
    services.overflow = '';
});

function menuClose() {
    if(!menuIsOpen) return;
    dark.style.display = '';
    dark.style.opacity = '';
    menu.left = '';
    body.overflow = '';
    menu.boxShadow = '';
    services.left = '';
    if(presentationItIs) videoPresentation.zIndex = '';
    if(tabs) tabs.style.zIndex = '';
    menuIsOpen = false;
}

document.querySelector('button.close').addEventListener('click', menuClose);
dark.addEventListener('click', menuClose);


if(document.querySelector('.any-servces')) {
    let serviceList = ['Банные ритуалы', 'Массаж', 'Спа-процедуры', 'Фитнес', 'Аквазона', 'Ресторан'],
        imageList = ['rituals', 'massage', 'spa', 'fitness', 'aquazone', 'restourant'];
    let currentServiceIndex = serviceList.indexOf(document.querySelector('h1').innerHTML);
    serviceList.splice(currentServiceIndex, 1);
    imageList.splice(currentServiceIndex, 1);
    function randomService(serviceList, imageList) {
        let index = Math.floor(Math.random() * serviceList.length);
        let result = [serviceList[index], imageList[index]];
        serviceList.splice(index, 1);
        imageList.splice(index, 1);
        return result;
    }
    let service1 = randomService(serviceList, imageList),
        service2 = randomService(serviceList, imageList);
    document.querySelector('.random-service-1').innerHTML = service1[0];
    document.querySelector('.random-service-2').innerHTML = service2[0];
    document.querySelector('.random-service-1').style.background = 'url(images/' + service1[1] + '.jpg) 0% 0% / cover';
    document.querySelector('.random-service-2').style.background = 'url(images/' + service2[1] + '.jpg) 0% 0% / cover';
}


const consultation = document.querySelector('.consultation');
if(!document.querySelector('.catalog') && consultation) {
    consultation.style.boxShadow = '0 5.5vw 0 -4vw #9e9e9e, 0 -5.5vw 0 -4vw #9e9e9e';
}


if(document.querySelector('.photos > div')) {
    const photos = document.querySelectorAll('.photos img');
    for(let i = 0; i < photos.length; i++) {
        let img = photos[i];
        photos[i].addEventListener('click', function() {
            window.scrollTo(0, document.querySelector('.photos img').parentNode.offsetTop - (document.documentElement.clientHeight - document.documentElement.clientWidth) / 2);
            img.style.width = '100%';
            if( (i + 1) === 0) img.style.left = '0';
            if( ( (i + 1) % 2 === 0) || ( (i + 1) % 3 === 0) ) img.style.left = '-' + i * img.clientWidth + 'px';
            dark.style.display = 'block';
            dark.style.opacity = '0.6';
            body.overflow = 'hidden';
        });
        dark.addEventListener('click', function() {
            img.style.width = '';
            img.style.left = '';
            dark.style.display = '';
            dark.style.opacity = '';
            body.overflow = '';
        });
    }
}


function selectItem(src) {
    const title = ['rituals', 'massage', 'spa', 'fitness', 'aquazone', 'restourant'];
    let sections = document.querySelectorAll('.gallery');
    if(!sections.length) sections = document.querySelectorAll('.services.wrapper');
    for(let i = 0; i < sections.length; i++) {
        sections[i].style.display = 'none';
    }
    document.getElementsByClassName(title[src.selectedIndex])[0].style.display = 'block';
}


if(document.querySelector('.map')) {
    function init_map() {
        var myOptions = {
            zoom: 15,
            center: new google.maps.LatLng(59.8425611833276, 30.318467001852447),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);
        marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(59.8425611833276, 30.318467001852447)
        });
        infowindow = new google.maps.InfoWindow({
            content: 'Площадь победы 1'
        });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });
        infowindow.open(map, marker);
    }
    google.maps.event.addDomListener(window, 'load', init_map);
}