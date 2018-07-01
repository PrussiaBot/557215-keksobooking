'use strict';

var QUANTITY_APARTMENT = 8;
var APARTMENTS_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTO_LIST = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var TYPES_TRANSLATE_MAP = {
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};
var MAP = document.querySelector('.map');
var TEMPLATE_OFFER = document.querySelector('template');
var TEMPLATE_PIN = TEMPLATE_OFFER.content.querySelector('.map__pin');
var TEMPLATE_POPUP_PIN = TEMPLATE_OFFER.content.querySelector('.map__card');
var MAP_MIN_Y = 130;
var MAP_MAX_Y = 630;
var MAP_MAX_X = MAP.offsetWidth;

// Взято из учебника learn.javascript (https://learn.javascript.ru/task/random-int-min-max)
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
var generationOffers = function (apartmentsDescription, position) {
  mixingArrayMeanings(apartmentsDescription);
  var avatarPath = generationAvatarPath(8);
  var apartmentInformation = {
    'author': {
      'avatar': avatarPath[position]
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
      'features': generationRandomFeatures(FEATURES_LIST, FEATURES_LIST.length),
      'description': '',
      'photos': mixingArrayMeanings(PHOTO_LIST)
    },
    'location': {
      'x': randomNumber(0, MAP_MAX_X),
      'y': randomNumber(MAP_MIN_Y, MAP_MAX_Y)
    }
  };
  return apartmentInformation;
};
var generationAllOffers = function (quantity, apartmentsDescription) {
  var arrayOffers = [];
  for (var i = 0; i < quantity; i++) {
    arrayOffers[i] = generationOffers(apartmentsDescription, i);
  }
  return arrayOffers;
};

