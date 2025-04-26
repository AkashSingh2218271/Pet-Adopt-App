import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  ToastAndroid
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { Colors } from "./../../constants/Colors";
import { db } from '../../config/FirebaseConfig';
import { getDocs, collection } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';

export default function AddNewPet() {
  const navigation = useNavigation();
  const [petData, setPetData] = useState({
    name: "",
    breed: "",
    age: "",
    sex: "male",
    weight: "",
    address: "",
    about: "",
    category: ""
  });

  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [image, setImage] = useState();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Pet",
    });
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "Category"));
      const categories = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCategoryList(categories);
      
      // Set initial category if available
      if (categories.length > 0) {
        setPetData(prev => ({
          ...prev,
          category: categories[0].id
        }));
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching categories: ", err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Use to pick image from gallery
   */
  const imagePicker=async()=>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  const handleInputChange = (fieldName, value) => {
    setPetData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const onSumbit=()=>{
    console.log("Form Data:", petData);
    if (!petData.name || !petData.breed || !petData.age || 
      !petData.weight || !petData.address || !petData.about || 
      !petData.category || !image) {
    ToastAndroid.show("Please fill all details and select an image", ToastAndroid.SHORT);
    return;
    }
    ToastAndroid.show("Pet added successfully!", ToastAndroid.SHORT);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.header}>Add New Pet for adoption</Text>
      <Pressable onPress={imagePicker}>
      {!image? <Image
        source={require("../../assets/images/placeholder.png")}
        style={styles.petImage}
      />:
      <Image style={styles.petImage} source={{uri:image}}/>}
      </Pressable>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Name*</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter pet name"
          placeholderTextColor={Colors.GRAY}
          onChangeText={(value) => handleInputChange("name", value)}
          value={petData.name}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Category*</Text>
        {loading ? (
          <ActivityIndicator size="small" color={Colors.PRIMARY} />
        ) : error ? (
          <Text style={styles.errorText}>Error loading categories</Text>
        ) : (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={petData.category}
              onValueChange={(value) => handleInputChange("category", value)}
              style={styles.picker}
              dropdownIconColor={Colors.PRIMARY}
            >
              {categoryList.map((category) => (
                <Picker.Item
                  key={category.id}
                  label={category.name}
                  value={category.id}
                />
              ))}
            </Picker>
          </View>
        )}
      </View>

      {/* Rest of your form fields remain the same */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Breed*</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter pet breed"
          placeholderTextColor={Colors.GRAY}
          onChangeText={(value) => handleInputChange("breed", value)}
          value={petData.breed}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Sex*</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={petData.sex}
            onValueChange={(value) => handleInputChange("sex", value)}
            style={styles.picker}
            dropdownIconColor={Colors.PRIMARY}
          >
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Age*</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter pet age"
          placeholderTextColor={Colors.GRAY}
          keyboardType="numeric"
          onChangeText={(value) => handleInputChange("age", value)}
          value={petData.age}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight*</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter weight (kg)"
          placeholderTextColor={Colors.GRAY}
          keyboardType="numeric"
          onChangeText={(value) => handleInputChange("weight", value)}
          value={petData.weight}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address*</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter address"
          placeholderTextColor={Colors.GRAY}
          onChangeText={(value) => handleInputChange("address", value)}
          value={petData.address}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>About*</Text>
        <ScrollView style={styles.textareaContainer} nestedScrollEnabled={true}>
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="Tell us about the pet..."
            placeholderTextColor={Colors.GRAY}
            multiline={true}
            textAlignVertical="top"
            onChangeText={(value) => handleInputChange("about", value)}
            value={petData.about}
            blurOnSubmit={false}
          />
        </ScrollView>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={onSumbit}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.LIGHT_BACKGROUND,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    fontFamily: "outfit-medium",
    fontSize: 20,
    marginBottom: 20,
    color: Colors.PRIMARY,
  },
  petImage: {
    width: 100,
    height: 100,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    alignSelf: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontFamily: "outfit-medium",
    color: Colors.DARK_TEXT,
  },
  input: {
    padding: 12,
    backgroundColor: Colors.WHITE,
    borderRadius: 8,
    fontFamily: "outfit",
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
    borderRadius: 8,
    backgroundColor: Colors.WHITE,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  textareaContainer: {
    maxHeight: 150,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
    borderRadius: 8,
  },
  textarea: {
    height: 150,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  button: {
    padding: 15,
    borderRadius: 7,
    backgroundColor: Colors.PRIMARY,
    marginVertical: 10,
  },
  buttonText: {
    fontFamily: "outfit-medium",
    textAlign: "center",
    color: Colors.WHITE,
  },
});