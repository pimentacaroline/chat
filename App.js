import Start from './components/Start';
import Chat from './components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { useEffect } from "react";
<<<<<<< Updated upstream
import { useNetInfo }from '@react-native-community/netinfo';
import { LogBox, Alert } from 'react-native';
import { getStorage } from "firebase/storage";

const Stack = createNativeStackNavigator();

//Prevents the warning stating "AsyncStorage has been extracted from…" from appearing
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

=======
import { useNetInfo } from '@react-native-community/netinfo';
>>>>>>> Stashed changes

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

  // Initialize Firestore Database handler
  const db = getFirestore(app);

  // Initialize Firebase Storage handler
  const storage = getStorage(app);

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
          {(props) => <Chat 
            isConnected={connectionStatus.isConnected} 
            {...props} 
            db={db}
            storage={storage}
          />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
