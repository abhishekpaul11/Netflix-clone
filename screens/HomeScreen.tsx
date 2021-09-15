import * as React from 'react';
import { StyleSheet, FlatList } from "react-native";
import { View } from '../components/Themed';
import categories from "../assets/data/categories";
import HomeCategory from "../components/HomeCategory";


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={categories.items}
        renderItem = {({item}) => (
          <HomeCategory category = {item} />
        )}
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
