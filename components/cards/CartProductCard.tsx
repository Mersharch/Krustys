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
import { Link } from "expo-router";
import useStore from "@/state/store";
import { Toast } from "toastify-react-native";

const CartProductCard = ({ product }: { product: Product }) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useStore(
    (state) => state
  );

  // remove to cart
  const handleRemove = () => {
    removeFromCart(product.id);
    Toast.success(`${product.name} removed from cart`);
  };

  // increase quantity
  const handleIncrease = () => {
    increaseQuantity(product.id);
  };

  // decrease quantity
  const handleDecrease = () => {
    decreaseQuantity(product.id);
  };

  return (
    <Link push href={`/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.imageUrl }} style={styles.image} />
        </View>
        <View
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ gap: 20 }}>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>$ {product.price}</Text>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              {/* increase and decrease quantity */}
              <TouchableOpacity onPress={handleDecrease}>
                <Ionicons name="remove" size={24} color="black" />
              </TouchableOpacity>
              <Text>{product.quantity}</Text>
              <TouchableOpacity onPress={handleIncrease}>
                <Ionicons name="add" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.delete} onPress={handleRemove}>
            <Ionicons name="trash-outline" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </Pressable>
    </Link>
  );
};

export default CartProductCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    margin: 8,
    backgroundColor: "white",
    padding: 5,
    paddingBottom: 10,
    gap: 30,
    borderBottomWidth: 2,
    borderBottomColor: "#f6f6f6",
  },

  imageContainer: {
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f6f6",
    borderRadius: 10,
  },

  image: {
    width: 70,
    height: 70,
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

  delete: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
