import { View, Text, Image } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function PetSubInfoCard({icon, title, value}) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.WHITE,
        padding: 10,
        margin: 5,
        borderRadius: 8,
        gap: 5,
        flex: 1,
      }}
    >
      <Image
        source={icon}
        style={{
          width: 40,
          height: 40,
          marginRight: 10,
        }}
      />
      <View style={{
            flex:1,
      }}>
        <Text
          style={{
            fontFamily: "out-fit",
            fontSize:12,
            color: Colors.GRAY,
          }}
        >
        {title}
        </Text>
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize:12
          }}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}
