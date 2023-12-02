// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

// initialize firebase and firestore
import { initializeApp } from 'firebase/app';
import { getFirestore, disableNetwork, enableNetwork } from 'firebase/firestore';

// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from 'react';
import { LogBox, Alert } from 'react-native';

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const App = () => {
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("No Internet Connection", "Please connect to the internet to use this app.")
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);
  
  // Firebase Configuration 
  const firebaseConfig = {
  apiKey: "AIzaSyAW5xLheZ9ugL73IK4HxVGheLH1mGpOGQ0",
  authDomain: "chat-app-57e25.firebaseapp.com",
  projectId: "chat-app-57e25",
  storageBucket: "chat-app-57e25.appspot.com",
  messagingSenderId: "236726056827",
  appId: "1:236726056827:web:f08f5750dab36deb0aafde",
  measurementId: "G-QZQW0DJKHJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
        >
          {props => <Chat isConnected={connectionStatus.isConnected} db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;