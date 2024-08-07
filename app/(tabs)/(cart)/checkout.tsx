import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useStore from '@/state/store'
import CartProductCard from '@/components/cards/CartProductCard'
import { Product } from '@/types/types'
import { Stack } from 'expo-router'

const CheckOut = () => {

  const {cart} = useStore((state)=>state)

    // Function to calculate the grand total
    const calculateGrandTotal = () => {
      if (cart.length === 0) return 0;
      return cart.reduce((total:number, item:Product) => total + item.price * item.quantity, 0);
    };
    const subTotal = calculateGrandTotal();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{headerShown:true, title:"Checkout", headerTitleAlign: "center"}} />
      <FlatList
        data={cart}
        renderItem={({item}) => <CartProductCard product={item} />}
        keyExtractor={item => item.id}
      />

     {cart.length > 0 &&  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
        <Text style={styles.totalText}>Subtotal: </Text>
        <Text style={styles.totalText}>$ {subTotal}</Text>
      </View>}
    </SafeAreaView>
  )
}

export default CheckOut

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    gap: 25
  },
  totalText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
})