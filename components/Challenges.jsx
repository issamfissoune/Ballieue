import {View, Text, FlatList, Image} from 'react-native'
import React from 'react'
import {icons} from "../constants"
import CustomButton from "./CustomButton";
import LinearGradient from "react-native-linear-gradient";
import {useGlobalContext} from "../context/GlobalProvider";

const challenges = [
    {id: 1, name: "Celebration", icon: icons.celebration },
    {id: 2, name: "Freestyler", icon: icons.freestyler },
    {id: 3, name: "KOPPIE!", icon: icons.header },
    {id: 4, name: "Clean sheet", icon: icons.keeper },
    {id: 5, name: "Bicycle Kick", icon: icons.shooter },






]
const Challenges = () => {
    const {themeMode} = useGlobalContext()
    return (
    <View className={`bg-secondary items-center rounded-2xl h-[300] ${themeMode === 'dark' ? 'bg-dark' : 'bg-secondary'}`}>
        <FlatList
            showsHorizontalScrollIndicator={false}
            data={challenges}
            keyExtractor={(item) => item.id}
            renderItem={({item})=>(
                <View className=" ">
                <View className="items-center">
                  <Image source={item.icon}
                         className="w-[30vw] mx-7 h-[20vh]"
                         resizeMode="contain"
                  />
                  <Text className="font-psemibold text-xl">
                      {item.name}
                  </Text>
                </View>
                </View>

            )}
         horizontal
        />
        <CustomButton
            title="Bekijk Alle Challenges"
            containerStyles="w-[55vw] h-[55] mb-5 "
        />

    </View>
    )
}
export default Challenges
