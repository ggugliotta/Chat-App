import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  Button,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
 } from 'react-native';

const Start = ({ navigation }) => {

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
      <Text style={styles.chatTitle}>App</Text>
      <View style={styles.container}>
       <TextInput
         style={styles.textInput}
         value={name}
         onChangeText={setName}
         placeholder='Your Name'
        />
        <Button
         title="Go to Chat"
         onPress={() => navigation.navigate('Chat')}
        />
           <TouchableOpacity
            style={styles.button}
            onPress={signInUser}
            accessible={true}
            accessibilityLabel="Get chatting Button"
            accessibilityHint="Navigates to the chat screen."
            accessibilityRole="button"
          >
            <Text style={styles.buttonText}>Get chatting!</Text>
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
  textInput: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    padding: 15,
  },
  button: {
    backgroundColor: "#000",
    padding: 10,
  }
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Start;