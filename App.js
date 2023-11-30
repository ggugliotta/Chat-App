// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

// initialize firebase and firestore
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
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
          {props => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;