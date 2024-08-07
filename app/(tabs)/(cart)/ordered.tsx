import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import useStore from '@/state/store'

const ordered = () => {
    const { clearCart } = useStore(state => state)
    
    useEffect(() => {
        clearCart()
    },[])
  return (
    <SafeAreaView style={{flex:1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', gap:20}}>
          <Image source={require('@/assets/images/3905230.jpg')} style={{ width: 200, height: 200 }} />
          <Text style={{fontSize:24, fontWeight: 'bold'}}>Order Placed Successfully</Text>
      <Link replace href={'/(home)'}>Go Home</Link>
    </SafeAreaView>
  )
}

export default ordered

const styles = StyleSheet.create({})