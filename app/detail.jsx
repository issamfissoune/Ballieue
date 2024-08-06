import {View, Text, ScrollView, Image,} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {useEffect, useState} from 'react'
import {useRoute} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation} from "expo-router";
import Header from "../components/header";
import CustomButton from "../components/CustomButton";
import {useGlobalContext} from "../context/GlobalProvider";

const Detail = () => {
    const { themeMode } = useGlobalContext();
    const navigation = useNavigation();
    const route = useRoute();
   //use the routeparams to know which location has been pressed
    const { location } = route.params;

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
        checkIfFavorite();
    }, [navigation, location]);

    //check if the item is in favorites to make the button display something else
    const checkIfFavorite = async () => {
        try {
            const favorites = await AsyncStorage.getItem('favorites');
            let favoritesArray = favorites ? JSON.parse(favorites) : [];
            const isFav = favoritesArray.some(fav => fav.$id === location.$id);
            setIsFavorite(isFav);
        } catch (error) {
            console.log('Error checking favorites:', error);
        }
    };

    const handleToggleFavorite = async () => {
        try {
            const favorites = await AsyncStorage.getItem('favorites');
            let favoritesArray = favorites ? JSON.parse(favorites) : [];

            if (isFavorite) {
                // Remove from favorites
                favoritesArray = favoritesArray.filter(fav => fav.$id !== location.$id);
            } else {
                // Add to favorites
                favoritesArray.push(location);
            }

            await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.log('Error toggling favorite:', error);
        }
    };
    return (
        <SafeAreaView className={`h-full ${themeMode === 'dark' ? 'bg-black' : 'bg-primary'}`}>
            <Header/>
        <ScrollView >
            <View className="items-center mb-6">
            <Image
                className="w-[100vw] h-[200] "
                resizeMode="cover"
                source={{ uri: location.image }} />
            </View>
            <View className="m-4">
                <View className="mb-3">
                <Text className="text-4xl font-bold text-white">{location.name}</Text>
                </View>

                <View>
                <Text className="text-white text-lg font-pregular">{location.discription}</Text>
                </View>
            </View>
            <View className="items-center flex-col">
            <CustomButton title="Speel mee" containerStyles="w-[50vw] h-[45]"/>
                <CustomButton
                    title={isFavorite ? "Unfavorite" : "Favorite"}
                    handlePress={handleToggleFavorite}
                    containerStyles="w-[50vw] h-[45] mt-4"
                />
            </View>

        </ScrollView>
        </SafeAreaView>
    )
}
export default Detail
