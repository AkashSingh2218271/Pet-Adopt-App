import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./../../config/FirebaseConfig";
import { Colors } from "./../../constants/Colors";

export default function Category({category}) {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory]=useState('Birds');

  useEffect(() => {
    GetCategories();
  }, []);

  /** Used to Get Category List from DB */
  const GetCategories = async () => {
    setCategoryList([]); // Clear the current list before fetching new data
    const snapshot = await getDocs(collection(db, "Category")); // Use getDocs for a collection
    const categories = [];
    snapshot.forEach((doc) => {
      categories.push(doc.data()); // Push each document data into the categories array
    });
    setCategoryList(categories); // Update the state with all categories
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>
        Category
      </Text>
      <FlatList
        data={categoryList}
        numColumns={4}
        keyExtractor={(_item, index) => index.toString()} // Ensuring unique key for each item
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={()=>{
              setSelectedCategory(item.name);
              category(item.name)
            }}
            style={{
              flex: 1,
            }}
          >
            <View style={[styles.itemContainer, selectedCategory==item.name&&styles.selectedCategoryContainer]}>
              {item?.imageUrl ? (
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
              ) : (
                <Text
                  style={{
                    fontFamily: "outfit",
                  }}
                >
                  No Image Available
                </Text>
              )}
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "outfit",
                }}
              >
                {item?.name || "Unnamed Category"}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: Colors.LIGHT_PRIMARY,
    alignItems: "center",
    marginBottom: 10,
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.PRIMARY,
    margin: 5,
  },
  selectedCategoryContainer: {
    backgroundColor:Colors.SECONDARY
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20, // Optional, to make images round
  },
});
