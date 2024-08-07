import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import useFetch from '@/hooks/useFetch'
import { SafeAreaView } from 'react-native-safe-area-context'

const Page = () => {
    const {id} = useLocalSearchParams()
    const { data: product, error, loading } = useFetch(`http://10.0.2.2:8000/products/${id}`);
    if (loading) return <View style={{flex:1, justifyContent:'center', alignItems: 'center', backgroundColor: 'white'}}><Text style={{fontSize:24}}>Loading...</Text></View>;
    if (error) return <View style={{flex:1, justifyContent:'center', alignItems: 'center', backgroundColor: 'white'}}><Text style={{fontSize:24}}>We encountered an error fetching the data. Kindly Check your internet connection.</Text></View>;
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerShown: true,
          title: `${product.name}`,
          headerTitleAlign: "center",
        }}
      />
    </SafeAreaView>
  )
}

export default Page

const styles = StyleSheet.create({})