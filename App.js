import Start from './components/Start';
import Chat from './components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { useEffect } from "react";
import { useNetInfo }from '@react-native-community/netinfo';
import { LogBox, Alert } from 'react-native';
import { getStorage } from "firebase/storage";
import * as myConfig from './secret.json'

const Stack = createNativeStackNavigator();

LogBox.ignoreAllLogs();

const App = () => {

  const firebaseConfig = {
    apiKey: myConfig.apiKey,
    authDomain: myConfig.authDomain,
    projectId: myConfig.projectId,
    storageBucket: myConfig.storageBucket,
    messagingSenderId: myConfig.messagingSenderId,
    appId: myConfig.appId
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
