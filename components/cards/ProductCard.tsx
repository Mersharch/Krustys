import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Product } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import {Link} from 'expo-router'
import useStore from "@/state/store";
import { Toast } from "toastify-react-native";

const ProductCard = ({ product }: { product: Product }) => {
    const {addToCart, cart} = useStore((state) => state)

    // add to cart
    const handlePress = () => {
        addToCart(product)
        Toast.success(`${product.name} added to cart`)
        }

        
  return (
    <Link push href={`/${product.id}`} asChild>
    <Pressable style={styles.container}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <Text style={styles.price}>$ {product.price}</Text>
        <TouchableOpacity style={styles.add} onPress={handlePress}>
          <Ionicons name="add" size={15} color="white" />
        </TouchableOpacity>
      </View>
    </Pressable>
    </Link>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    backgroundColor: "#f6f6f6",
    padding: 15,
    borderRadius: 19,
    gap: 10,
  },

  image: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },

  name: {
    fontSize: 17,
    fontWeight: "500",
    lineHeight: 20.32,
  },

  price: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 20.32,
    color: "#028364",
  },

  add: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderBottomRightRadius: 19,
  },
});
