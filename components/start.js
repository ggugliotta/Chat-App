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
        navigation.navigate("chat", {
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
      1: "#FFDB58",  //mustard yellow
      2: "#E6E6FA", //lavendar
      3: "#ADD8E6", //light blue
      4: "#EB5E00", //clementine
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
    
     <Keyboard Avoiding View 
       behavior={Platform.OS === "ios" ? "padding" : "height"}
       style={styles.container}
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
            Choose Background Color
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
            <Text style={styles.buttonText}>Get started</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  },
  inputBox: {
    height: "44%",
    width: '88%',
    padding: "6%",
    paddingBottom: 20,
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
    opacity: 0.5,
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
  bgColorWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  colorCircle: {
    height: 50,
    width: 50,
    radius: 25,
  },
  activeColorCircle: {
    borderWidth: 2,
    borderColor: "#757083",
  },
  button: {
    backgroundColor: "#000",
    padding: 10,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Start;