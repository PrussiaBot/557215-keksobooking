'use strict';

var quantityApartment = 8;
var apartmentsTitle = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photoList = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg'];
var randomNumber = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};
var mixingArrayMeanings = function (array) {
  var compareRandom = function () {
    return Math.random() - 0.5;
  };
  return array.sort(compareRandom);
};
var generationLongNumber = function (number, lengthNumber) {
  var numberLine = '' + number;
  var lengthNumberLine = '' + lengthNumber;
  if (numberLine.length < lengthNumberLine) {
    var quantityZero = lengthNumber - numberLine.length;
    var zero = '';
    for (var i = 1; i < quantityZero; i++) {
      zero += '0';
    }
    return zero + number;
  } else {
    return number;
  }
};
var generationAvatarPath = function (quantity) {
  var arrayAvatarPath = [];
  for (var i = 0; i < quantity; i++) {
    arrayAvatarPath[i] = 'img/avatars/user0' + generationLongNumber(i + 1, 2) + '.png';
  }
  return arrayAvatarPath;
};
var generationRandomType = function () {
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
  return randomType;
};
var generationRandomFeatures = function (array, arrayLength) {
  mixingArrayMeanings(array);
  var featuresValue = [];
  var featuresValueLength = randomNumber(1, arrayLength);
  for (var j = 0; j < featuresValueLength; j++) {
    featuresValue[j] = array[j];
  }
  return featuresValue;
};
var generationRandomRooms = function () {
  var randomRoom = randomNumber(1, 4);
  if (randomRoom === 4) {
    randomRoom = 100;
  }
  return randomRoom;
};
var generationOffers = function (apartmentsDescription) {
  mixingArrayMeanings(apartmentsDescription);
  var avatarPath = generationAvatarPath(8);
  var apartmentInformation = {
    'author': {
      'avatar': avatarPath[randomNumber(0, avatarPath.length - 1)]
    },
    'offer': {
      'title': apartmentsDescription[0],
      'address': randomNumber(100, 1000) + ', ' + randomNumber(100, 1000),
      'price': randomNumber(1000, 1000000),
      'type': generationRandomType(),
      'rooms': generationRandomRooms(),
      'guests': randomNumber(0, 3),
      'checkin': randomNumber(12, 14) + ':00',
      'checkout': randomNumber(12, 14) + ':00',
      'features': generationRandomFeatures(featuresList, featuresList.length),
      'description': '',
      'photos': mixingArrayMeanings(photoList)
    },
    'location': {
      'x': randomNumber(300, 900),
      'y': randomNumber(130, 160)
    }
  };
  return apartmentInformation;
};
var generationAllOffers = function (quantity, apartmentsDescription) {
  var arrayOffers = [];
  for (var i = 0; i < quantity; i++) {
    arrayOffers[i] = generationOffers(apartmentsDescription);
  }
  return arrayOffers;
};

