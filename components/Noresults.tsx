import { View, Text, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images'

const Noresults = () => {
  return (
    <View className='flex items-center my-5'>
        <Image source={images.noResult} className='w-11/12 h-80' resizeMode='contain'/>
        <Text className='text-2xl font-rubik-bold text-black mt-5'>No Results!</Text>
        <Text className='text-base text-black mt-2'>Sorry! We could not find any results.</Text>
    </View>
  )
}

export default Noresults