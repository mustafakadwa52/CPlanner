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

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail :'',
      userPassword :'',
    };
  }

  static navigationOptions = {
    header:null,
  }

  onLoginPress = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.userEmail,this.state.userPassword)
    .then(()=>{
      Alert.alert("Login Success!");
    },(error)=>{
      Alert.alert(error.message);
    });
  }

  onSignupPress = () => {
    const navActions = StackActions.reset({
      index: 0,
      actions:[NavigationActions.navigate({routeName:'SignupScreen'})],
      
    });

    this.props.navigation.dispatch(navActions);
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Image
          style = {styles.logo}
          source={require('../../../assets/logo.png')}
        />
        <View style={styles.Textinputview}>
          <Image
           style = {styles.Textinputicon}
           source={require('../../../assets/useremailicon.png')}
          />
          <TextInput
             style={styles.Textinput}
             onChangeText={(test) => this.setState({userEmail:test})}
             placeholder='email'
          />
        </View>
        <View style={styles.Textinputviewpass}>
          <Image
           style = {styles.Textinputicon}
           source={require('../../../assets/userpassicon.png')}
          />
          <TextInput
             secureTextEntry={true}
             style={styles.Textinput}
             onChangeText={(test) => this.setState({userPassword:test})}
             placeholder='password'
             secureTextEntry
          />
        </View>
        <Text 
         style = {styles.Forgotpassbutton}
         onPress={()=>this.props.navigation.navigate('ForgotPassScreen')}>
         Forgot password ?
        </Text>
        <TouchableOpacity 
          style={styles.Loginbutton}
          //onPress={()=>this.props.navigation.navigate('TabNavigator')}>
          onPress={this.onLoginPress}>
          <Text style={styles.Loginbuttontext}> Login </Text>
       </TouchableOpacity>
       <Text 
         style = {styles.registerbutton}
         onPress={this.onSignupPress}>
         Register
        </Text>
      </KeyboardAvoidingView>
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo:{
      marginBottom:30,
    },
    Textinput:{
      color:'#4F4F4F',
      height: 40,
      width:200,
      fontSize:20,
      marginTop:3,
    },
    
    Textinputicon:{
      width: 25,
      height: 25,
      marginTop:7,
      marginLeft:15,
      marginRight:25,
      resizeMode: 'contain',
    },
    Textinputview:{
      flexDirection: 'column',
      flexWrap: 'wrap',
      height: 45,
      width:300,
      borderBottomColor: 'orange',
      borderBottomWidth: 1,
      marginBottom:15,
    },
    
    Textinputviewpass:{
      flexDirection: 'column',
      flexWrap: 'wrap',
      height: 45,
      width:300,
      borderBottomColor: 'orange',
      borderBottomWidth: 1,
      marginBottom:5,
    },
    Forgotpassbutton:{
      paddingLeft:188,
      paddingBottom:30,
    },
    Loginbutton:{
      backgroundColor:'#E8BE8B',
      height: 50,
      width:300,
      alignItems: 'center',
      justifyContent: 'center',
    },
    Loginbuttontext:{
      fontSize:20,
      color:'#4F4F4F',
    },
    registerbutton:{
      paddingTop:5,
      paddingLeft:250,
      paddingBottom:30,
    }

  });

