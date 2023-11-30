import { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";

const Chat = ({ route, navigation, db, isConnected }) => {
  // Extract parameters from navigation route
  const  { name, color, userID } = route.params;
 
  // Chat Messages state
  const [messages, setMessages] = useState([]);

  let unsubMessages; // unsubscribe function for Firestore listener

  // Set the title of the chat screen to the name of the user
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  // Fetch messages from Firestore
  useEffect(() => {
     if (isConnected === true) {

      if(unsubMessages) unsubMessages(); // unsubscribe from previous listener
      unsubMessages = null;
  
      // Query Firestore for messages, ordered by createdAt
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      
     // Listen for real-time changes in messages collection
     unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach((doc) => {
        newMessages.push({
          _id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),  
        });
      });
      cacheMessages(newMessages);
      setMessages(newMessages);
    });
  } else  loadCachedMessages(); // Load cached messages if offline 

  // Cleanup function to unsubscribe from Firestore listener
  return () => {
    if (unsubMessages) {
      unsubMessages();
    }
  };
}, [isConnected]);
  
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

  // Render Main Chat UI 
  return (
    <View style={[styles.container, { flex: 1, backgroundColor: color }]}>
       <GiftedChat
         messages ={messages}
         renderBubble={renderBubble}
         onSend={(messages) => onSend(messages)}
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
        { Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null   }
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