import { View, Text, Image} from 'react-native'
import React from 'react'
import PetSubInfoCard from './PetSubInfoCard'

// Importing your icons here
import CalendarIcon from './../../assets/images/calendar.png';
import BoneIcon from './../../assets/images/bone.png';
import SexIcon from './../../assets/images/sex.png';
import WeightIcon from './../../assets/images/weight.png';

export default function PetSubInfo({pet}) {
  return (
    <View style={{
        paddingHorizontal:15,

    }}>
        <View style={{
            display:'flex',
            flexDirection:'row'
        }}>
         <PetSubInfoCard 
          icon={CalendarIcon}  // Pass the imported image
          title={'Age'}
          value={pet?.age+" years"}
        />
        <PetSubInfoCard 
          icon={BoneIcon}  // Pass the imported image
          title={'Breed'}
          value={pet?.breed}
        />
        
        </View>

        <View style={{
            display:'flex',
            flexDirection:'row'
        }}>
         <PetSubInfoCard 
          icon={SexIcon}  // Pass the imported image
          title={'Sex'}
          value={pet?.sex}
        />
        <PetSubInfoCard 
          icon={WeightIcon}  // Pass the imported image
          title={'Weight'}
          value={pet?.weight+" kg"}
        />
        </View>
    </View>
  )
}


