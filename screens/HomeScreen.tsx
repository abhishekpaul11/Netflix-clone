import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList } from "react-native";
import { View } from '../components/Themed';
import HomeCategory from "../components/HomeCategory";
import { DataStore } from "aws-amplify";
import { Category } from "../src/models";

export default function HomeScreen() {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchCategories = (async() => {
      setCategories(await DataStore.query(Category))
    })()
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem = {({item}) => (
          <HomeCategory category = {item} />
        )}
        showsVerticalScrollIndicator = {false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30
  }
});
