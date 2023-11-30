import { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";

const Chat = ({ route, navigation, db}) => {
  // Extract parameters from navigation route
  const  { name, color, userID } = route.params;
 
  // Chat Messages state
  const [messages, setMessages] = useState([]);

  let unsubMessages; // unsubscribe function for Firestore listener


  useEffect(() => {
    // Set the title of the chat screen to the name of the user
    navigation.setOptions({ title: name });
    // Create a query to listen to the messages collection in Firestore
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubMessages = onSnapshot(q, (docs) => {
     let newMessages = [];
     docs.forEach(doc => {
      newMessages.push({
       id: doc.id,
       ...doc.data(),
       createdAt: new Date(doc.data().createdAt.toMillis())
     })
   })
   // Update the messages state with the new messages
   setMessages(newMessages);
 })
 // Unsubscribe from the query when the component unmounts
 return () => {
   if (unsubMessages) unsubMessages();
 }
}, []);
  
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