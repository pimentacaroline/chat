import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';


// Chat page component
const Chat = ({ route, navigation }) => {

	const { name, color } = route.params; //Brings name and bg color selected to Chat screen

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

	return (
		<View style={[styles.container, { backgroundColor: color }]}>
			<Text>Start chating!</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default Chat;