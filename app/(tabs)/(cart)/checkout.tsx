import { FlatList, StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useStore from "@/state/store";
import CartProductCard from "@/components/cards/CartProductCard";
import { Product } from "@/types/types";
import { Link, Stack } from "expo-router";

const CheckOut = () => {
  const { cart } = useStore((state) => state);

  // Function to calculate the grand total
  const calculateGrandTotal = () => {
    if (cart.length === 0) return 0;
    return cart.reduce(
      (total: number, item: Product) => total + item.price * item.quantity,
      0
    );
  };
  const subTotal = calculateGrandTotal();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Checkout",
          headerTitleAlign: "center",
        }}
      />
      <FlatList
        data={cart}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", gap: 20, margin:8, paddingBottom:15, borderBottomWidth: 2, borderBottomColor: '#f6f6f6' }}>
            <View
              style={{
                padding: 5,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f6f6f6",
                borderRadius: 10,
              }}
            >
              <Image
                source={{ uri: item.imageUrl }}
                style={{ width: 100, height: 100 }}
              />
            </View>
            <View style={{ gap: 10 }}>
              <Text style={{fontSize:24, fontWeight: 'bold'}}>{item.name}</Text>
              <Text style={{fontSize:20}}>{item.quantity}x</Text>
              <Text style={{fontSize:18, fontWeight: '400'}}>$ {item.quantity * item.price}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />

      {cart.length > 0 && (
        <>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
          >
          <Text style={styles.totalText}>Subtotal: </Text>
          <Text style={styles.totalText}>$ {subTotal}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
          >
          <Text style={styles.totalText}>Delivery: </Text>
          <Text style={styles.totalText}>$ 15.99</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
          >
          <Text style={styles.totalText}>Total: </Text>
          <Text style={styles.totalText}>$ {(subTotal + 15.99).toFixed(2)}</Text>
          </View>
          
          <Link push href={"/ordered"} asChild>
          <Pressable style={styles.checkout}>
            <Text style={{color: 'white'}}>Place order</Text>
        </Pressable>
        </Link>
          </>
      )}
    </SafeAreaView>
  );
};

export default CheckOut;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    gap: 25,
  },
  totalText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  checkout: {
    backgroundColor: '#028364',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  }
});
