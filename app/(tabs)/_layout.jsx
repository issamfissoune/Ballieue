import {View, Text, Image} from 'react-native'
import {Tabs, Redirect} from "expo-router";
import React from 'react'

import {icons} from "../../constants"
import {useGlobalContext} from "../../context/GlobalProvider";

const TabIcon = ({icon, color, name, focused}) => {
    return (
        <View className="items-center justify-center gap-2">
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className="w-5 h-5"
            />
            <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{color: color}}>
                {name}
            </Text>
        </View>
    )
}
const TabsLayout = () => {
    const { themeMode } = useGlobalContext();


    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: "#FF7518",
                    tabBarInactiveTintColor: "#FFF",
                    tabBarStyle: {
                        backgroundColor: themeMode === 'dark' ? "#000" : "#2D6B51", // Change background color based on theme
                        borderTopWidth: 1,
                        borderTopColor: '#232533',
                        height: 85,
                    }
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: 'Home',
                        headerShown: false,
                        tabBarIcon: ({color, focused}) => (
                            <TabIcon
                                icon={icons.home}
                                color={color}
                                name="Home"
                                focused={focused}
                            />
                        )
                    }}
                />

                <Tabs.Screen
                    name="game"
                    options={{
                        title: 'Games',
                        headerShown: false,
                        tabBarIcon: ({color, focused}) => (
                            <TabIcon
                                icon={icons.football}
                                color={color}
                                name="Games"
                                focused={focused}
                            />
                        )
                    }}
                />

                <Tabs.Screen
                    name="character-screen"
                    options={{
                        title: 'Character-Screen',
                        headerShown: false,
                        tabBarIcon: ({color, focused}) => (
                            <TabIcon
                                icon={icons.profile}
                                color={color}
                                name="Character-screen"
                                focused={focused}
                            />
                        )
                    }}
                />
            </Tabs>
        </>
    )
}
export default TabsLayout
