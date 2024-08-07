import ProductCard from "@/components/cards/ProductCard";
import SearchInput from "@/components/SearchInput";
import useFetch from "@/hooks/useFetch";
import { Product } from "@/types/types";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Platform, View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { data: products, loading, error } = useFetch('http://10.0.2.2:8000/products')
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Debouncing logic
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery) {
        const filtered = products.filter((product:Product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.ingredients.some(ingredient =>
            ingredient.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(products);
      }
    }, 300); // 300ms debounce time

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, products]);

  if (loading) return <View style={{flex:1, justifyContent:'center', alignItems: 'center', backgroundColor: 'white'}}><Text style={{fontSize:24}}>Loading...</Text></View>;
  if (error) return <View style={{flex:1, justifyContent:'center', alignItems: 'center', backgroundColor: 'white'}}><Text style={{fontSize:24}}>We encountered an error fetching the data. Kindly Check your internet connection.</Text></View>;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
      <Text>Welcome</Text>
      <Text>Kwadwo</Text>
      </View>

      <SearchInput value={searchQuery} setSearchQuery={setSearchQuery} />
      <FlatList
        data={filteredProducts}
        numColumns={2}
        renderItem={({item}) => <ProductCard product={item} />}
        keyExtractor={item => item.id}
      />


      

        
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    gap: 25
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
