import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Category from './Category'
import { collection, query, where, getDocs  } from 'firebase/firestore'
import PetListItem from './PetListItem';
import { db } from '../../config/FirebaseConfig'

export default function PetListByCategory() {
    const [petList, setPetList]=useState([]);
    const [loader, setLoader]=useState(false);

    useEffect(()=>{
        GetPetList('Birds')
    }, [])
    /**
     * Use to get Pet List on Category Selection
     * @param {*} category 
     */
    const GetPetList=async (category)=>{
        setPetList([]);
        setLoader(true);
        const q=query(collection(db, 'Pets'), where('category','==',category))
        const querySnapshot=await getDocs(q);

        querySnapshot.forEach(doc=>{
            setPetList(petList=>[...petList,doc.data()])
        })
        setLoader(false);
    }

  return (
    <View>
      <Category category={(value)=>GetPetList(value)}/>
        <FlatList
            data={petList}
            style={{marginTop:10}}
            horizontal={true}
            refreshing={loader}
            onRefresh={()=>GetPetList('Birds')}
            renderItem={({item,index})=>(
                <PetListItem pet={item}/>
            )}
        >

        </FlatList>
    </View>
  )
}