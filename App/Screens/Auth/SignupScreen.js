import React from 'react';
import {  
  View,KeyboardAvoidingView, 
  TouchableOpacity, 
  Text, 
  TextInput, 
  StyleSheet,
  Image,
  Alert,
 } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';


class SignupScreen extends React.Component {

  
  constructor(props) {
    super(props);
    this.state = {
      userDisplayName :'',
      userEmail :'',
      userPassword :'',
      errorMessage:'',
      cUserPassword:'',
    };
  }



  // on press signup
  handleSignUp = () => {
    if(this.state.userPassword !== this.state.cUserPassword){
      Alert.alert("password match fail.");
      return;
    }
    firebase.auth().createUserWithEmailAndPassword(this.state.userEmail,this.state.userPassword)
    .then(()=>{
         let user = firebase.auth().currentUser;
      user.updateProfile({
      displayName: this.state.userDisplayName,
    }).then(function() {
      // Update successful.
      console.log(user)
    }).catch(function(error) {
      // An error happened.
      console.log(error)
    });
    },(error) =>{
      Alert.alert(error.message);
    });
  }


  // on press login , back to login page
  backToLogin = () => {
    const navActions = StackActions.reset({
      index: 0,
      actions:[NavigationActions.navigate({routeName:'LoginScreen'})],   
    });
    this.props.navigation.dispatch(navActions);
   }


  // to remove header from page 
  static navigationOptions = {
    header:null,
  }


  //render
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Image
          style = {styles.logo}
          source={require('../../../assets/logo.png')}
        />
        <View style={styles.Textinputview}>
          <TextInput
             style={styles.Textinput}
             onChangeText={(text) => this.setState({userDisplayName:text})}
             placeholder='username'
          />
        </View>
        <View style={styles.Textinputview}>
          <TextInput
             style={styles.Textinput}
             onChangeText={(text) => this.setState({userEmail:text})}
             placeholder='email'
          />
        </View>
        <View style={styles.Textinputviewpass}>
          <TextInput
            secureTextEntry={true}
             style={styles.Textinput}
             onChangeText={(text) => this.setState({userPassword:text})}
             placeholder='password'
          />
        </View>
        <View style={styles.Textinputviewcpass}>
          <TextInput
             secureTextEntry={true}
             style={styles.Textinput}
             onChangeText={(text) => this.setState({cUserPassword:text})}
             placeholder='confirm password'
          />
        </View>
        <TouchableOpacity 
          style={styles.Loginbutton}
          onPress={this.handleSignUp}>
          <Text style={styles.Loginbuttontext}> Signup </Text>
       </TouchableOpacity>

       <TouchableOpacity 
          style={styles.Loginbutton}
          onPress={this.backToLogin}>
          <Text style={styles.Loginbuttontext}> Login </Text>
       </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

export default SignupScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    Textinput:{
      color:'#4F4F4F',
      height: 40,
      width:200,
      fontSize:20,
      marginTop:3,
    },
    Textinputview:{
      flexDirection: 'column',
      flexWrap: 'wrap',
      height: 45,
      width:300,
      borderBottomColor: 'orange',
      borderBottomWidth: 1,
      marginBottom:20,
    },
    
    Textinputviewpass:{
      flexDirection: 'column',
      flexWrap: 'wrap',
      height: 45,
      width:300,
      borderBottomColor: 'orange',
      borderBottomWidth: 1,
      marginBottom:20,
    },
    Textinputviewcpass:{
      flexDirection: 'column',
      flexWrap: 'wrap',
      height: 45,
      width:300,
      borderBottomColor: 'orange',
      borderBottomWidth: 1,
      marginBottom:40,
    },
    Loginbutton:{
      backgroundColor:'#E8BE8B',
      height: 50,
      width:300,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom:10,
    },
    Loginbuttontext:{
      fontSize:20,
      color:'#4F4F4F',
    }

  });
