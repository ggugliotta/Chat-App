import { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Bubble, GiftedChat, InputToolbar, renderActions } from 'react-native-gifted-chat';
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView from 'react-native-maps';  

import CustomActions from './CustomActions';

const Chat = ({ route, navigation, db, isConnected}) => {
  // Extract parameters from navigation route
  const  { name, color, userID } = route.params;
 
  // Chat Messages state
  const [messages, setMessages] = useState([]);

  let unsubMessages; // unsubscribe function for Firestore listener

  useEffect(() => {

    // Set the title of the chat screen to the name of the user
    navigation.setOptions({ title: name });

    if (isConnected === true) {

      // unregister current onSnapshot listener to avoid registering multiple listeners when
     // useEffect code is re-executed.
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      // Create a query to listen to the messages collection in Firestore
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      const unsubMessages = onSnapshot(q, async (documentSnapshot) => {
          let newMessages = [];
          documentSnapshot.forEach(doc => {
            newMessages.push({id: doc.id,...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()) });
        });
        cacheMessages(newMessages);
        setLists(newMessages);
      });
  } else {
      Alert.alert("Connection lost");
      disableNetwork(db);
      loadCachedMessages();
    }
 
  // Unsubscribe from the query when the component unmounts
  return () => {
     if (unsubMessages) unsubMessages();
  }
}, [isConnected]);

const loadCachedMessages = async () => {
  const cacheMessages = await AsyncStorage.getItem("messages") || [];
  setMessages(JSON.parse(cacheMessages));
}

const cacheMessages = async (messagesToCache) => {
 try {
    await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
  } catch (error) {
    console.log(error.message);
  }
}
  
// Handler to send new messages to Firestore
const onSend =  (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  //Customize chat bubble style
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000"
          },
          left: {
            backgroundColor: "#FFF"
          },
        }}
      />
    );
  };

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  }

  const renderCustomActions = (props) => {
    return <CustomActions userID={userID} storage={storage} {...props} />;
  }

  const renderCustomView = (props) => {
    const { currentMessage} = props;
    if (currentMessage.location) {
      return (
          <MapView
            style={{width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3}}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
      );
    }
    return null;
  }

  // Render Main Chat UI 
  return (
    <View style={[styles.container, { flex: 1, backgroundColor: color }]}>
    {/*{(isConnected === true) ? */}
       <GiftedChat
         messages ={messages}
         renderBubble={renderBubble}
         renderInputToolbar ={renderInputToolbar}
         onSend ={messages => onSend(messages)}
         renderActions={renderCustomActions}
         renderCustomView={renderCustomView}
         user={{
          _id: userID,
          name,
          text: 'My message',
          createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
          user: {
            _id: userID,
            name,
            avatar: 'https://placeimg.com/140/140/any',
          },
            image: 'https://placeimg.com/140/140/any',
          }}
          accessible={true}
          accessibilityLabel="Chat Input"
          accessibilityHint="Displays Messages."
          accessibilityRole="text"
        />

        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null   }
    </View> 
  );
};


// Styling for Chat Component
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    logoutButton: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "#C00",
    padding: 10,
    zIndex: 1
  },
  logoutButtonText: {
    color: "#FFF",
    fontSize: 10
  }
});

export default Chat;