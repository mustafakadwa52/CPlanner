import React from 'react';
import { StyleSheet, Text, View , FlatList,TouchableHighlight } from 'react-native';
//import * as firebase from 'firebase';

export default class QuestionList extends React.Component {

  
 constructor(props) {
   super(props);
   this.state = {
   };
 }

 _onPressButton = () =>{
     console.log(this.props.questitle)
     //this.props.navigation.navigate('MeAnswers')
 }


    render() {

      return(
          <TouchableHighlight onPress={this._onPressButton}>
             <Text style={styles.text}>{this.props.questitle}</Text>
          </TouchableHighlight>
     )
    }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    padding:70
  }
});
