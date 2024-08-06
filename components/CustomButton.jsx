import {View, Text,TouchableOpacity} from 'react-native'
import React from 'react'
import {useGlobalContext} from "../context/GlobalProvider";

const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading}) => {
    const { themeMode } = useGlobalContext();


    return (
       <TouchableOpacity
           onPress={handlePress}
           activeOpacity={0.7}
           className={`rounded-xl min-h-[20px] justify-center items-center 
            ${containerStyles} ${isLoading ? 'opacity-50' : ""}
            ${themeMode === 'dark' ? 'bg-primary' : 'bg-contrast'}`}
       >
           <Text className="text-white font-psemibold text-lg">
               {title}
           </Text>
       </TouchableOpacity>
    )
}
export default CustomButton
