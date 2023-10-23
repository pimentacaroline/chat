// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

// initialize a connection with Firestore
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";

//Prevents the warning stating "AsyncStorage has been extracted from…" from appearing
import { LogBox, Alert } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

import { useEffect } from "react";
import { useNetInfo }from '@react-native-community/netinfo';

// The app’s main Chat component that renders the chat UI
const App = () => {

  const firebaseConfig = {
    apiKey: "AIzaSyDxnDo-XvS8E_NSYe97VXQk6iZow7TW14I",
    authDomain: "chat-app-47693.firebaseapp.com",
    projectId: "chat-app-47693",
    storageBucket: "chat-app-47693.appspot.com",
    messagingSenderId: "569258751609",
    appId: "1:569258751609:web:039c3ccf4f65c5433b06a8"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  //Network connectivity status
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Chat App"
          component={Start}
        />
        <Stack.Screen name="Chat">
          {(props) => <Chat isConnected={connectionStatus.isConnected} {...props} db={db} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
