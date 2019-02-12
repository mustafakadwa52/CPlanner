import * as firebase from 'firebase'

  getUserInfo = () =>{
    let uname = firebase.auth().currentUser
    return uname
  }
  
export default {
	userName: getUserInfo()
}