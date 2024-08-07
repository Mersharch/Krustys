import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useFetch from '@/hooks/useFetch';
import { Stack, useLocalSearchParams } from 'expo-router';
import useStore from '@/state/store';
import { Toast } from 'toastify-react-native';

const Page = () => {
    const {id} = useLocalSearchParams()
    const { data: product, error, loading } = useFetch(`http://10.0.2.2:8000/products/${id}`);
    const {addToCart} = useStore((state) => state);

    const handlePress = () => {
      addToCart(product)
      Toast.success(`${product.name} added to cart`)
      }
    if (loading) return <View style={styles.centered}><Text style={styles.loadingText}>Loading...</Text></View>;
    if (error) return <View style={styles.centered}><Text style={styles.errorText}>We encountered an error fetching the data. Kindly Check your internet connection.</Text></View>;

    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen
          options={{
            headerShown: true,
            title: `${product.name}`,
            headerTitleAlign: "center",
          }}
        />
        <Image source={{ uri: product.imageUrl }} style={styles.image} />
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
}

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loadingText: {
    fontSize: 24,
  },
  errorText: {
    fontSize: 24,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: 'green',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#028364',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});