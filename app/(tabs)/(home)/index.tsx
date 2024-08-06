import ProductCard from "@/components/cards/ProductCard";
import SearchInput from "@/components/SearchInput";
import useFetch from "@/hooks/useFetch";
import { Image, StyleSheet, Platform, View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { data: products, loading, error } = useFetch('http://10.0.2.2:8000/products')
console.log(error)
  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
      <Text>Welcome</Text>
      <Text>Kwadwo</Text>
      </View>

      <SearchInput />
      <FlatList
        data={products}
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
