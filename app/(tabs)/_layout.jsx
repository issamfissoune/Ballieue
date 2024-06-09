import {View, Text, Image} from 'react-native'
import {Tabs, Redirect} from "expo-router";
import React from 'react'

import {icons} from "../../constants"

const TabIcon = ({icon, color, name, focused}) => {
    return (
        <View className="items-center justify-center gap-2">
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className="w-5 h-5"
            />
            <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}>
                {name}
            </Text>
        </View>
    )
}
const TabsLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false
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