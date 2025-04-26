import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../constants/Colors';

export default function AboutPet({ pet }) {
  const [readMore, setReadMore] = useState(false);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: 'outfit-medium', fontSize: 20 }}>
        About {pet?.name}
      </Text>

      <Text
        numberOfLines={readMore ? 20 : 2}
        style={{ fontFamily: 'outfit', fontSize: 14 }}
      >
        {pet?.about}
      </Text>

      {!readMore && pet?.about?.length > 100 && (
        <Pressable onPress={() => setReadMore(true)}>
          <Text
            style={{
              fontFamily: 'outfit-medium',
              fontSize: 12,
              color: Colors.GRAY,
            }}
          >
          Read more
          </Text>
        </Pressable>
      )}

      {readMore && (
        <Pressable onPress={() => setReadMore(false)}>
          <Text
            style={{
              fontFamily: 'outfit-medium',
              fontSize: 12,
              color: Colors.GRAY,
            }}
          >
          Read less
          </Text>
        </Pressable>
      )}
    </View>
  );
}
