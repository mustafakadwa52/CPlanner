import React from 'react';
import { StyleSheet, Text, View , FlatList } from 'react-native';
//import * as firebase from 'firebase';

export default class AnswerListScreen extends React.Component {

  
constructor(props) {
  super(props);
  this.state = {
  };
}


  render() {

    
    return (
        <Text>AnswerListScreen</Text>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});