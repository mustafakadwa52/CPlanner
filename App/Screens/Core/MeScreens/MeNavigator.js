import MeAnswerScreen from './MeAnswers'
import MeQuestionScreen from './MeQuestions'
import MeProfileScreen from './MeProfile'
import QuestionDetailsScreen from "../QuestionDetails";
import AnswerQuestionScreen from "../AnswerQuestion";
import { createMaterialTopTabNavigator, createAppContainer,createStackNavigator } from 'react-navigation';


const meQuesStack = createStackNavigator({
    MeQuestions: {
        screen: MeQuestionScreen,
        navigationOptions: {
            header: null,
        }
    },
    QuestionDetails : {
        screen: QuestionDetailsScreen,
        navigationOptions: {
            header: null,
        },
    },
    AnswerQuestion :{
        screen: AnswerQuestionScreen,
        navigationOptions:{
            header: null,
        },
    },
})

const meAnsStack = createStackNavigator({
    MeAnswers: {
        screen: MeAnswerScreen,
        navigationOptions: {
            header: null,
        },
    },
    QuestionDetails : {
        screen: QuestionDetailsScreen,
        navigationOptions: {
            header: null,
        },
    },
    AnswerQuestion :{
        screen: AnswerQuestionScreen,
        navigationOptions:{
            header: null,
        },
    },
})

const AppTabNavigator = createAppContainer(createMaterialTopTabNavigator({
    //MeAnswers:MeAnswerScreen,
    MeAnswers: meAnsStack,
    //MeQuestions:MeQuestionScreen,
    MeQuestions: meQuesStack,
    MeProfile:MeProfileScreen,
    
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
