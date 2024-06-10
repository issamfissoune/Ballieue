import {View, Text, ScrollView, Image, Alert} from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {images} from '../../constants'
import {Link, router} from 'expo-router'
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import {createUser} from "../../lib/appwrite";


const SignUp = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = async () =>{
        if (!form.username || !form.email || !form.password) {
            Alert.alert("Account maken niet gelukt",
                    "Zorg ervoor dat alle gegevens zijn ingevuld")
        }
        setIsSubmitting(true)
        
        try{
           const result = await createUser(form.email, form.password, form.username)

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
                        Maak Account aan
                    </Text>
                    <FormField
                        title="Gebruikersnaam"
                        value={form.username}
                        handleChangeText={(e)=>setForm({...form, username: e})}
                        otherStyles="mt-5"
                    />
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
                        title="Registreren"
                        handlePress={submit}
                        containerStyles="mt-7"
                        isLoading={isSubmitting}
                    />

                    <View className="justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-white font-pregular">
                            Heb je wel een account?
                        </Text>
                        <Link href="/sign-in" className="text-lg font-semibold text-contrast">
                           Log hier in
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default SignUp