var apartmentsInformation = generationAllOffers(QUANTITY_APARTMENT, APARTMENTS_TITLE);
var generationTypeName = function (array, arrayPosition) {
  if (array[arrayPosition].offer.type === 'flat') {
    return TYPES_TRANSLATE_MAP['flat'];
  } else if (array[arrayPosition].offer.type === 'place') {
    return TYPES_TRANSLATE_MAP['place'];
  } else if (array[arrayPosition].offer.type === 'house') {
    return TYPES_TRANSLATE_MAP['house'];
  } else {
    return TYPES_TRANSLATE_MAP['bungalo'];
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
var deleteChild = function (element, className) {
  var parent = element.querySelector(className);
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};
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
var createPhoto = function (array, arrayPosition, element, className) {
  var parentPhoto = element.querySelector(className);
  var photoElm = parentPhoto.querySelector('img').cloneNode();
  deleteChild(element, className);
  for (var i = 0; i < array[arrayPosition].offer.photos.length; i++) {
    var newPhotoElm = photoElm.cloneNode();
    element.querySelector(className).appendChild(newPhotoElm).src = array[arrayPosition].offer.photos[i];
  }
};
var createPin = function (arrayApartment, position) {
  var elementPin = TEMPLATE_PIN.cloneNode(true);
  var elementPinImg = elementPin.querySelector('img');
  var pinHeight = elementPinImg.height;
  var pinWidth = elementPinImg.width;
  elementPin.style.left = (arrayApartment[position].location.x - pinWidth / 2) + 'px';
  elementPin.style.top = (arrayApartment[position].location.y - pinHeight) + 'px';
  elementPinImg.src = arrayApartment[position].author.avatar;
  elementPinImg.alt = arrayApartment[position].offer.title;
  return elementPin;
};
var createPopupPin = function (arrayApartment, position) {
  var popupPin = TEMPLATE_POPUP_PIN.cloneNode(true);
  popupPin.querySelector('.popup__title').textContent = arrayApartment[position].offer.title;
  popupPin.querySelector('.popup__text--address').textContent = arrayApartment[position].offer.address;
  popupPin.querySelector('.popup__text--price').innerHTML = arrayApartment[position].offer.price + ' ' + '&#x20bd;' + '<span>/ночь</span>';
  popupPin.querySelector('.popup__type').textContent = generationTypeName(arrayApartment, position);
  popupPin.querySelector('.popup__text--capacity').textContent = arrayApartment[position].offer.rooms + generationRoomsEnding(arrayApartment, position) + generationGuestsEnding(arrayApartment, position);
  popupPin.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrayApartment[position].offer.checkin + ', выезд до ' + arrayApartment[position].offer.checkout;
  deleteChild(popupPin, '.popup__features');
  createFeatures(arrayApartment, position, popupPin, '.popup__features');
  popupPin.querySelector('.popup__description').textContent = arrayApartment[position].offer.description;
  createPhoto(arrayApartment, position, popupPin, '.popup__photos');
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

var MAP_FORM = document.querySelector('.ad-form');
var MAP_FORM_INPUT = MAP_FORM.querySelectorAll('input');
var MAP_FORM_SELECT = MAP_FORM.querySelectorAll('select');
var MAP_FORM_TEXTAREA = MAP_FORM.querySelectorAll('textarea');
var MAIN_PIN_MUFFIN = document.querySelector('.map__pin--main');
var FIELD_ADDRESS = document.getElementById('address');
var FORM_SELECT_TYPE = document.getElementById('type');
var FORM_SELECT_ROOM = document.getElementById('room_number');
var FORM_SELECT_CAPACITY = document.getElementById('capacity');
var FORM_FIELD_PRICE = document.getElementById('price');
var capacityOptions = FORM_SELECT_CAPACITY.querySelectorAll('option');
var selectedOptionPrice = function () {
  if (FORM_SELECT_TYPE.selectedIndex === 0){
    FORM_FIELD_PRICE.min = 0;
    FORM_FIELD_PRICE.placeholder = 0;
  } else if (FORM_SELECT_TYPE.selectedIndex === 1){
    FORM_FIELD_PRICE.min = 1000;
    FORM_FIELD_PRICE.placeholder = 1000;
  } else if (FORM_SELECT_TYPE.selectedIndex === 2) {
    FORM_FIELD_PRICE.min = 5000;
    FORM_FIELD_PRICE.placeholder = 5000;
  } else {
    FORM_FIELD_PRICE.min = 10000;
    FORM_FIELD_PRICE.placeholder = 10000;
  }
};
var selectedOptionRoom = function () {
  if(FORM_SELECT_ROOM.selectedIndex === 0){
    capacityOptions[0].setAttribute('disabled', 'disabled');
    capacityOptions[1].setAttribute('disabled', 'disabled');
    capacityOptions[2].removeAttribute('disabled')
    capacityOptions[3].setAttribute('disabled', 'disabled');
  } else if (FORM_SELECT_ROOM.selectedIndex === 1) {
    capacityOptions[0].setAttribute('disabled', 'disabled');
    capacityOptions[1].removeAttribute('disabled');
    capacityOptions[2].removeAttribute('disabled');
    capacityOptions[3].setAttribute('disabled', 'disabled');
  } else if (FORM_SELECT_ROOM.selectedIndex === 2) {
    capacityOptions[0].removeAttribute('disabled');
    capacityOptions[1].removeAttribute('disabled');
    capacityOptions[2].removeAttribute('disabled');
    capacityOptions[3].setAttribute('disabled', 'disabled');
  } else {
    capacityOptions[0].setAttribute('disabled', 'disabled');
    capacityOptions[1].setAttribute('disabled', 'disabled');
    capacityOptions[2].setAttribute('disabled', 'disabled');
    capacityOptions[3].removeAttribute('disabled');
  }
};
var disabledForm = function (array) {
  for (var i = 0; i < array.length; i++) {
    array[i].setAttribute('disabled', 'disabled');
  }
};
var formIncluded = function (array) {
  for (var i = 0; i < array.length; i++) {
    array[i].removeAttribute('disabled');
  }
};
var showPopup = function (parentElement, element, position) {
  var pin = element[position];
  pin.name = position - 1;
  pin.addEventListener('click', function () {
    if (parentElement.querySelector('.map__card')) {
      parentElement.querySelector('.map__card').remove();
    }
    renderPopupPin(apartmentsInformation, '.map__filters-container', '.map', pin.name);
    var popupClose = MAP.querySelector('.popup__close');
    popupClose.addEventListener('click', function () {
      MAP.querySelector('.map__card').remove();
    });
  });
};
var generateCoordinatesMainPinOnStart = function (element, field) {
  var posX = element.offsetTop;
  var posY = element.offsetLeft;
  var elmWidth = element.offsetWidth;
  var elmHeight = element.offsetHeight;
  field.value = (posX - elmWidth / 2) + ', ' + (posY - elmHeight / 2);
};
var generateCoordinatesMainPin = function (element, field) {
  var posX = element.offsetTop;
  var posY = element.offsetLeft;
  var elmWidth = element.offsetWidth;
  var elmHeight = element.offsetHeight;
  field.value = (posX - elmWidth / 2) + ', ' + (posY - elmHeight);
};
var startKeks = function () {
  MAP.classList.remove('map--faded');
  MAP_FORM.classList.remove('ad-form--disabled');
  formIncluded(MAP_FORM_INPUT);
  formIncluded(MAP_FORM_SELECT);
  formIncluded(MAP_FORM_TEXTAREA);
  renderPin(apartmentsInformation, '.map__pins');
  generateCoordinatesMainPinOnStart(MAIN_PIN_MUFFIN, FIELD_ADDRESS);
  MAIN_PIN_MUFFIN.removeEventListener('mouseup', startKeks);
  MAIN_PIN_MUFFIN.addEventListener('mouseup', function () {
    generateCoordinatesMainPin(MAIN_PIN_MUFFIN, FIELD_ADDRESS);
  });
  var allPinsOnMap = document.querySelectorAll('.map__pin');
  for (var i = 1; i < allPinsOnMap.length; i++) {
    showPopup(MAP, allPinsOnMap, i);
  }
};
MAP.classList.add('map--faded');
MAP_FORM.classList.add('ad-form--disabled');
disabledForm(MAP_FORM_INPUT);
disabledForm(MAP_FORM_SELECT);
disabledForm(MAP_FORM_TEXTAREA);
MAIN_PIN_MUFFIN.addEventListener('mouseup', startKeks);
MAP_FORM.onchange = function(e) {
  this.timein.value = e.target.value;
  this.timeout.value = e.target.value;
};


