import {Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import images from '@/constants/images'
import icons from '@/constants/icons'
interface Props{
    onPress?: ()=> void
}
export const Featured = ({onPress}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} className='flex flex-col items-start w-60 h-80 relative'>
        <Image source={images.japan} className='size-full rounded-2xl'/>
        <Image source={images.cardGradient} className='size-full rounded-2xl absolute bottom-1'/>
        <View>
            <Image source={icons.star} className='size-3.5'/>
        </View>
    </TouchableOpacity>
  )
}

export const Regular = () =>{
    return (
        <View>
          <Text>Regular</Text>
        </View>
      )
}

const styles = StyleSheet.create({})