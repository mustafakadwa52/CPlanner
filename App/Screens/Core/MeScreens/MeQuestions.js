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
// Initialize Cloud Firestore through Firebase

/*
db.collection("users").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
  });
});
*/
export default class MeQuestions extends React.Component {

  
constructor(props) {
  super(props);
  let curruserid = firebase.auth().currentUser.uid
  let curruseremail = firebase.auth().currentUser.email;
  //for debuging
  //console.log(curruserid)
  const firestore = firebase.firestore();
  // Disable deprecated features
  firestore.settings({
    timestampsInSnapshots: true
  });

  //searching text variables defined
  this.searchText="";//seachtext variable for searching purpose
  this.sText=""

  //database reference
  this.ref = firebase.firestore().collection('questions').where("userid", "==",curruseremail);
  this.unsubscribe = null;
  this.state = {
    qdata: [],
    loading: true,
  };
}

componentDidMount() {
  this.getMeData = this.ref.onSnapshot(this.onCollectionUpdate)  
}
/*
componentWillUnmount() {
  this.unsubscribe();
}
*/

onCollectionUpdate = (querySnapshot) => {
  const qdata = [];
  querySnapshot.forEach((doc) => {
    const { acount,qstate,quesdesc,questime,questitle,userid } = doc.data();
    qdata.push({
      key: doc.id, // Document ID
      acount,
      qstate,
      quesdesc,
      questitle,
      userid,
      questime,
    });
  });
  this.setState({
    qdata,
    loading: false,
 });
 //console.log("Data Fetching")
 //console.log(qdata)
}

onSearchUpdate = (querySnapshot) => {
  const qdata = [];
  querySnapshot.forEach((doc) => {
    const { acount,qstate,quesdesc,questime,questitle,userid } = doc.data();
    //console.log(String(questitle).toLowerCase());
    if( String(questitle).toLowerCase().search(String(this.searchText).toLowerCase())!=-1 || String(quesdesc).toLowerCase().search(String(this.searchText).toLowerCase())!=-1 ){
    qdata.push({
      key: doc.id, // Document ID
      acount,
      qstate,
      quesdesc,
      questitle,
      userid,
      questime,
    });
  }
  });

  this.setState({
    qdata,
    loading: false,
 });
 console.log("Data Fetching")
 //console.log(qdata)
 console.log("Searching Done");
}

searchQuestion(text)//this is the default para, if nothing is passed it takes parameter as 0
{
  //if(text=="") text="0";
  console.log(text)
  this.searchText= text;
  if( String(text)==="" )
    this.getMeData = this.ref.orderBy("questitle").onSnapshot(this.onCollectionUpdate)  
  else
    this.getMeData = this.ref.get().then(this.onSearchUpdate).catch(err => { console.log(err)});
  
  //<SearchQuestion textparam={text}/>
  //let x = firebase.firestore().collection('questions').where('acount','>',Number(text))
  //let s = this.ref.where('acount','>',Number(text)).get().then(this.onCollectionUpdate).catch(err =>{console.log("ERRRRR")})

  
 // this.setState({ref : firebase.firestore().collection('questions').where("acount", "==",0).orderBy("questitle")})
}

//the below variable's method is called by the flatlist in the render() and used to return jsx for the flatlist
_renderItem = ({item}) => (
  /*<QuestionList 
  questitle={item.questitle}/>*/ //this can be used for abstraction

  <View style={styles.questionList}>

    <View style={styles.questionDetail}>
      <View style={styles.questionTitle}>
        <Image 
          source={ (item.acount===0) ? require('../../../../assets/notansweredicon.png') : require('../../../../assets/answeredicon.png')}
          style={styles.questionStatusImage}
         />
         <Text style={ (item.acount===0) ? styles.questionTitleTextNA : styles.questionTitleText }>   {item.questitle}</Text>
        </View> 
        <View style={styles.questionDescription}>
        <Text style={styles.questionDescriptionText}>{item.quesdesc}</Text>
        </View> 
        <View style={styles.metaDetails}>
          <Text style={styles.metaUser}>{item.userid}</Text>
          <Text style={styles.metaDate}>{item.questime.toDate().toString()}</Text>
        </View>
      </View>          
      <Button title="View" style={styles.nextButton} onPress={ () => this.props.navigation.navigate('QuestionDetails', {
                acount: item.acount,
                userid : item.userid,
                questime: item.questime.toDate().toString(),
                questitle: item.questitle,
                quesdesc: item.quesdesc,
                docid: item.key,
        }) } />
    </View>

)

//renderItem={({item}) => <Text>{item.questitle}</Text>}
  render() {
    
    //we will return the question answered by the current logged in user  
    if (this.state.loading) {
        return null;
    } // or render a loading icon     
    return (
      <View style={styles.container}>
        <ScrollView>

          <View style={styles.searchBar}>
                  <Image 
                      source={require('../../../../assets/searchicon.png')}
                      style={styles.searchImage}
                  />
                  <TextInput
                      style={{paddingLeft:10,width:"70%",}}
                      placeholder='Search'
                      //onChangeText={(text) => this.sText = text}
                      onChangeText={ (text) => (String(text)==="")? (this.getMeData = this.ref.orderBy("questitle").onSnapshot(this.onCollectionUpdate)) : (this.sText = text) }
                      //we can also implement this without the button by removing the button below and appending the onPress code to onChangeText
                  />
                  
                  <Button 
                  title="Search"
                  style={{}} 
                  onPress={ () => this.searchQuestion(this.sText)} 
                  />
          </View>

          <FlatList
          data={this.state.qdata}
          renderItem={this._renderItem}
          />
          <Text>{console.log(this.state.qdata)}</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  searchBar: {
    margin:30,
    alignItems:"center",
    borderBottomColor:"orange",
    borderBottomWidth:2,
    flexDirection:'row',
  },
  searchImage: {
    height:20,
    width:20,
  },
  questionList: {
    paddingTop:10,
    textAlign:'center',
    borderBottomColor:"orange",
    borderBottomWidth:2,
    borderTopColor:"orange",
    borderTopWidth:2,
  },
  questionDetail: {
    padding:10,
  },
  questionTitle:{
    borderBottomColor:"orange",
    borderBottomWidth:2,
    flexDirection:'row',
  },
  questionStatusImage: {
    height:20,
    width: 20,
    padding:10,
  },
  questionTitleText: {
    color:"blue",
  },
  questionTitleTextNA: {
    color:"green",
  },
  questionDescription: {
    flexDirection:'row',
    paddingTop:10,
    flex:1,
    alignItems:"center",
  },
  questionDescriptionText: {
    color:"blue",
  },
  metaDetails: {
    flexDirection:'row',flex:1,paddingTop:10  
  },
  metaUser: {
    color:"blue",
    fontSize:8,
  },
  metaDate: {
    flex:1,
    fontSize:8,
    textAlign:"right",
  },
  nextButton:{
    justifyContent:"flex-end"
  }
  
});
