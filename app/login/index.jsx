import { View, Text, Image, Pressable } from "react-native";
import React, { useEffect } from "react";
import Colors from '../../constants/Colors'
import * as WebBrowser from 'expo-web-browser'
import { useOAuth } from '@clerk/clerk-expo';
import * as linking from 'expo-linking';

export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const handleOAuthSignIn = async () => {
    try {
      const { createdSessionId, signIn, signUp } = await startOAuthFlow({
        redirectUrl: linking.createURL("/(tabs)/home", {scheme: 'myapp'}),
      });

      if (createdSessionId) {
        // Set the session as active if sign-in was successful
        await Clerk.setActive({ session: createdSessionId });
      }
    } catch (err) {
      console.error("OAuth sign-in error:", err);
    }
  };

  return (
    <View style={{
      backgroundColor:Colors.WHITE,
      height: '100%',
    }}>
      <Image source={require("./../../assets/images/login.png")}
        style={{
          width: '100%',
          height: 450
        }}
      />
      <View style={{
        padding: 10,
        display: 'flex',
        alignItems: 'center'
      }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 30,
          textAlign: 'center'
        }}>Ready to make new friend?</Text>

        <Text style={{
          fontFamily: 'outfit',
          fontSize: 18,
          textAlign: 'center',
          color: Colors.GRAY
        }}>
          Let's adopt the pet which you like and make their life happy again
        </Text>

        <Pressable
          style={{
            padding: 14,
            marginTop: 100,
            backgroundColor: Colors.PRIMARY,
            width: '100%',
            borderRadius: 14
          }}
          onPress={handleOAuthSignIn}
        >
          <Text style={{
            fontFamily: 'outfit-medium',
            fontSize: 20,
            textAlign: 'center'
          }}>
            Get Started
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
