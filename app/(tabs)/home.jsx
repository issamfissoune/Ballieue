import {View, Text, FlatList, ImageBackground, Image} from 'react-native'
import React, {useEffect, useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {images, icons} from "../../constants"
import Challenges from "../../components/Challenges";
import CustomButton from "../../components/CustomButton";
import {listSessions, logout} from "../../lib/appwrite";
import {useGlobalContext} from "../../context/GlobalProvider";
import {router} from "expo-router";
import GameField from "../../components/GameField";
const Home = () => {
    const {setUser, setIsLogged, user, users, themeMode} = useGlobalContext()




    return (
        <SafeAreaView className={`h-full ${themeMode === 'dark' ? 'bg-black' : 'bg-primary'}`}>
            <FlatList
            data={users}
            keyExtractor={(item)=> item.$id}
            renderItem={({item})=>(
                <View className="bg-contrast w-[90vw] ml-5">
                <View className="flex-row justify-between m-4 items-center rounded-2xl">
                    <View>
                        <Text className="text-2xl text-white">
                            {item.username}
                        </Text>
                    </View>
                <View>
                    <Text className="font-pregular text-lg text-white">
                        {item.position}
                    </Text>
                </View>
                    <View>
                        <Image
                            className="w-[50] h-[50] rounded-2xl"
                            resizeMode="contain"
                            source={{uri: item.avatar}}
                        />
                    </View>
                </View>
                </View>

            )}
            ListHeaderComponent={()=>(
                <View className = "my-6 px-4 space-y-6">
                    <View className="justify-between items-start flex-row mb-6">
                        <View>
                            <Text className="font-pmedium text-2xl text-white">
                                Hi
                            </Text>
                            <Text className="text-3xl font-psemibold text-contrast">
                                {user?.username}
                            </Text>
                        </View>
                        <View className="mt-1.5">
                            <Image
                              source={themeMode === 'dark' ? images.darklogo : images.logo2}
                              className="w-[70] h-[70]"
                              resizeMode="contain"
                            />
                        </View>
                    </View>
                    <View className="w-full flex-1 pt-1 pb-5">
                        <View className="flex-row items-center">
                        <View>
                            <Image
                                source={icons.trophee}
                                className="w-[40] h-[40] mb-2 white"
                                resizeMode="contain"
                            />
                        </View>
                        <View>
                            <Text className="text-lg font-psemibold text-white">
                                Achievements
                            </Text>
                        </View>
                        </View>
                        <Challenges/>
                        <View className="flex-row items-center mt-6">
                            <View>
                                <Image
                                    source={icons.field}
                                    className="w-[40] h-[40] mb-2 white"
                                    resizeMode="contain"
                                />
                            </View>
                            <View>
                                <Text className="text-lg font-psemibold text-white">
                                    Wedstrijden
                                </Text>
                            </View>
                        </View>
                        <GameField/>
                    </View>
                    <View className="flex-row items-center mt-6">
                        <View>
                            <Image
                                source={icons.ranking}
                                className="w-[40] h-[40] mb-2 white"
                                resizeMode="contain"
                            />
                        </View>
                        <View>
                            <Text className="text-lg font-psemibold text-white">
                                Top spelers
                            </Text>
                        </View>
                    </View>
                </View>
            )}

            />

        </SafeAreaView>
    )
}
export default Home
