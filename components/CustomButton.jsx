import {View, Text,TouchableOpacity} from 'react-native'
import React from 'react'

const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading}) => {
    return (
       <TouchableOpacity
           onPress={handlePress}
           activeOpacity={0.7}
           className={`bg-contrast rounded-xl min-h-[62px] justify-center items-center 
           ${containerStyles} ${isLoading ? 'opacity-50' : ""}`}
       >
           <Text className="text-white font-psemibold text-lg">
               {title}
           </Text>
       </TouchableOpacity>
    )
}
export default CustomButton