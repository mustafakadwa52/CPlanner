import React from 'react'
import {
    createStackNavigator,
    createAppContainer,
} from 'react-navigation';

import LoginScreen from '../Screens/Auth/LoginScreen';
import SignupScreen from '../Screens/Auth/SignupScreen';
import TabNavigator from './TabNavigator';
import AnswerListScreen from '../Screens/Core/AnswerListScreen'
import ForgotPassScreen from '../Screens/Auth/ForgotPassScreen';


export default class SwitchNavigator extends React.Component {
    render() {
        return ( 
        <AppStackNavigator />
        );
    }
}

const AppStackNavigator = createAppContainer(createStackNavigator({
    LoginScreen: LoginScreen,
    SignupScreen: SignupScreen,
    ForgotPassScreen: ForgotPassScreen,
    TabNavigator: {
        screen: TabNavigator,
        navigationOptions: {
            header: null
        }
    },
    AnswerListScreen:AnswerListScreen,
}));
