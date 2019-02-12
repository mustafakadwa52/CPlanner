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

export default class AnswerListScreen extends React.Component {

    constructor() {
        super();
        //let curruserid = firebase.auth().currentUser.uid
        //firebase.auth().currentUser.email
        //for debuging
        //console.log(curruserid)
        const firestore = firebase.firestore();
        // Disable deprecated features
        firestore.settings({
          timestampsInSnapshots: true
        });
        //database reference
        //this.ref = firebase.firestore().collection('questions').orderBy("questitle").limit(5);//for limiting the document fetched
        this.state = {
          adata: [],
        };
      }
      
      componentDidMount() {
        const { navigation } = this.props
        const docid = navigation.getParam("docid","No Doc Id or Question ID")
        this.ref = firebase.firestore().collection('answers').where("qid", "==",docid)//fetching all docs ordered by questitle 
        this.getMeData = this.ref.onSnapshot(this.onCollectionUpdate)  
      }
      /*
      componentWillUnmount() {
        this.unsubscribe();
      }
      */
      
      onCollectionUpdate = (querySnapshot) => {
        const adata = [];
        querySnapshot.forEach((doc) => {
          const { anstime,qid,ans,userid } = doc.data();
          adata.push({
            key: doc.id, // Document ID
            ans,
            anstime,
            qid,
            userid,
          });
        });
        this.setState({
          adata,
       });
      
      }

    render(){

        const { navigation } = this.props
        const acount = navigation.getParam("acount",0)
        const questitle = navigation.getParam("questitle","No Title")
        const quesdesc = navigation.getParam("quesdesc","No Description")
        const questime = navigation.getParam("questime","No Time")
        const userid = navigation.getParam("userid","No User Selected")
        const docid = navigation.getParam("docid","No Doc Id or Question ID")
        /*
        <Text style={styles.questitle}> Question Please </Text>

        <TextInput
             style={styles.textinput}
             onChangeText={(test) => this.setState({quesTitle:test})}
             placeholder='title'
             ref={this.qtitle}
        />

        <TextInput
             style={styles.qdescinput}
             onChangeText={(test) => this.setState({quesDesc:test})}
             placeholder='full question in detail ...'
             multiline = {true}
             numberOfLines={5}
             ref={this.qdesc}
        />
        */
        return(
            <View style={styles.container}>
              <ScrollView>
                  <View style={{flex:1,padding:10,alignItems:"center",textAlign:"center",}}>
                    <Text style={{fontSize:18,fontWeight:"bold",color:"gray"}}>{questitle}?</Text>
                  </View>
                  <View style={{flex:1,alignItems:"flex-end"}}>
                      <Text style={{color:"blue",fontSize:8}}>By:{userid}</Text>
                      <Text style={{color:"green",fontSize:8}}>Posted: {questime}</Text>
                  </View>

                  <View style={{margin:20,padding:30,borderWidth:2,borderColor:"blue"}}>
                    <Text style={{fontSize:12,textAlign:"left",color:"purple"}}>{quesdesc}</Text>
                  </View>
                  
                  <View style={{padding:15}}>
                    <View style={{flexDirection:"row"}}>
                      <Text style={{color:"red",fontSize:16,fontWeight:"bold"}}>Answer Below</Text>
                      <Text style={{flex:1,textAlign:"right",fontSize:8,paddingTop:10,color:"green"}}>Answers Count: {acount}</Text>
                    </View>
                    <ScrollView>
                      <FlatList
                      data={this.state.adata}
                      renderItem={({item}) =>
                      <View style={{paddingTop:10,flexDirection:"column",borderBottomWidth:1,borderBottomColor:"lime"}}>
                        <Text style={{fontSize:15,fontWeight:"200",fontStyle:"italic",color:"green"}}>{item.ans}</Text>
                        <View style={{flex:1,}}>
                          <Text style={{flex:1,textAlign:"right",fontSize:10,fontWeight:"100",color:"orange"}}>By: {item.userid}</Text>
                          <Text style={{flex:1,textAlign:"right",fontSize:6,fontWeight:"100",color:"black"}}>{item.anstime.toDate().toString()}</Text>
                        </View>
                      </View>
                      }
                      />
                    </ScrollView>
                  </View>
                  <View style={{flex:1,alignContent:"flex-end"}} >
                    <Button title="Answer" style={styles.nextButton} onPress={ () => this.props.navigation.navigate('AnswerQuestion',{
                    docid: docid,
                    //questitle: questitle,
                    //quesdesc: quesdesc,
                    })} 
                    />
                  </View>
                      
              </ScrollView>            
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    nextButton:{
       // justifyContent:"flex-end"
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