import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import Shared from './../../Shared/Shared'
import { useUser } from '@clerk/clerk-expo'
import {useState} from 'react'
import { collection, query, QuerySnapshot } from 'firebase/firestore'

export default function Favorite() {
  
  const {user}=useUser();
  const [favIds, setFavIds]=useState([]);

  useEffect(()=>{
    user&&GetFavPetIds();
  },[user])

  // Fav ids
  const GetFavPetIds=async()=>{
    await Shared.GetFavList(user);
    setFavIds(result?.favorites);
  }
  // Fetch Related Pet list
  const GetFavPetList=async ()=>{
    const q=query(collection(db, 'Pets'), where('id', 'in', favIds));
    const querySnapshot=await getDocs(q);

    QuerySnapshot.forEach((doc)=>{
      console.log(doc.data());
    })
  }
  return (
    <View style={{
      padding:20,
      marginTop:20
    }}>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:30
      }}>Favorites</Text>
    </View>
  )
}