import {StatusBar} from "expo-status-bar";
import {ScrollView, StyleSheet, Text, View, Image} from 'react-native'
import {Redirect, router} from 'expo-router'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {images} from "../constants"
import CustomButton from "../components/CustomButton";
import {useGlobalContext} from "../context/GlobalProvider";
import {logout} from "../lib/appwrite";

const Index = () => {
    const {isLoading, isLoggedIn} = useGlobalContext()

    if(!isLoading && isLoggedIn ) return <Redirect href="/home"/>


    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{height: '100%'}}>
              <View className="w-full flex justify-center items-center min-h-[85vh] px-4">
                  <Image
                      source={images.logo}
                      className="w-[230px] h-[284px]"

                  />
                  <View className="relative mt-3">
                      <Text className="text-3xl text-white font-bold text-center">
                          Where champions begin {" "}
                          <Text className="text-contrast">
                               Welcome to Ballieue
                          </Text>
                      </Text>
                  </View>
                  <Text className="text-sm font-pregular text-white mt-7 text-center">
                      Proof that you are the king of the fields, by playing matches and winning prizes.
                  </Text>
                  <CustomButton
                    title="Inloggen met Email"
                    handlePress={()=>router.push('/sign-in')}
                    containerStyles="w-full mt-7 h-[55]"
                  />
              </View>
            </ScrollView>
            <StatusBar backgroundColor='#161622' style='light'/>
        </SafeAreaView>
    )
}
export default Index
const styles = StyleSheet.create({})
