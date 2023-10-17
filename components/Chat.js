import { useState, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, View } from 'react-native';
import { GiftedChat, Bubble } from "react-native-gifted-chat";

// Chat page component
const Chat = ({ route, navigation }) => {

	const { name, color } = route.params; 
	const [messages, setMessages] = useState([]); 

  useEffect(() => {
    navigation.setOptions({ title: name })
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'You have entered the chat',
        createdAt: new Date(),
        system: true,
      },
    ]);

  }, []);

	//Called when user sends a message
	const onSend = (newMessages) => {
		setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
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

	// Component stylesheet
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center'
		}
	});

	//Render the chat ineterface
  return (
<KeyboardAvoidingView style={{ flex: 1, backgroundColor: color }}>
      <GiftedChat
        messages={messages}
				renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1
        }}
      />

			{/* Prevents keyboard to cover the screen */}
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
    </KeyboardAvoidingView>
  )
}

export default Chat;