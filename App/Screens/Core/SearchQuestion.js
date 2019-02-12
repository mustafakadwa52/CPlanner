import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList, 
  TouchableHighlight,
  Button,
} from 'react-native';
import * as firebase from 'firebase';
//this line is important to atleast execute the intended output
//import 'firebase/firebase-firestore';
//import firebase from 'react-native-firebase';

export default class SearchQuestion extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Text>Inside the Question Search File . Search Text -> {this.props.stext}</Text>
        )
    }
}