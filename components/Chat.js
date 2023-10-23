import { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Chat page component
const Chat = ({ route, navigation, db, isConnected }) => {

  const { name, color, userID } = route.params;
  const [messages, setMessages] = useState([]);

  let unsubMessages;

  useEffect(() => {
    navigation.setOptions({ title: name })

    if (isConnected === true) {
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
        unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach(doc => {
          newMessages.push({
            userID: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis())
          });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      })
    } else loadCachedMessages();

    // Clean up code
    return () => {
      if (unsubMessages) {
        unsubMessages();
      }
    };
  }, [isConnected]);

  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

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
          backgroundColor: "#fff"
        }
      }}
    />
  }

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
   }

  //Render the chat ineterface
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: color }}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
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