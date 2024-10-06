import { StatusBar } from 'expo-status-bar';
import { 
	View,
	Text,
	TextInput,
	TouchableHighlight,
	FlatList,
	StyleSheet,
	Alert,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
