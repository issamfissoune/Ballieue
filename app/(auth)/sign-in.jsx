import {View, Text, ScrollView, Image, Alert} from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {images} from '../../constants'
import {Link, router} from 'expo-router'
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import {signIn} from "../../lib/appwrite";

const SignIn = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = async () =>{
        if (!form.email || !form.password) {
            Alert.alert("Inloggen niet gelukt",
                "Email of wachtwoord kloppen niet")
        }
        setIsSubmitting(true)

        try{
             await signIn(form.email, form.password)

            router.replace('/home')
        }catch (error) {
            Alert.alert("Error", error.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full justify-center min-h-[80vh] px-4 my-6">
                <Image
                source={images.logo2}
                resizeMode='contain'
                className="w-[115px] h-[200px]"
                />
                <Text className="text-2xl text-white text-semibold mt-3 font-psemibold">
                    Inloggen
                </Text>
                <FormField
                    title="Email"
                    value={form.email}
                    handleChangeText={(e)=>setForm({...form, email: e})}
                    otherStyles="mt-5"
                    keyboardType="email-address"
                />
                <FormField
                    title="Password"
                    value={form.password}
                    handleChangeText={(e)=>setForm({...form, password: e})}
                    otherStyles="mt-3"
                />
                    <CustomButton
                        title="Inloggen"
                        handlePress={submit}
                        containerStyles="mt-7 h-[50]"
                        isLoading={isSubmitting}
                    />

                    <View className="justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-white font-pregular">
                            Nog geen account?
                        </Text>
                        <Link href="/sign-up" className="text-lg font-semibold text-contrast">
                            Maak account
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default SignIn
