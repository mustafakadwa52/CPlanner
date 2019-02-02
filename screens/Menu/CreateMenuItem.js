import React from 'react';
import {
    Image,
    Platform,
    Text,
    View,
    StyleSheet,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    TouchableOpacity,
} from 'react-native';
import { getReminderAsync } from 'expo/build/Calendar';

export default class CreateMenuItem extends React.Component{

    constructor(props){
        super(props);

    }


    render(){
        return(
            <View style={styles.main_container}>

                <View style={styles.heading_section}>
                    <Text style={styles.heading_text}>Create Menu Item</Text>
                </View>

                <View style={styles.body_section}>

                    <View style={styles.input_section}>
                        <Text style={styles.input_label}>Recipe Name</Text>
                        <TextInput
                            style={styles.input_box}
                            placeholder="Enter Recipe Name"
                            onChangeText={(text) => this.setState({text})}
                        />
                    </View>

                    <View style={styles.input_section}>
                        <Text style={styles.input_label}>Recipe Name</Text>
                        <TextInput style = {styles.input}
                            underlineColorAndroid = "transparent"
                            placeholder = "Email"
                            placeholderTextColor = "#9a73ef"
                            autoCapitalize = "none"
                            onChangeText = {this.handleEmail}
                            multiline={true}
                            maxLength={30}

                        />
                    </View>

                </View>                

            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container:{
        flex:1,
        backgroundColor: 'grey',
    },
    heading_section:{
        padding:10,
        backgroundColor:'yellow',
        alignItems:'center',

    },
    heading_text:{
        backgroundColor:'red',
    },
    body_section:{
        padding:10,
    },
    input_section:{
        padding:10,
    },
    input_label:{
        color:"red",
    },
    input_box:{
        height: 20,
        width:30,
        backgroundColor:'grey',
    },

})