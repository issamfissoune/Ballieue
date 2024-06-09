import {StatusBar} from "expo-status-bar";
import {StyleSheet, Text, View} from 'react-native'
import {Link} from 'expo-router'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";

const Index = () => {
    return (
        <View className="flex-1 items-center justify-center bg-primary">
            <Text>Index</Text>
            <StatusBar/>
            <Link href="/home">Home</Link>
        </View>
    )
}
export default Index
const styles = StyleSheet.create({})
