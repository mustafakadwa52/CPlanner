
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
  TouchableOpacity,
} from 'react-native';
import * as firebase from 'firebase';
//this line is important to atleast execute the intended output
//import 'firebase/firebase-firestore';
//import firebase from 'react-native-firebase';
import SearchQuestion from './SearchQuestion'

export default class AnswerScreen extends React.Component {

  constructor() {
    super();
    //let curruserid = firebase.auth().currentUser.uid
    //firebase.auth().currentUser.email
    //for debuging
    //console.log(curruserid)
    const firestore = firebase.firestore();
    // Disable deprecated features
    firestore.settings({
      timestampsInSnapshots: true,
    });
    //database reference
    //this.ref = firebase.firestore().collection('questions').orderBy("questitle").limit(5);//for limiting the document fetched
    this.ref = firebase.firestore().collection('questions')//fetching The question Collection

    this.searchText="";//seachtext variable for searching purpose
    this.sText=""

    this.unsubscribe = null;  
    this.state = {
      qdata: [],
      loading: true,
      //ref : firebase.firestore().collection('questions').orderBy("questitle"),//fetching all docs ordered by questitle
    };
  }

  
  componentDidMount() {

    this.getMeData = this.ref.orderBy("questitle").onSnapshot(this.onCollectionUpdate)  
    
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
   //console.log("Data Fetching")
   //console.log(qdata)
   console.log("Searching Done");
  }

  static navigationOptions = {
    header: null,
  };

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


  render() {
    //console.log(firebase.auth().currentUser.displayName +" " +typeof(firebase.auth().currentUser.displayName))
      /*let user = "Default";
      let currDate = "12-12-2018";
      let qatitle="Some Title";
      let qadesc="Some Description about the question and its corrosponding answerXD";*/
      //let x = new firebase.firestore.Timestamp()
      //console.log(x.toDate.toString)
      /*
      let output=;
      for (let i=0;i<10;i++){
        output = output+ <View>asdasdasfvdik</View>
      }
      return(output)
      */
     

      //remove comment once fixed  
    /*console.log(firebase.auth().currentUser);
    var numberOfQuestions=0;
    //some warning messages are displayed after the following data is collected from questions Collection
    let db = firebase.firestore();
     db.collection('questions').get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.id, '=>', doc.data());
        });
      });
      db.collection('questions').get().then((sn) => {console.log("Number of Question Docs: " +sn.size)});
     //const s = db.collection('questions').get().then((sn) => {sn.isEqual()})
 
     */

     /*
     <TouchableOpacity 
          style={styles.menuButton}
          onPress={()=>this.props.navigation.openDrawer()}>
       
          <Image 
                    source={require('../../../assets/menu.png')}
                    style={styles.menuButtonImage}
                />
      </TouchableOpacity>

      */ 
     // top ^ is code for draw open 

      return (

      <View style={styles.container}>
    
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>


          <View style={styles.searchBar}>
                <Image 
                    source={require('../../../assets/searchicon.png')}
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
          renderItem={({item}) => 
            <TouchableHighlight onpress={ () => console.log("Area Pressed")}>
              <View style={styles.questionList}>

                <View style={styles.questionDetail}>
                  <View style={styles.questionTitle}>
                    <Image 
                        source={ (item.acount===0) ? require('../../../assets/notansweredicon.png') : require('../../../assets/answeredicon.png')}
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
              <Button title="open" style={styles.nextButton} onPress={ () => this.props.navigation.navigate('QuestionDetails', {
                acount: item.acount,
                userid : item.userid,
                questime: item.questime.toDate().toString(),
                questitle: item.questitle,
                quesdesc: item.quesdesc,
                docid: item.key,
              }) } />
              </View>
           </TouchableHighlight>
          }
          />

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
  },
  menuButton:{
    width:30,
    alignItems: 'flex-end',
    marginLeft:30,
    marginTop:10
  },
  menuButtonImage:{
    height:40,
    width:50,
    resizeMode: 'contain'
  }
  
});

