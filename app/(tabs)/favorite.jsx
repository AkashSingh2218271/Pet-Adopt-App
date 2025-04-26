import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import Shared from './../../Shared/Shared'
import { useUser } from '@clerk/clerk-expo'
import {useState} from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore';
import PetListItem from './../../components/Home/PetListItem';
import { db } from '../../config/FirebaseConfig';

export default function Favorite() {
  
  const {user}=useUser();
  const [favIds, setFavIds]=useState([]);
  const [favPetList, setFavPetList]=useState([]);
  const [loder, setLoader]=useState(false);

  useEffect(()=>{
    if (user) {
      GetFavPetIds();
    }
  },[user])

  // Fav ids
  const GetFavPetIds=async()=>{
    setLoader(true)
    const result = await Shared.GetFavList(user);
    setFavIds(result?.favorites);
    await GetFavPetList(result?.favorites);
    setLoader(false) 
  }
  // Fetch Related Pet list
  const GetFavPetList=async (favIds)=>{
    setLoader(false)
    setFavPetList([])
    const q=query(collection(db, 'Pets'), where('id', 'in', favIds));
    const querySnapshot=await getDocs(q);

    querySnapshot.forEach((doc)=>{
      console.log(doc.data());
      setFavPetList(prev=>[...prev, doc.data()])
    })
    setLoader(true);
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

      <FlatList 
        data={favPetList}
        onRefresh={GetFavPetIds}
        refreshing={loder}
        numColumns={2}
        renderItem={({item, index})=>(
            <View>
              <PetListItem pet={item}/>
            </View>
        )}
      >
      </FlatList>
    </View>
  )
}