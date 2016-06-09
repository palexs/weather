/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 // ES5:
 // var React = require('react-native');
 // var {
 //   Text,
 //   View,
 //   AppRegistry
 // } = React;

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  MapView
} from 'react-native';

import Api from './src/api';

// ES5: var Weather = React.createClass({...});
class Weather extends Component {
  // ES5:
  // getInitialState() {
  //   return {...};
  // }
  constructor(props) {
    super(props);
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);

    this.state = {
      pin: {
        latitude: 0,
        longitude: 0
      },
      city: '',
      temp: '',
      desc: ''
    };
  }

  // ES5:
  // render: function() { 
  //  return ...
  // }
  render() {
    return (
      <View style = {styles.container}>
        <MapView
          annotations = {[this.state.pin]}
          onRegionChangeComplete = {this.onRegionChangeComplete}
          style = {styles.map}>
        </MapView>
        <View style = {styles.textWrapper}>
          <Text style = {styles.text}>City: {this.state.city}</Text>
          <Text style = {styles.text}>Temperature: {this.state.temp}</Text>
          <Text style = {styles.text}>Description: {this.state.desc}</Text>
        </View>
      </View>
    );
  }

  onRegionChangeComplete(region) {
    this.setState({
      pin: {
        longitude: region.longitude,
        latitude: region.latitude
      }
    });

    Api(region.latitude, region.longitude)
      .then((data) => {
        this.setState(data);
    });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },
  map: {
    flex: 5,
    marginTop: 30
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 15
  }
});

// ES5:
// AppRegistry.registerComponent('weather', function() {
//   return Weather;
// });
AppRegistry.registerComponent('weather', () => Weather);
