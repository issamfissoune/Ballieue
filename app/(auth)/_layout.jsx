import {View, Text} from 'react-native'
import React from 'react'
import {Redirect, Stack} from 'expo-router'
import {useGlobalContext} from "../../context/GlobalProvider";

const AuthLayout = () => {
    const {Loading, isLogged} = useGlobalContext()

    if (!Loading && isLogged) return <Redirect href={"/home"}/>
    return (
        <>
           <Stack>
               <Stack.Screen
               name="sign-in"
               options={{
                   headerShown: false
               }}
               />
               <Stack.Screen
                   name="sign-up"
                   options={{
                       headerShown: false
                   }}
               />
               <Stack.Screen
                   name="game"
                   options={{
                       headerShown: false
                   }}
               />
               <Stack.Screen
                   name="detail"
                   options={{
                       headerShown: false
                   }}
               />

           </Stack>
        </>
    )
}
export default AuthLayout
