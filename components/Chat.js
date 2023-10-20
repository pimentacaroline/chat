import { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

// Chat page component
const Chat = ({ route, navigation, db }) => {

  const { name, color,  userID } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    navigation.setOptions({ title: name })

    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

    const unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach(doc => {
        newMessages.push({
          userID: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis())
        })
      })
      setMessages(newMessages);
    })

    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    }

  }, []);

  //Called when user sends a message
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
  }

  //Add style to speech buble. Right = sended. Left = received.
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

  //Render the chat ineterface
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: color }}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
        user={{
          _id: userID,
          name: name,
        }}
      />

      {/* Prevents keyboard to cover the screen */}
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
    </KeyboardAvoidingView>
  )
}

export default Chat;