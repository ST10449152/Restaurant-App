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

// Define the type for the MenuItem's props
interface MenuItemProps {
  name: string;
  description: string;
  price: number;
  course: string;
}

// Define the type for the course
interface Course {
  id: number;
  name: string;
}

const courseList: Course[] = [
  { id: 1, name: 'hors d oeuvre' },
  { id: 2, name: 'amuse-bouche' },
  { id: 3, name: 'soup' },
  { id: 4, name: 'appetizer' },
  { id: 5, name: 'salad' },
  { id: 6, name: 'fish' },
  { id: 7, name: 'first main course' },
  { id: 8, name: 'palate cleanser' },
  { id: 9, name: 'second main course' },
  { id: 10, name: 'cheese course' },
  { id: 11, name: 'dessert' },
  { id: 12, name: 'mignardise' },
];

const MenuItem = ({ name, description, price, course }: MenuItemProps) => (
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
  const [menuList, setMenuList] = useState<MenuItemProps[]>([]);
  const [total, setTotal] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return null; 
  }

  const handleSaveMenuItem = () => {
    if (!mName || !mDescription || isNaN(parseFloat(mPrice)) || !mCourse) {
      Alert.alert('Error', 'Please fill out all fields correctly.');
      return;
    }
    const newMenuItem = {
      name: mName,
      description: mDescription,
      price: parseFloat(mPrice),
      course: mCourse,
    };

    const updatedMenuList = [...menuList, newMenuItem];
    setMenuList(updatedMenuList);
    setTotal(updatedMenuList.length);

    Alert.alert('Success', 'Menu item added successfully');

    setMName('');
    setMDescription('');
    setMPrice('');
    setMCourse('');
    setIsAdding(false);
  };

  const calculateAveragePriceByCourse = () => {
    const pricesByCourse: { [key: string]: number[] } = {};

    menuList.forEach((item) => {
      if (!pricesByCourse[item.course]) {
        pricesByCourse[item.course] = [];
      }
      pricesByCourse[item.course].push(item.price);
    });

    const averages = Object.keys(pricesByCourse).map((course) => {
      const total = pricesByCourse[course].reduce((sum, price) => sum + price, 0);
      const avg = (total / pricesByCourse[course].length).toFixed(2);
      return `${course}: R${avg}`;
    });

    return averages.length > 0 ? averages.join('\n') : 'No menu items yet.';
  };

  const renderMenuScreen = () => (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Christoffel's Culinary Dishes</Text>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.statsText}>TOTAL ITEMS</Text>
          <Text style={styles.statsNumber}>{total}</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.statsText}>AVERAGE PRICE BY COURSE</Text>
          <Text style={styles.statsNumber}>{calculateAveragePriceByCourse()}</Text>
        </View>
      </View>
      <FlatList
        data={menuList}
        renderItem={({ item }) => (
          <MenuItem
            name={item.name}
            description={item.description}
            price={item.price}
            course={item.course}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.emptyMessage}>Empty Menu</Text>}
      />
      <TouchableOpacity onPress={() => setIsAdding(true)} style={styles.button}>
        <Text style={styles.buttonText}>ADD MENU ITEM</Text>
      </TouchableOpacity>
    </View>
  );

  const renderAddItemScreen = () => (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>ADD MENU ITEM</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Name"
          onChangeText={setMName}
          value={mName}
          style={styles.input}
        />
        <TextInput
          placeholder="Description"
          onChangeText={setMDescription}
          value={mDescription}
          multiline={true}
          style={styles.inputDescr}
        />
        <TextInput
          placeholder="Price"
          onChangeText={setMPrice}
          value={mPrice}
          keyboardType="numeric"
          style={styles.input}
        />
        <Picker
          selectedValue={mCourse || ""}
          onValueChange={(itemValue) => setMCourse(itemValue)}
          style={styles.picker}>
          <Picker.Item label="Select a Course" value="" />
          {courseList.map((item) => (
            <Picker.Item label={item.name} value={item.name} key={item.id} />
          ))}
        </Picker>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSaveMenuItem} style={styles.button}>
          <Text style={styles.buttonText}>SAVE</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsAdding(false)} style={styles.button}>
          <Text style={styles.buttonText}>BACK TO MENU</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (isAdding ? renderAddItemScreen() : renderMenuScreen());
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
    justifyContent: 'space-between', // Ensures even spacing between items
    marginBottom: 25,
    paddingHorizontal: 10, // Added padding for spacing within the container
  },
  totalContainer: {
    alignItems: 'center',
    flex: 1, // Ensures each child takes equal space
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
    fontSize: 14,
    color: '#ffffff',
    fontFamily: 'Montserrat_400Regular',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ffd700',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    color: '#f1f1f1',
    fontFamily: 'Montserrat_400Regular',
  },
  inputDescr: {
    height: 60,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#ffd700',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    color: '#f1f1f1',
    fontFamily: 'Montserrat_400Regular',
  },
  picker: {
    height: 50,
    color: '#f1f1f1',
    borderColor: '#ffd700',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#ffd700',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Montserrat_700Bold',
    color: '#1e1e2e',
  },
  emptyMessage: {
    color: '#f1f1f1',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
    fontFamily: 'Montserrat_400Regular',
  },
});
