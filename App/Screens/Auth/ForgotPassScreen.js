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
 import * as firebase from 'firebase'

class ForgotPassScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail :'',
    };
  }

  handleForgotPass = () => {
    firebase.auth().sendPasswordResetEmail(this.state.userEmail)
    .then(()=>{
      Alert.alert('Password reset mail sent');
    },(error) => {
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
         onChangeText={(text) => this.setState({userEmail:text})}
         placeholder='email'
      />
    </View>
    <TouchableOpacity 
      style={styles.Loginbutton}
      onPress={this.handleForgotPass}>
      <Text style={styles.Loginbuttontext}> Submit </Text>
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

export default ForgotPassScreen;

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
Loginbutton:{
  borderColor: 'orange',
  borderWidth: 1,
  height: 50,
  width:300,
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom:10,
},
Loginbuttontext:{
  fontSize:20,
  color:'#E8BE8B',
},

});