var apartmentsInformation = generationAllOffers(quantityApartment, apartmentsTitle);
var templateOffer = document.querySelector('template');
var templatePin = templateOffer.content.querySelector('.map__pin');
var templatePopupPin = templateOffer.content.querySelector('.map__card');
var generationTypeName = function (array, arrayPosition) {
  if (array[arrayPosition].offer.type === 'flat') {
    return 'Квартира';
  } else if (array[arrayPosition].offer.type === 'place') {
    return 'Дворец';
  } else if (array[arrayPosition].offer.type === 'house') {
    return 'Дом';
  } else {
    return 'Бунгало';
  }
};
var generationRoomsEnding = function (array, arrayPosition) {
  if (array[arrayPosition].offer.rooms === 1) {
    return ' комната';
  } else if (array[arrayPosition].offer.rooms === 2 || array[arrayPosition].offer.rooms === 3) {
    return ' комнаты';
  } else {
    return ' комнат';
  }
};
var generationGuestsEnding = function (array, arrayPosition) {
  if (array[arrayPosition].offer.guests === 1) {
    return ' для ' + array[arrayPosition].offer.guests + ' гостя';
  } else if (array[arrayPosition].offer.guests) {
    return ' для ' + array[arrayPosition].offer.guests + ' гостей';
  } else {
    return ' не для гостей';
  }
};
// var deleteChild = function (element, className){
//   var parent = element.querySelector(className);
//   while (parent.firstChild){
//     parent.removeChild(parent.firstChild);
//   }
// }; Ошибка: Cannot read property 'lastChild' of null
var createFeatures = function (array, arrayPosition, element, className) {
  for (var i = 0; i < array[arrayPosition].offer.features.length; i++) {
    var featuresElm = array[arrayPosition].offer.features[i];
    var createLi = document.createElement('li');
    if (featuresElm === 'wifi') {
      element.querySelector(className).appendChild(createLi).classList.add('popup__feature', 'popup__feature--wifi');
    } else if (featuresElm === 'dishwasher') {
      element.querySelector(className).appendChild(createLi).classList.add('popup__feature', 'popup__feature--dishwasher');
    } else if (featuresElm === 'parking') {
      element.querySelector(className).appendChild(createLi).classList.add('popup__feature', 'popup__feature--parking');
    } else if (featuresElm === 'washer') {
      element.querySelector(className).appendChild(createLi).classList.add('popup__feature', 'popup__feature--washer');
    } else if (featuresElm === 'elevator') {
      element.querySelector(className).appendChild(createLi).classList.add('popup__feature', 'popup__feature--elevator');
    } else if (featuresElm === 'conditioner') {
      element.querySelector(className).appendChild(createLi).classList.add('popup__feature', 'popup__feature--conditioner');
    }
  }
};
// var createPhoto = function (array, arrayPosition, element, className) {
//   var photoParent = element.querySelector(className);
//   var photoElm = photoParent.querySelector('img').cloneNode();
//   deleteChild(photoParent, className);
//   for (i = 0; i < array[arrayPosition].offer.photos.length; i++) {
//     var newPhotoElm = photoElm.cloneNode();
//     return element.querySelector(className).appendChild(newPhotoElm).src = array[arrayPosition].offer.photos[i];
//   }
// } Не работает из-за отсутсвия функции deleteChild
var createPin = function (arrayApartment, position) {
  var elementPin = templatePin.cloneNode(true);
  var elementPinImg = elementPin.querySelector('img');
  elementPin.style.left = arrayApartment[position].location.x + 'px';
  elementPin.style.top = arrayApartment[position].location.y + 'px';
  elementPinImg.src = arrayApartment[position].author.avatar;
  elementPinImg.alt = arrayApartment[position].offer.title;
  return elementPin;
};
var createPopupPin = function (arrayApartment, position) {
  var popupPin = templatePopupPin.cloneNode(true);
  popupPin.querySelector('.popup__title').textContent = arrayApartment[position].offer.title;
  popupPin.querySelector('.popup__text--address').textContent = arrayApartment[position].offer.address;
  popupPin.querySelector('.popup__text--price').innerHTML = arrayApartment[position].offer.price + ' ' + '&#x20bd;' + '<span>/ночь</span>';
  popupPin.querySelector('.popup__type').textContent = generationTypeName(arrayApartment, position);
  popupPin.querySelector('.popup__text--capacity').textContent = arrayApartment[position].offer.rooms + generationRoomsEnding(arrayApartment, position) + generationGuestsEnding(arrayApartment, position);
  popupPin.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrayApartment[position].offer.checkin + ', выезд до ' + arrayApartment[position].offer.checkout;
  // deleteChild(popupPin, '.popup__features');
  var parent = popupPin.querySelector('.popup__features');
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
  createFeatures(arrayApartment, position, popupPin, '.popup__features');
  popupPin.querySelector('.popup__description').textContent = arrayApartment[position].offer.description;
  // createPhoto(arrayApartment, position, popupPin, '.popup__photos');
  var photoParent = popupPin.querySelector('.popup__photos');
  var photoElm = photoParent.querySelector('img').cloneNode();
  var parentPhoto = popupPin.querySelector('.popup__photos');
  while (parentPhoto.firstChild) {
    parentPhoto.removeChild(parentPhoto.firstChild);
  }
  for (var i = 0; i < arrayApartment[position].offer.photos.length; i++) {
    var newPhotoElm = photoElm.cloneNode();
    popupPin.querySelector('.popup__photos').appendChild(newPhotoElm).src = arrayApartment[position].offer.photos[i];
  }
  popupPin.querySelector('.popup__avatar').src = arrayApartment[position].author.avatar;
  return popupPin;
};
var renderPin = function (arrayApartment, classListParent) {
  var pinOnMap = document.querySelector(classListParent);
  var fragmentPin = document.createDocumentFragment();
  for (var i = 0; i < arrayApartment.length; i++) {
    var pin = createPin(arrayApartment, i);
    fragmentPin.appendChild(pin);
  }
  pinOnMap.appendChild(fragmentPin);
};
var renderPopupPin = function (arrayApartment, classListElmAfter, classListParent, offerNumber) {
  var popupPinOnMap = document.querySelector(classListElmAfter);
  var popupPin = createPopupPin(arrayApartment, offerNumber);
  document.querySelector(classListParent).insertBefore(popupPin, popupPinOnMap);
};

renderPin(apartmentsInformation, '.map__pins');
renderPopupPin(apartmentsInformation, '.map__filters-container', '.map', 0);
