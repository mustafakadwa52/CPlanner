import React from 'react';
import { 
  View,KeyboardAvoidingView, 
  TouchableOpacity, 
  Text, 
  TextInput, 
  StyleSheet,
  Image,
  Alert,
  Button,
} from 'react-native';
import * as firebase from 'firebase';
class MeProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.userEmail = firebase.auth().currentUser.email;
  }

  // SIGN OUT
  onSignout = () => {
    firebase.auth().signOut();
  }
 
  // geting user data
  onGetUser = () => {
    //console.log(firebase.auth().currentUser.uid)
    Alert.alert("Current User Id: " +firebase.auth().currentUser.uid)
  }

  render() {
    /*return (
      <View style={styles.container}>
        <Text> Me </Text>
        <Button onPress={this.onSignout} title="Logout" />
        <Button onPress={this.onGetUser} title="getuser" />
      </View>
    ); */

    return(
      <View style={styles.container}>

        <View style={{paddingTop:10,flexDirection:"row",borderStyle:"dotted",borderWidth:1,borderColor:"grey"}}>
          {/*}User Image Icon Section with Current User Email{*/}
          <Image 
            source={require("../../../../assets/useremailicon.png")}
            style={{height:30,width:30,}}
          />

          <Text style={{flex:1,fontSize:30,color:"orange",fontWeight:"bold",textAlign:"center"}}>My Profile</Text>

          <Text style={{flex:1,fontSize:10,textAlign:"right",paddingTop:20,fontWeight:"bold",fontStyle:"italic",color:"yellow"}}>{this.userEmail}</Text>
        </View>

        <View style={{padding:20,alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
          <View style={{backgroundColor:"#ffff",color:"green"}}>
            <Button onPress={this.onGetUser} title="Get User ID" />
          </View>
          <View  style={{backgroundColor:"black",paddingLeft:5}}>
            <Button onPress={this.onSignout} title="LogOut" />
          </View>
        </View>

      </View>
    )
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "skyblue",
      //alignItems: 'center',
      //justifyContent: 'center',
    },
  });

export default MeProfile;
