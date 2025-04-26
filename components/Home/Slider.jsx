import { View, Text, FlatList, StyleSheet, Image, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { db } from './../../config/FirebaseConfig'; // Use db here
import { collection, getDocs } from 'firebase/firestore';

export default function Slider() {
  const [sliderList, setSliderList] = useState([]); // Initialize as an array

  useEffect(() => {
    GetSlider();
  }, []);

  const GetSlider = async () => {
    const snapshot = await getDocs(collection(db, 'Sliders'));
    const sliders = [];
    snapshot.forEach((doc) => {
      sliders.push(doc.data());
    });
    setSliderList(sliders); // Update state with the full list of sliders
  };

  return (
    <View style={{
        marginTop:15
    }}>
      <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View>
            <Image
              source={{ uri: item?.imageUrl }}
              style={styles?.sliderImage}
            />
          </View>
        )}
        keyExtractor={(_item, index) => index.toString()} // Ensure each item has a unique key
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sliderImage: {
    width:Dimensions.get('screen').width*0.9,
    height: 150,
    borderRadius:15,
    marginRight:15
  },
});
