import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import PetListByCategory from '../../components/Home/PetListByCategory'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '../../constants/Colors'
import { Link } from 'expo-router';

export default function home() {
  return (
    <View
      style={{
        padding:20,
        marginTop:20
      }}
    >
      {/* Header */}
        <Header/>
      {/* Slider */}
        <Slider/>
      {/* PetList + Category */}
      <PetListByCategory/>
      {/* Add new Pet Options */}
        <Link href={'/add-new-pet'}
          style={
          styles?.addNewPetContainer
        }>
          <MaterialIcons name="pets" size={24} color={Colors.PRIMARY} />
          <Text style={{
            fontFamily:'outfit-medium',
            color:Colors.PRIMARY,
            fontSize:18
          }}>Add New Pet</Text>
        </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  addNewPetContainer:{
    display:'flex',
          flexDirection:'row',
          gap:10,
          alignItems:'center',
          padding:20,
          marginTop:20,
          backgroundColor:Colors.LIGHT_PRIMARY,
          borderWidth:1,
          borderColor:Colors.PRIMARY,
          borderRadius:15,
          justifyContent:'center',
          borderStyle:'dashed',
          textAlign:'center'
  }
})