import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../context/GlobalProvider';
import Header from "../../components/header";
import CustomButton from "../../components/CustomButton";
import {logout} from "../../lib/appwrite";
import {router} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CharacterScreen = () => {
    //get user to display name and handle thememode here
    const {setUser, setIsLogged, user, setThemeMode, themeMode} = useGlobalContext()
    //get items that are saved to the localstorage as favorites
    const [favorites, setFavorites] = useState([]);

    //get all the favorites from localstorage
    const loadFavorites = async () => {
        try {
            const favoritesData = await AsyncStorage.getItem('favorites');
            if (favoritesData) {
                setFavorites(JSON.parse(favoritesData));
            }
        } catch (error) {
            console.log('Error loading favorites:', error);
        }
    };

    //if there are any changes in localstorage update it on change
    useEffect(() => {
        const intervalId = setInterval(loadFavorites, 1000); // Check for updates every second

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    //logout user
    const handleLogout = async () => {
        await logout();
        setUser(null)
        setIsLogged(false)
        router.replace("/sign-in")
    };

    //switch theme modes
    const toggleTheme = () => {
        setThemeMode(prevMode => prevMode === "light" ? "dark" : "light");
    };

    return (
        <SafeAreaView className={`h-full items-center ${themeMode === 'dark' ? 'bg-black' : 'bg-primary'}`}>
            <Header/>
            <ScrollView className="w-[80vw]">
                <View style={styles.card}>
                    <Image
                        style={styles.avatar}
                        source={{ uri: user.avatar }}
                    />
                    <Text style={styles.name}>{user.username}</Text>
                    <View style={styles.statsContainer}>
                        <View style={styles.stat}>
                            <Text style={styles.statLabel}>Pace</Text>
                            <Text style={styles.statValue}>{user.pace}</Text>
                        </View>
                        <View style={styles.stat}>
                            <Text style={styles.statLabel}>Shooting</Text>
                            <Text style={styles.statValue}>{user.shooting}</Text>
                        </View>
                        <View style={styles.stat}>
                            <Text style={styles.statLabel}>Passing</Text>
                            <Text style={styles.statValue}>{user.passing}</Text>
                        </View>
                        <View style={styles.stat}>
                            <Text style={styles.statLabel}>Dribbling</Text>
                            <Text style={styles.statValue}>{user.dribbling}</Text>
                        </View>
                        <View style={styles.stat}>
                            <Text style={styles.statLabel}>Defense</Text>
                            <Text style={styles.statValue}>{user.defense}</Text>
                        </View>
                        <View style={styles.stat}>
                            <Text style={styles.statLabel}>Physical</Text>
                            <Text style={styles.statValue}>{user.physical}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.favoritesContainer}>
                    <Text style={styles.favoritesTitle}>Favorites</Text>
                    {favorites.length > 0 ? (
                        favorites.map((fav, index) => (
                            <View key={index} style={styles.favoriteItem}>
                                <Image
                                    style={styles.favoriteImage}
                                    source={{ uri: fav.image }}
                                />
                                <Text
                                    style={styles.favoriteName}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                >
                                    {fav.name}
                                </Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noFavoritesText}>No favorites added yet.</Text>
                    )}
                </View>
                <View className="mt-5 items-center">
                    <CustomButton title="Toggle Theme" handlePress={toggleTheme} containerStyles="mb-5 h-[55] w-[50vw]" />
                    <CustomButton title="Logout" handlePress={handleLogout} containerStyles="h-[55] w-[50vw]" />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        width: '90%',
        borderRadius: 15,
        alignItems: 'center',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    statsContainer: {
        width: '100%',
    },
    stat: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    statLabel: {
        fontSize: 18,
        fontWeight: '600',
    },
    statValue: {
        fontSize: 18,
        fontWeight: '600',
        color: '#007AFF',
    },
    favoritesContainer: {
        marginTop: 20,
        padding: 10,
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    favoritesTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    favoriteItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    favoriteImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    favoriteName: {
        fontSize: 18,
        fontWeight: '600',
        flex: 1,
    },
    noFavoritesText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        color: '#888',
    },
});


export default CharacterScreen;
