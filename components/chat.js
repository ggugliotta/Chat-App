import { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { collection, getDocs, addDoc, onSnapshot, query, where } from "firebase/firestore";

const Chat = ({ db, route, navigation }) => {
  const { userID } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    navigation.setOptions({ title: name })
    
  }, []);

  const onSend = (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
  }

  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000"
        },
        left: {
          backgroundColor: "#FFF"
        }
      }}
    />
  }

  return (
    <View style={styles.container}>
       <GiftedChat
         messages ={messages}
         renderBubble={renderBubble}
         onSend={messages => onSend(messages)}
         user={{
          _id: 1,
          name
          }}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null   }
        { Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null   }
    </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Chat;