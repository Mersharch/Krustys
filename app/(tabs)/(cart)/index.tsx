import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useStore from '@/state/store'
import CartProductCard from '@/components/cards/CartProductCard'
import { Product } from '@/types/types'
import { Link } from 'expo-router'

const cart = () => {

  const {cart} = useStore((state)=>state)

    // Function to calculate the grand total
    const calculateGrandTotal = () => {
      if (cart.length === 0) return 0;
      return cart.reduce((total:number, item:Product) => total + item.price * item.quantity, 0);
    };
    const grandTotal = calculateGrandTotal();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={{fontSize: 24, fontWeight: 'bold', textAlign:'center'}}>Cart</Text>

      <FlatList
        data={cart}
        renderItem={({item}) => <CartProductCard product={item} />}
        keyExtractor={item => item.id}
      />

      {cart.length > 0 &&
        <>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <Text style={styles.totalText}>Total: </Text>
        <Text style={styles.totalText}>$ {grandTotal}</Text>
        </View>
        <Link push href={"/checkout"} asChild>
          <Pressable style={styles.checkout}>
            <Text style={{color: 'white'}}>Proceed to checkout</Text>
        </Pressable>
        </Link>
        </>
      }
    </SafeAreaView>
  )
}

export default cart

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
  checkout: {
    backgroundColor: '#028364',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  }
})