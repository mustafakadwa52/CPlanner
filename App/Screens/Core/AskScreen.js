import React from 'react';
import { View, Text, Alert, StyleSheet,TextInput ,KeyboardAvoidingView,TouchableOpacity} from 'react-native';
import * as firebase from 'firebase';
//import firestore from 'firebase/firestore'
class AskScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      quesTitle:'',
      quesDesc:'',
      //userId:firebase.auth().currentUser.uid,
      userId:firebase.auth().currentUser.email,
      quesTime:new Date(),
      aCount:0,
      quesState:false,
    };
  }
  


  onPostQuestion = ()=>{
    const firestore = firebase.firestore()
    firestore.settings({
      timestampsInSnapshots: true
    })

    //const { navigation } = this.props
    
    firestore.collection("questions").add({
      questitle:this.state.quesTitle,
      quesdesc:this.state.quesDesc,
      userid:this.state.userId,
      questime:this.state.quesTime,
      acount:this.state.aCount,
      qstate:this.state.quesState
    }).then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      /*this.setState({
        quesTitle:'',
        quesDesc:''
      })*/
    }).catch(function(error) {
      console.error("Error adding document: ", error);
    });

    //this.qdesc =""
    //this.qtitle=""
    Alert.alert("Questions Posted! Stay Tuned :) !");
    //clearing textInput fields
    this.qtitle.clear()
    this.qdesc.clear()
    //as we are using Drawer Navigation , the below 2 lines wont work
    //navigate to Top of Stack in the Stack Navigation
    //navigation.popToTop();
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

        <Text style={styles.questitle}> Question Please </Text>

        <TextInput
             style={styles.textinput}
             onChangeText={(test) => this.setState({quesTitle:test})}
             placeholder='title'
             ref={input => {this.qtitle = input} }
        />

        <TextInput
             style={styles.qdescinput}
             onChangeText={(test) => this.setState({quesDesc:test})}
             placeholder='full question in detail ...'
             multiline = {true}
             numberOfLines={5}
             ref={input => {this.qdesc= input}}
        />
        <TouchableOpacity 
          style={styles.postquestion}
          onPress={this.onPostQuestion}>
          <Text style={styles.postquestiontext}> Submit </Text>
       </TouchableOpacity>

      </KeyboardAvoidingView>
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
    questitle:{
      fontSize:35,
      color:'#4F4F4F',
      marginRight: 50,
      paddingBottom: 50,
    },
    textinput:{
      color:'#4F4F4F',
      fontSize:20,
      height: 40,
      width:300,
      borderBottomColor: 'orange',
      borderBottomWidth: 1,
      marginBottom: 30,
    },
    qdescinput:{
      color:'#4F4F4F',
      fontSize:15,
      height: 200,
      width:300,
      borderColor: 'orange',
      borderWidth: 1,
      marginBottom:30,
      padding: 10,
      textAlignVertical: "top"
    },
    postquestion:{
      backgroundColor:'#E8BE8B',
      height: 50,
      width:300,
      alignItems: 'center',
      justifyContent: 'center',
    },
    postquestiontext:{
      fontSize:20,
      color:'#4F4F4F',
    },

  });

export default AskScreen;
