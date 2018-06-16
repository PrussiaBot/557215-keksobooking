'use strict';
var quantityApartament = 8;
var apartamentsTitle = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var randomNumber = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};
var randomizeValue = function (quantity, apartmentsDescription) {
  var randomApartmentsInformation = [];
  for (var i = 0; i < quantity; i++) {
    var randomType = randomNumber(1, 4);
    if (randomType === 1) {
      randomType = 'flat';
    } else if (randomType === 2) {
      randomType = 'place';
    } else if (randomType === 3) {
      randomType = 'house';
    } else {
      randomType = 'bungalo';
    }
    var randomRoom = randomNumber(1, 4);
    if (randomRoom === 4) {
      randomRoom = 100;
    }
    var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    var photoList = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg'];
    var featuresValue = [];
    var featuresValueLength = randomNumber(1, 6);
    var compareRandom = function () {
      return Math.random() - 0.5;
    };
    featuresList.sort(compareRandom);
    photoList.sort(compareRandom);
    for (var j = 0; j < featuresValueLength; j++) {
      featuresValue[j] = featuresList [j];
    }
    var apartamentInformaton = {
      'author': {
        'avatar': 'img/avatars/user0' + randomNumber(1, quantity) + '.png'
      },
      'offer': {
        'title': apartmentsDescription[randomNumber(1, quantity)],
        'address': randomNumber(100, 1000) + ', ' + randomNumber(100, 1000),
        'price': randomNumber(1000, 1000000),
        'type': randomType,
        'rooms': randomRoom,
        'guests': randomNumber(0, 3),
        'checkin': randomNumber(12, 14) + ':00',
        'checkout': randomNumber(12, 14) + ':00',
        'features': featuresValue,
        'description': '',
        'photos': photoList
      },
      'location': {
        'x': randomNumber(300, 900),
        'y': randomNumber(130, 160)
      }
    };
    randomApartmentsInformation[i] = apartamentInformaton;
  }
  return randomApartmentsInformation;
};
var apartmentsInformation = randomizeValue(quantityApartament, apartamentsTitle);
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
  popupPin.querySelector('.popup__text--address').textContent = apartmentsInformation[i].offer.address;
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
