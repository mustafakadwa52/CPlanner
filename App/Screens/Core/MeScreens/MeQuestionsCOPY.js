import React from 'react'
import {   
    Text,  
    View,
    FlatList,
    StyleSheet,
    Button,
    ActivityIndicator,
  } from 'react-native';
  import * as firebase from 'firebase';
class MeQuestion extends React.Component {

  
   constructor(props) {
     super(props);
     let curruserid = firebase.auth().currentUser.uid
     console.log(curruserid)
     const firestore = firebase.firestore();
     const settings = {timestampsInSnapshots: true};
     firestore.settings(settings);
     this.ref = firebase.firestore().collection('questions').where("userid", "==",curruserid)
     this.state = {
       qdata: [],
       loading: true,
     };
  }

  componentDidMount() {

    onCollectionUpdate = (querySnapshot) => {
      const qdata = [];
      querySnapshot.forEach((doc) => {
        const {questitle,quesdesc,userid,questime} = doc.data();
        qdata.push({
        key: doc.id,
        questitle,
        quesdesc,
        userid,
        questime,
        });
      });
      (qdata) => this.setState({
        qdata:qdata,
        loading: false,
      })     
    }

  }
  

  printMeQuestion =()=>{
    console.log(this.state.qdata)
   /* 
  getMeQuestion = () =>{
    console.log('getquestion')
  }
  <Button onPress={this.getMeQuestion} title="get questions" />
   if (this.state.loading) {
    return <ActivityIndicator size="large" />;
  }
  */
}
render() {

  if(this.state.loading){
    return(
      <View><Text>Loading</Text></View>
    )
  }

  return (

    <View style={styles.container}>
      <View >
        <Text >Fakestagram</Text>
      </View>
      <FlatList
        data={this.state.qdata}
        renderItem={({ item }) => <View>{item.key}</View>}
      />
      <Button onPress={this.printMeQuestion} title="get questions" />
    </View>
  );
}
}

export default MeQuestion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})