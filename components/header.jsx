import {View, Text, Image} from 'react-native'
import React from 'react'
import {images} from "../constants"
import {useGlobalContext} from "../context/GlobalProvider";

const Header = () => {
    const {themeMode} = useGlobalContext()

    return (
        <View className="items-center pb-4 mt-3 h-[100]">
            <Image className="w-[65] h-[65]"
                   source={themeMode === 'dark' ? images.darklogo : images.logo2}
            />
        </View>
    )
}
export default Header

