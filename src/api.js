import _ from 'lodash';

var rootUrl = 'http://api.openweathermap.org/data/2.5/weather?appid=f9e59b218d760e5adb7a9bee81414683'

var kelvinToF = (kelvin) => {
  return Math.round(kelvin - 273.15) + '˚C'
};

module.exports = (latitude, longitude) => {
  var url = `${rootUrl}&lat=${latitude}&lon=${longitude}`;

  return fetch(url)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      return {
        city: json.name,
        temp: kelvinToF(json.main.temp),
        desc: _.capitalize(json.weather[0].description)
      }
    });
    // .catch((error) => {
    //   console.warn(error);
    // });
};
