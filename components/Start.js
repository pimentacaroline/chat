import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground, KeyboardAvoidingView, Alert } from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";

//Define path for the image bachground
const image = require('../assets/Background.png');

// Define backgrounds colors that users can choose
const backgroundColors = {
	lila: '#eab6fd',
	yellow: '#FFD777',
	blue: '#8A95A4',
	green: '#BAC5AE',
}

// Starting page component
const Start = ({ navigation }) => {

	const [name, setName] = useState('');
	const [color, setColor] = useState(backgroundColors.green);
	const auth = getAuth();

	const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("Chat", {
          name: name,
          userID: result.user.uid,
					color: color,
        });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in.");
      });
  };
	
	return (
		<View style={styles.container}>
			<ImageBackground source={image} resizeMode="cover" style={styles.image}>
				<Text style={styles.appTitle}>Chat App</Text>
				<View style={styles.inputContainer}>

					<TextInput
						style={styles.textInput}
						value={name}
						onChangeText={setName}
						placeholder="Your Name"
						placeholderTextColor="#757083"
					/>

					<Text style={styles.textColorSelector}>Choose background color:</Text>

					<View style={styles.colorSelector}>

						<TouchableOpacity
							style={[
								styles.circle,
								color === backgroundColors.a && styles.selectedCircle,
								{ backgroundColor: backgroundColors.lila },
							]}
							onPress={() => setColor(backgroundColors.lila)}
						></TouchableOpacity>
						<TouchableOpacity
							style={[
								styles.circle,
								color === backgroundColors.b && styles.selectedCircle,
								{ backgroundColor: backgroundColors.yellow },
							]}
							onPress={() => setColor(backgroundColors.yellow)}
						></TouchableOpacity>
						<TouchableOpacity
							style={[
								styles.circle,
								color === backgroundColors.c && styles.selectedCircle,
								{ backgroundColor: backgroundColors.blue },
							]}
							onPress={() => setColor(backgroundColors.blue)}
						></TouchableOpacity>
						<TouchableOpacity
							style={[
								styles.circle,
								color === backgroundColors.d && styles.selectedCircle,
								{ backgroundColor: backgroundColors.green },
							]}
							onPress={() => setColor(backgroundColors.green)}
						></TouchableOpacity>

					</View>

					<TouchableOpacity
						style={styles.button}
						onPress={signInUser}
					>
						<Text style={styles.buttonText}>Start Chatting</Text>
					</TouchableOpacity>

				</View>

			</ImageBackground>

			{/* Prevents keyboard to cover the screen */}
			{Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		flex: 1,
		justifyContent: 'space-between',
		padding: '6%',
	},
	appTitle: {
		flex: 2,
		fontSize: 45,
		fontWeight: '600',
		color: '#FFFFFF',
		alignSelf: 'center',
		marginTop: 50,
	},
	inputContainer: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		padding: '6%',
		flexBasis: 160,
	},
	textInput: {
		fontSize: 16,
		fontWeight: '300',
		color: '#757083',
		padding: 15,
		borderWidth: 1,
		borderColor: '#757083',
		marginTop: 15,
		marginBottom: 35,
	},
	textColorSelector: {
		fontSize: 16,
		fontWeight: '300',
		color: '#000',
	},
	colorSelector: {
		flex: 1,
		justifyContent: 'space-around',
		flexDirection: 'row',
	},
	circle: {
		height: 50,
		width: 50,
		borderRadius: 25,
		marginTop: 10,
		marginBottom: 10,
	},
	selectedCircle: {
		borderWidth: 2,
		borderColor: '#FF0000',
	},
	button: {
		alignContent: 'center',
		backgroundColor: '#757083',
		padding: 20,
	},
	buttonText: {
		color: '#FFFFFF',
		fontWeight: 'bold',
		textAlign: 'center',
	},
});


export default Start;