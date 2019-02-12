import React from 'react';
import { View, Text, Alert, StyleSheet,TextInput ,KeyboardAvoidingView,TouchableOpacity} from 'react-native';
import * as firebase from 'firebase';
//import firestore from 'firebase/firestore'
class AnswerQuestion extends React.Component {

  constructor(props) {
    super(props);
    this.ans="";
    this.state = {
      answer:'',
      //userId:firebase.auth().currentUser.uid,
      userId:firebase.auth().currentUser.email,
      ansTime:new Date(),
      aCount:0,
      quesState:false,
    };
  }
  
  


  onPostQuestion = ()=>{
    const { navigation } = this.props
    const docid = navigation.getParam("docid","No Doc Id or Question ID")
    const firestore = firebase.firestore()
    firestore.settings({
      timestampsInSnapshots: true
    })
    //adding a new answer document
    firestore.collection("answers").add({
      ans:this.state.answer,
      userid:this.state.userId,
      anstime:this.state.ansTime,
      qid:docid,

    }).then(function(docRef) {
        
      console.log("Document written with ID: ", docRef.id);

      var quesref = firebase.firestore().collection('questions').doc(docid);

      quesref.get().then(function(doc) {
        const aCount = doc.data().acount + 1
        console.log(aCount)
        quesref.update({ acount:aCount })

      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
      
    }).catch(function(error) {
      console.error("Error adding document: ", error);
    });

    //getting and updating the acount in the question document
    //const quesdata = firestore.collection('questions').doc(docid)
    /*var ac=0;
    var getacount = quesdata.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        //console.log('Document data:', doc.data());//working
        ac = doc.data().acount
        console.log("Acount-> " +ac)
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
    quesdata.update({ acount:1 })//this line is important and working. issue is how to fetch existing acount and then increment
    console.log("Acount Updated in Question Document "+docid)
    //console.log("Answer Count Updated to " +quesdata.get() +" for doc id" +docid)
    //this.qdesc =""
    //this.qtitle=""
    */
    Alert.alert("Answered !");

    //clearing textfields
    this.ans.clear()
    //navigate to Top of Stack in the Stack Navigation
    navigation.popToTop();
    
    
  }

  render() {

    //const { navigation } = this.props
    //const questitle = navigation.getParam("questitle","No Question Title")
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

        {/*<Text style={styles.questitle}> {questitle} </Text>*/}
        <Text style={styles.questitle}> Your Answer ... </Text>
        <TextInput
             style={styles.qdescinput}
             onChangeText={(test) => this.setState({answer:test})}
             placeholder='Type Your Answer Here'
             multiline = {true}
             numberOfLines={5}
             ref={input => {this.ans=input}}
        />
        <TouchableOpacity 
          style={styles.postquestion}
          onPress={this.onPostQuestion}>
          <Text style={styles.postquestiontext}> Submit Answer </Text>
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

export default AnswerQuestion;
