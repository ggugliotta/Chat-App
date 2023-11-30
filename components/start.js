import { useState } from 'react';
import { Alert, ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity,  View } from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";
 
const Start = ({ navigation }) => {

   // Initialize Firebase Authentication
  const auth = getAuth();

  // Background Image
  const backgroundImage = require('../assets/BackgroundImage.png');

  // Function to sign in anonymously
  const signInUser = () => {
    signInAnonymously(auth)
    //navigate to the chat screen, and pass this object to it.
      .then(result => {
        navigation.navigate("Chat", {
          userID: result.user.uid,
          name: name, 
          color: color,
        });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try again later.");
        console.log(error);
      });
  };

   //Colors for the Background Color Selector
    const backgroundColors = {
      1: "#090C08",  // Dark Gray
      2: "#474056", // Mauve/Purple
      3: "#8A95A5", // Light Gray
      4: "#B9C6AE", // Light Green
    };

  // Local states for username and background color
  const [name, setName] = useState("");
  const [color, setColor] = useState(backgroundColors[1]);
  
  // Component Rendering
  return (
    <ImageBackground 
      source={backgroundImage} 
      resizeMode="cover"
      style={styles.bgImage}
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
            accessible={true}
            accessibilityLabel="Name Input"
            accessibilityHint='Type your name here'
            accessibilityRole='text'
          />
       
          <Text style={styles.chooseBgText}>
            Choose Background Color:
          </Text>
          
        {/* Background Color Wrapper */}
          <View 
            style={styles.bgColorWrapper}
            accessible={true}
            accessibilityLabel='Background Color Wrapper'
            accessibilityHint='Lets you select the background color of your chat'
            accessibilityRole='menu'
          >
        
            {/*Color Chooser Logic for Background Color  */}
            {Object.keys(backgroundColors).map((key) => (
              <TouchableOpacity
                key={key}
                style={[
                   styles.colorCircle, 
                   color === backgroundColors[key] && styles.activeColorCircle,
                   { backgroundColor: backgroundColors[key] },
                ]}
                onPress={() => setColor(backgroundColors[key])}
                accessible={true}
                accessibilityLabel='Background Color Button'
                accessibilityHint={`Color - ${backgroundColors[key]}`}
                accessibilityRole='menuitem'
              ></TouchableOpacity>
            ))}
          </View>

          {/* button to sign in user and navigate to chat screen */}
          <TouchableOpacity
            style={styles.button}
            onPress={signInUser}
            accessible={true}
            accessibilityLabel="Get started Button"
            accessibilityHint="Navigates to the chat screen."
            accessibilityRole="button"
          >
            <Text style={styles.buttonText}>Join Chat</Text>
          </TouchableOpacity>
        </View>
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null   }
        { Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null   }
    </ImageBackground>
  ) ;
};


// Styling for Start Component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bgImage: {
    flex: 1,
    justifyContent: "space-between",
    padding: "6%",
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    alignSelf: "center",
    color: "white",
    alignSelf: "center",
    marginTop: "20%",
  },
  inputBox: {
    marginTop: "70%",
    alignItems: 'center',
    backgroundColor: "#ffffff",
    height: "44%",
    width: '100%',
    justifyContent: "space-evenly",
    padding: 15,
  },
  nameTextInput: {
    fontSize: 16,
    fontWeight: '300',
    color: "#757083",
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    opacity: 50,
  },
  chooseBgText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 100,
    marginTop: 10,
    marginBottom: 0,
    marginLeft: 20,
    textAlign: "center",
    alignSelf: "flex-start",
  },
  bgColorWrapper: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 0,
  },
  colorCircle: {
    height: 45,
    width: 45,
    borderRadius: 22.5,
    marginVertical: 25,
    marginHorizontal: 10,
  },
  activeColorCircle: {
    borderWidth: 2,
    borderColor: "#757083",
  },
  button: {
    backgroundColor: "#474056",
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});

export default Start;