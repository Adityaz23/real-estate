import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Redirect, Slot } from 'expo-router'
import {useGlobalContext} from "@/lib/globalProvider";
export default function AppLayout() {
    const {loading, isLoggedIn} = useGlobalContext()
    if(loading){
        return (
            <SafeAreaView className='bg-white h-full flex justify-center items-center'>
                <ActivityIndicator className='text-primary-300' size="large"/>
            </SafeAreaView>
        )
    }
    if(!isLoggedIn) return <Redirect href="/sign-in"/>
    //slot is the current screen which we wanna show.
    return <Slot />
}

const styles = StyleSheet.create({})