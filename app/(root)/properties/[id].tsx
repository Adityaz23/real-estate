import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSearchParams } from 'expo-router/build/hooks'

export default function Property() {
    const [id] = useSearchParams();
  return (
    <View>
        {/* // To see in which properry we are on. */}
      <Text>Property{id}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})