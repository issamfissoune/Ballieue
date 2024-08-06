import {View, Text, Image, ActivityIndicator, FlatList} from 'react-native'
import React, {useEffect, useState} from 'react'
import {getAllLocations} from "../lib/appwrite";
import {useGlobalContext} from "../context/GlobalProvider";
import {SafeAreaView} from "react-native-safe-area-context";
import Header from "../components/header";
import CustomButton from "../components/CustomButton";
import {useNavigation} from "expo-router";

//make the gamecard component to display all locations
const GameCard = ({location}) => {
    //use navigation to navigate to the map when pressing on a location
    const navigation = useNavigation()
    //check current theme and use the locations to loop through
    const {locations, themeMode} = useGlobalContext()

    //go to the game tab and send locations as props
    const handlePress = () =>{
        navigation.navigate("game", {locations})
    }
    return (
        <View className={`${themeMode === 'dark' ? 'bg-dark' : 'bg-white'} m-4  w-[90vw] rounded-2xl`}>
            <Image
                className="w-[100%] h-[150]"
                resizeMode="cover"
                source={{uri: location.image}}
            />
            <View className="flex-row justify-between max-w-fit">
                <Text className="text-lg font-psemibold items-start m-4 space-y-4">
                    {location.name}
                </Text>
                <CustomButton
                    title="Speel mee"
                    containerStyles="w-[90] h-[50] m-3"
                    handlePress={handlePress}
                />
            </View>
        </View>
    )
}

const GameField = () => {
    const {locations} = useGlobalContext()

    return (

            <FlatList
                showsHorizontalScrollIndicator={false}
                data={locations}
                keyExtractor={(item)=>item.$id}
                renderItem={({item})=> <GameCard location={item}/>}
                horizontal={true}
            />
    )
}
export default GameField
