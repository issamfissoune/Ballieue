import {View, Text, Image, ActivityIndicator, FlatList, StyleSheet} from 'react-native'
import React, {useEffect, useState, } from 'react'
import {getAllLocations} from "../../lib/appwrite";
import {useGlobalContext} from "../../context/GlobalProvider";
import {SafeAreaView} from "react-native-safe-area-context";
import Header from "../../components/header";
import CustomButton from "../../components/CustomButton";
import MapView, {Marker} from "react-native-maps";
import {useNavigation} from "expo-router";
import {useRoute} from "@react-navigation/native";

const Game = () => {
    //use navigation to go to detail page
    const navigation = useNavigation()
    //get locations from globalcontext
    const {locations} = useGlobalContext()

    //send location data as props
    const handleMarkerPress = (loc) => {
        navigation.navigate('detail', {location: loc});
    };

    return (
        <MapView
            style={styles.map}
            region={{longitude: 4.48541012993528 , latitude: 51.925398896740724, longitudeDelta: 0.25, latitudeDelta: 0.02}}
        >

            {locations.map((loc) => (
                <Marker
                    key={loc.$id}
                    coordinate={{
                        latitude: loc.latitude,
                        longitude: loc.longitude,
                    }}
                    title={loc.name}
                    onPress={() => handleMarkerPress(loc)}
                />
            ))}
        </MapView>
    );
};

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
});


export default Game;
