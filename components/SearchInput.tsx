import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const SearchInput = () => {
  return (
      <View style={styles.container}>
          <Ionicons name="search" size={20} color="#8f8f8f" />
          <TextInput placeholder="Search..." style={styles.input} placeholderTextColor='#8f8f8f' />
    </View>
  )
}

export default SearchInput

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f6f6f6',
        paddingHorizontal: 8,
        paddingVertical: 7,
        gap: 6
    },

    input: {
        fontSize: 17,
        fontWeight: '500',
        lineHeight: 20.32,
        color: '#8f8f8f'
    }
})