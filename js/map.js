'use strict';

var apartmentsInformation = [
  {
    'author': {
      'avatar': 'img/avatars/user01.png'
    },
    'offer': {
      'title': 'Большая уютная квартира',
      'address': '600, 350',
      'price': 10000,
      'type': 'flat',
      'rooms': 3,
      'guests': 7,
      'checkin': '12:00',
      'checkout': '13:00',
      'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg']
    },
    'location': {
      'x': 600,
      'y': 230
    }
  },
  {
    'author': {
      'avatar': 'img/avatars/user02.png'
    },
    'offer': {
      'title': 'Маленькая неуютная квартира',
      'address': '810, 580',
      'price': 5000,
      'type': 'flat',
      'rooms': 1,
      'guests': 1,
      'checkin': '13:00',
      'checkout': '12:00',
      'features': ['parking', 'washer'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg', 'http://o0.github.io/assets/images/tokyo/hotel1.jpg']
    },
    'location': {
      'x': 800,
      'y': 300
    }
  },
  {
    'author': {
      'avatar': 'img/avatars/user03.png'
    },
    'offer': {
      'title': 'Огромный прекрасный дворец',
      'address': '200, 450',
      'price': 100000,
      'type': 'place',
      'rooms': 100,
      'guests': 0,
      'checkin': '14:00',
      'checkout': '13:00',
      'features': ['wifi', 'dishwasher', 'parking', 'washer', 'conditioner'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg']
    },
    'location': {
      'x': 340,
      'y': 180
    }
  },
  {
    'author': {
      'avatar': 'img/avatars/user04.png'
    },
    'offer': {
      'title': 'Маленький ужасный дворец',
      'address': '700, 240',
      'price': 50000,
      'type': 'place',
      'rooms': 3,
      'guests': 5,
      'checkin': '14:00',
      'checkout': '14:00',
      'features': ['wifi', 'parking', 'washer', 'conditioner'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel3.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg']
    },
    'location': {
      'x': 800,
      'y': 535
    }
  },
  {
    'author': {
      'avatar': 'img/avatars/user05.png'
    },
    'offer': {
      'title': 'Красивый гостевой домик',
      'address': '350, 350',
      'price': 15000,
      'type': 'house',
      'rooms': 3,
      'guests': 7,
      'checkin': '12:00',
      'checkout': '14:00',
      'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg']
    },
    'location': {
      'x': 600,
      'y': 230
    }
  },
  {
    'author': {
      'avatar': 'img/avatars/user06.png'
    },
    'offer': {
      'title': 'Некрасивый негостеприимный домик',
      'address': '800, 180',
      'price': 5000,
      'type': 'house',
      'rooms': 2,
      'guests': 5,
      'checkin': '14:00',
      'checkout': '12:00',
      'features': ['wifi', 'parking'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel3.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel1.jpg']
    },
    'location': {
      'x': 880,
      'y': 430
    }
  },
  {
    'author': {
      'avatar': 'img/avatars/user07.png'
    },
    'offer': {
      'title': 'Уютное бунгало далеко от моря',
      'address': '300, 750',
      'price': 29000,
      'type': 'bungalo',
      'rooms': 3,
      'guests': 7,
      'checkin': '12:00',
      'checkout': '13:00',
      'features': ['wifi', 'dishwasher', 'washer', 'conditioner'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
    },
    'location': {
      'x': 500,
      'y': 590
    }
  },
  {
    'author': {
      'avatar': 'img/avatars/user08.png'
    },
    'offer': {
      'title': 'Неуютное бунгало по колено в воде',
      'address': '100, 450',
      'price': 1000,
      'type': 'bungalo',
      'rooms': 1,
      'guests': 4,
      'checkin': '14:00',
      'checkout': '12:00',
      'features': ['conditioner'],
      'description': '',
      'photos': ['http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg', 'http://o0.github.io/assets/images/tokyo/hotel1.jpg']
    },
    'location': {
      'x': 400,
      'y': 330
    }
  }
];

var templateOffer = document.querySelector('template');
var templatePin = templateOffer.content.querySelector('.map__pin');
var templatePopupPin = templateOffer.content.querySelector('.map__card');
var pinOnMap = document.querySelector('.map__pins');
var popupPinOnMap = document.querySelector('.map__filters-container');
var fragmentPin = document.createDocumentFragment();
var fragmentPopupPin = document.createDocumentFragment();

for (var i = 0; i < apartmentsInformation.length; i++) {
  var elementPin = templatePin.cloneNode(true);
  var elementPinImg = elementPin.querySelector('img');
  var popupPin = templatePopupPin.cloneNode(true);
  elementPin.style.left = apartmentsInformation[i].location.x + 'px';
  elementPin.style.top = apartmentsInformation[i].location.y + 'px';
  elementPinImg.src = apartmentsInformation[i].author.avatar;
  elementPinImg.alt = apartmentsInformation[i].offer.title;
  fragmentPin.appendChild(elementPin);
  popupPin.querySelector('.popup__title').textContent = apartmentsInformation[i].offer.title;
  // popupPin.querySelector('.popup-text__address').textContent = apartmentInformation[i].offer.address;
  popupPin.querySelector('.popup__text--price').innerHTML = apartmentsInformation[i].offer.price + ' ' + '&#x20bd;' + '<span>/ночь</span>';
  if (apartmentsInformation[i].offer.type === 'flat') {
    popupPin.querySelector('.popup__type').textContent = 'Квартира';
  } else if (apartmentsInformation[i].offer.type === 'place') {
    popupPin.querySelector('.popup__type').textContent = 'Дворец';
  } else if (apartmentsInformation[i].offer.type === 'house') {
    popupPin.querySelector('.popup__type').textContent = 'Дом';
  } else {
    popupPin.querySelector('.popup__type').textContent = 'Бунгало';
  }
  var rooms;
  var guests;
  if (apartmentsInformation[i].offer.rooms === 1) {
    rooms = ' комната';
  } else if (apartmentsInformation[i].offer.rooms === 2 || apartmentsInformation[i].offer.rooms === 3) {
    rooms = ' комнаты';
  } else {
    rooms = ' комнат';
  }
  if (apartmentsInformation[i].offer.guests === 1) {
    guests = ' для ' + apartmentsInformation[i].offer.guests + ' гостя';
  } else if (apartmentsInformation[i].offer.guests) {
    guests = ' для ' + apartmentsInformation[i].offer.guests + ' гостей';
  } else {
    guests = ' не для гостей';
  }
  popupPin.querySelector('.popup__text--capacity').textContent = apartmentsInformation[i].offer.rooms + rooms + guests;
  popupPin.querySelector('.popup__text--time').textContent = 'Заезд после ' + apartmentsInformation[i].offer.checkin + ', выезд до ' + apartmentsInformation[i].offer.checkout;
  var featureList = popupPin.querySelectorAll('.popup__feature');
  for (var j = 0; j < featureList.length; j++) {
    featureList[j].remove();
  }
  for (j = 0; j < apartmentsInformation[i].offer.features.length; j++) {
    var featuresElm = apartmentsInformation[i].offer.features[j];
    var createLi = document.createElement('li');
    if (featuresElm === 'wifi') {
      popupPin.querySelector('.popup__features').appendChild(createLi).classList.add('popup__feature', 'popup__feature--wifi');
    } else if (featuresElm === 'dishwasher') {
      popupPin.querySelector('.popup__features').appendChild(createLi).classList.add('popup__feature', 'popup__feature--dishwasher');
    } else if (featuresElm === 'parking') {
      popupPin.querySelector('.popup__features').appendChild(createLi).classList.add('popup__feature', 'popup__feature--parking');
    } else if (featuresElm === 'washer') {
      popupPin.querySelector('.popup__features').appendChild(createLi).classList.add('popup__feature', 'popup__feature--washer');
    } else if (featuresElm === 'elevator') {
      popupPin.querySelector('.popup__features').appendChild(createLi).classList.add('popup__feature', 'popup__feature--elevator');
    } else if (featuresElm === 'conditioner') {
      popupPin.querySelector('.popup__features').appendChild(createLi).classList.add('popup__feature', 'popup__feature--conditioner');
    }
  }
  popupPin.querySelector('.popup__description').textContent = apartmentsInformation[i].offer.description;
  var photoElm = popupPin.querySelector('.popup__photos').querySelector('img').cloneNode();
  popupPin.querySelector('.popup__photos').querySelector('img').remove();
  for (j = 0; j < apartmentsInformation[i].offer.photos.length; j++) {
    var newPhotoElm = photoElm.cloneNode();
    popupPin.querySelector('.popup__photos').appendChild(newPhotoElm).src = apartmentsInformation[i].offer.photos[j];
  }
  popupPin.querySelector('.popup__avatar').src = apartmentsInformation[i].author.avatar;
  fragmentPopupPin.appendChild(popupPin);
}
document.querySelector('.map').insertBefore(fragmentPopupPin, popupPinOnMap);
pinOnMap.appendChild(fragmentPin);
