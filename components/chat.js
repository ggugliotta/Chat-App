import { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = ({ route, navigation, db, isConnected}) => {
  // Extract parameters from navigation route
  const  { name, color, userID } = route.params;
 
  // Chat Messages state
  const [messages, setMessages] = useState([]);

  let unsubMessages; // unsubscribe function for Firestore listener

  useEffect(() => {

    if (isConnected === true) {

      // Set the title of the chat screen to the name of the user
      navigation.setOptions({ title: name });

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

const cacheMessages = async (messages) => {
 try {
    await AsyncStorage.setItem("messages", JSON.stringify(newMessages));
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

  // Render Main Chat UI 
  return (
    <View style={[styles.container, { flex: 1, backgroundColor: color }]}>
    {/*{(isConnected === true) ? */}
       <GiftedChat
         messages ={messages}
         renderBubble={renderBubble}
         renderInputToolbar ={renderInput}
         renderActions={renderCustomActions}
         renderCustomView={renderCustomView}
         onSend={messages => onSend(messages)}
         user={{
          _id: userID,
          name,
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
});

export default Chat;