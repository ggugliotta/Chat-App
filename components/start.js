import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, ImageBackground, TouchableOpacity } from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
  const auth = getAuth();

   const signInUser = () => {
    signInAnonymously(auth)
      .then(result => {
        navigation.navigate("chat", {userID: result.user.uid });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      })
  }

  // Background Image
  const backgroundImage = require('../assets/BackgroundImage.png');

  const backgroundColors = {
    a: "#090C08",
    b: "#474056",
    c: "#8A95A5",
    d: "#B9C6AE",
  };

  const [name, setName] = React.useState('');
  const [backgroundColor, setBackgroundColor] = React.useState('#FFFFFF');

 return (
  <ImageBackground 
    source={backgroundImage} 
    resizeMode="cover"
    style={styles.backgroundImage}
    >
      <Text style={styles.chatTitle}>Chat App</Text>
      <View style={styles.container}>
        <Text>Hello Screen1!</Text>
       <TextInput
         style={styles.nameTextInput}
         value={name}
         onChangeText={setName}
         placeholder='Type your name here...'
        />
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
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "space-between",
    padding: "6%",
  },
  chatTitle: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    alignSelf: "center",
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    padding: "6%",
    paddingBottom: 20,
  },
  nameTextInput: {
    fontSize: 16,
    fontWeight: '300',
    color: 'gray',
    padding: 15,
  },
  startButton: {
    backgroundColor: "#000",
    padding: 10,
  },
  startButtonText: {
    color: "#FFF",
  }
});

export default Start;