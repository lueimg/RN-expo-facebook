import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight } from 'react-native';
import FacebookButton from './src/components/FacebookButton.js';
import Exponent from "expo";


import * as firebase from 'firebase';
// Initialize Firebase
const firebaseConfig = {
     apiKey: "AIzaSyDAIclfDxl2mSgfANnbUmH73cQe-sgFje8",
    authDomain: "fire1-7b061.firebaseapp.com",
    databaseURL: "https://fire1-7b061.firebaseio.com",
    projectId: "fire1-7b061",
    storageBucket: "fire1-7b061.appspot.com",
    messagingSenderId: "590828447756"
   
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

let counter = 0;


export default class App extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      items: [ ]
    }
   
    
  }


authenticate = token => {
  const provider = firebase.auth.FacebookAuthProvider;
  const credential = provider.credential(token);
  return firebase.auth().signInWithCredential(credential);
};

login = async () => {
  const ADD_ID = "452053721810266";
  const options = {
    permissions: ["public_profile", "email"]
  };
  const { type, token } = await Exponent.Facebook.logInWithReadPermissionsAsync(
    ADD_ID,
    options
  );
  if (type === "success") {
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}`
    );
    console.log(await response.json());
    this.authenticate(token);
  }
}
;



  addItem() {
   
    
 
  }

  render() {
    return (
      <View style={styles.container}>
        
        <TouchableHighlight onPress={this.login}>
          <Text>sign in with facebook</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
