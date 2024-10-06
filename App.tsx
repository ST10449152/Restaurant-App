import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
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

interface Course {
  id: number;
  name: string;
}

// Define the type for MenuItem's props
interface MenuItemProps {
  name: string;
  description: string;
  price: number;
  course: string;
}

const courseList: Course[] = [
  { id: 1, name: 'Hors D Oeuvre' },
  { id: 2, name: 'Amuse-Bouche' },
  { id: 3, name: 'Soup' },
  { id: 4, name: 'Salad' },
  { id: 5, name: 'Appetiser' },
  { id: 6, name: 'Fish' },
  { id: 7, name: 'Main Course' },
  { id: 8, name: 'Palate Cleanser' },
  { id: 9, name: 'Second Main Course' },
  { id: 10, name: 'Cheese' },
  { id: 11, name: 'Dessert' },
  { id: 12, name: 'Mignardise' },
];

const MenuItem: React.FC<MenuItemProps> = ({ name, description, price, course }) => (
  <View style={styles.menuContainer}>
    <Text style={styles.menuName}>{name}</Text>
    <Text style={styles.menuDescription}>{description}</Text>
    <Text style={styles.menuPrice}>R{price}</Text>
    <Text style={styles.menuCourse}>{course}</Text>
  </View>
);

export default function App() {
  const [mName, setMName] = useState('');
  const [mDescription, setMDescription] = useState('');
  const [mPrice, setMPrice] = useState('');
  const [mCourse, setMCourse] = useState('');
  const [menuList, setMenuList] = useState([]);
  const [total, setTotal] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#1e1e2e',
    padding: 15,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#ffd700',
  },
  headerText: {
    fontSize: 28,
    color: '#ffd700',
    fontFamily: 'Montserrat_700Bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
  },
  totalContainer: {
    alignItems: 'center',
  },
  statsText: {
    fontSize: 18,
    color: '#f1f1f1',
    fontFamily: 'Montserrat_400Regular',
  },
  statsNumber: {
    fontSize: 22,
    color: '#ffd700',
    fontFamily: 'Montserrat_700Bold',
  },
  menuContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#33334d',
    borderRadius: 10,
  },
  menuName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffd700',
    fontFamily: 'Montserrat_700Bold',
  },
  menuDescription: {
    fontSize: 16,
    color: '#f1f1f1',
    marginVertical: 5,
    fontFamily: 'Montserrat_400Regular',
  },
  menuPrice: {
    fontSize: 18,
    color: '#32cd32',
    fontFamily: 'Montserrat_400Regular',
  },
  menuCourse: {
    fontSize: 16,
    color: '#f1f1f1',
    fontFamily: 'Montserrat_400Regular',
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
    marginTop: 20,
    fontFamily: 'Montserrat_400Regular',
  },
  inputContainer: {
    marginBottom: 25,
  },
  input: {
    backgroundColor: '#fff',
    color: '#1e1e2e',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontFamily: 'Montserrat_400Regular',
  },
  inputDescr: {
    backgroundColor: '#fff',
    color: '#1e1e2e',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    height: 100,
    fontFamily: 'Montserrat_400Regular',
  },
  picker: {
    backgroundColor: '#fff',
    color: '#1e1e2e',
    borderRadius: 8,
    marginBottom: 15,
    height: 50,
    fontFamily: 'Montserrat_400Regular',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4a4a8c',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginBottom: 10,
  },
  disabledButton: {
    backgroundColor: '#888',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Montserrat_700Bold',
  },
});
