import AnswerScreen from '../Screens/Core/AnswerScreen.js'
import AskScreen from '../Screens/Core/AskScreen.js'
import MeScreen from '../Screens/Core/MeScreen.js'
import QuestionDetails from "../Screens/Core/QuestionDetails";
import AnswerQuestion from "../Screens/Core/AnswerQuestion";
import { createMaterialTopTabNavigator,createDrawerNavigator, createAppContainer,createStackNavigator } from 'react-navigation';
import * as Expo from 'expo';


/*const AppTabNavigator = createAppContainer(createMaterialTopTabNavigator({
    AnswerScreen:AnswerScreen,
    AskScreen:AskScreen,
    MeScreen:MeScreen,
    },
    /*
    {
      tabBarOptions: {
       style: {
                 paddingTop: Expo.Constants.statusBarHeight ,
              }
                     }
    }
    ));*/

    const answerScreenNavig = createStackNavigator({ 
        AnswerScreen:AnswerScreen,
        QuestionDetails:{
            screen: QuestionDetails,
            navigationOptions: {
            header: null
            },
        
        },
        AnswerQuestion:{
            screen: AnswerQuestion,
            navigationOptions: {
                header: null
                }
        }
    });

    const AppTabNavigator = createAppContainer(createDrawerNavigator({
        AnswerScreen: answerScreenNavig,
        //AnswerScreen:AnswerScreen,
        AskScreen:AskScreen,
        MeScreen:MeScreen,
        },
        /*{
          tabBarOptions: {
           style: {
                     paddingTop: Expo.Constants.statusBarHeight ,
                  }
                         }
        }*/
        ));

export default AppTabNavigator;
