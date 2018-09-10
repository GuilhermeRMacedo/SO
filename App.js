import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from './src/Components/Header'
import Inputs from './src/Components/Inputs'
import Buttons from './src/Components/Buttons'

export default class App extends React.Component {
  state={
    
  }

  render() {
    return (
      <View style={styles.mom}>
        <Header />
        <Inputs />
        <Buttons />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mom: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#800080'
  }
});
