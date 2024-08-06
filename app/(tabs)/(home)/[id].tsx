import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import useFetch from '@/hooks/useFetch'

const Page = () => {
    const {id} = useLocalSearchParams()
    const { data: product, error, loading } = useFetch(`http://10.0.2.2:8000/products/${id}`);
console.log(product);

  return (
    <View>
      <Text>{product.name}</Text>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({})