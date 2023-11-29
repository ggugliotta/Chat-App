{/* Colors for the Background Color Selector
a: "#FFDB58",  muustard yellow
b: "#E6E6FA", lavendar
c: "#ADD8E6", light blue
d: "#EB5E00", clementine */}


import React from 'react';
import { useState } from 'react';
import { Alert, ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity,  View } from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";
 

// Background Image
const backgroundImage = require('../assets/BackgroundImage.png');


const Start = ({ navigation }) => {
  const [background, setBackground ] = useState('#FFFFFF');
  const [name, setName] = useState();
  
  
  const auth = getAuth();

   const signInUser = () => {
    signInAnonymously(auth)
    //after user signs in anonymously, navigate to the chat screen, and pass this object to it.
      .then(result => {
        navigation.navigate("chat", {
          userID: result.user.uid,
          name: username, 
          color: background,
        });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try again later.");
        console.log(error);
      });
  };

 return (
  <View style={styles.container}>
    
    {/* Default Background Image Setting */}
    <ImageBackground 
      source={backgroundImage} 
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      {/* App Title */}
      <Text style={styles.title}>Zing Ping</Text>

      {/* Container for username input, color choice, and button */}
      <View style={styles.inputBox}>
        {/* username input */}
       <TextInput
         style={styles.nameTextInput}
         value={name}
         onChangeText={setName}
         placeholder='Type your name here...'
        ></TextInput>

        {/* Background Color Selector */}
        <View>
          <Text style={styles.chooseBgText}>Choose Background Color</Text>
          
          {/* container for colors */}
          <View style={styles.colorButtonBox}>
          
          {/* Color Option 1: Mustard Yellow Box */}
          <TouchableOpacity
            style={[styles.box, styles.colorOption1]}
            onPress={() => { setBackground(styles.colorOption1.backgroundColor);
            }}
            accessible={true}
            accessibilityLabel='Yellow Button'
            accessibilityHints='Lets you select the background color of your chat'
            accessibilityRole='button'
          ></TouchableOpacity>

          {/* Color Option 2: Lavendar Box */}
          <TouchableOpacity
            style={[styles.box, styles.colorOption2]}
            onPress={() => { setBackground(styles.colorOption2.backgroundColor);
            }}
            accessible={true}
            accessibilityLabel='Purple Button'
            accessibilityHints='Lets you select the background color of your chat'
            accessibilityRole='button'
          ></TouchableOpacity>

          {/* Color Option 3: Light Blue Box */}
          <TouchableOpacity
            style={[styles.box, styles.colorOption3]}
            onPress={() => { setBackground(styles.colorOption3.backgroundColor);
            }}
            accessible={true}
            accessibilityLabel='Blue Button'
            accessibilityHints='Lets you select the background color of your chat'
            accessibilityRole='button'
          ></TouchableOpacity>

          {/* Color Option 4: Clementine Box */}
          <TouchableOpacity
            style={[styles.box, styles.colorOption4]}
            onPress={() => { setBackground(styles.colorOption4.backgroundColor);
            }}
            accessible={true}
            accessibilityLabel='Orange Button'
            accessibilityHints='Lets you select the background color of your chat'
            accessibilityRole='button'
          ></TouchableOpacity>
        </View>
      </View>
      {/* End of Color Chooser */}

      {/* button to sign in user and navigate to chat screen */}
      <TouchableOpacity
        style={styles.startButton}
        onPress={signInUser}
        accessible={true}
        accessibilityLabel="Get started Button"
        accessibilityHint="Navigates to the chat screen."
        accessibilityRole="button">
        <Text style={styles.startButtonText}>Get started</Text>
       </TouchableOpacity>
     </View>
    </ImageBackground>

    {/* Keyboard Avoiding View */}
    { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null   }
    { Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null   }
  </View>
 );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "space-evenly",
    padding: "6%",
    resizeMode: "cover",
    alignItems: "center",
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    alignSelf: "center",
    marginBottom: 250,
  },
  inputBox: {
    height: "44%",
    width: '88%',
    padding: 15,
    borderWidth: 1,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 25,
    backgroundColor: "#FFF",
    fontSize: 16,
    opacity: 50,
    borderRadius: 5,
    justifyContent: "space-evenly"
  },
  nameTextInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    padding: 15,
    opacity: 0.5,
  },
  colorButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginVertical: 25,
    marginHorizontal: 10,
  },
  colorButtonBox: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  chooseBgText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    margin: 10,
    textAlign: "center",
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  box: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginVertical: 25,
    marginHorizontal: 10,
  },
  colorOption1: {
    backgroundColor: "#FFDB58",
  },
  colorOption2: {
    backgroundColor: "#E6E6FA",
  },
  colorOption3: {
    backgroundColor: "#ADD8E6",
  },
  colorOption4: {
    backgroundColor: "#EB5E00",
  },
  startButton: {
    backgroundColor: "#000",
    padding: 10,
  },
  startButtonText: {
    color: "#FFF",
  },
  
});

export default Start;