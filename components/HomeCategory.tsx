import * as React from 'react';
import { StyleSheet, Image, FlatList, Pressable } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import { Text } from '../components/Themed';

interface HomeCategoryProps {
  category: {
    id: string,
    title: string,
    movies: {
      id: string,
      poster: string
    }[]
  }
}

const HomeCategory = (props: HomeCategoryProps) => {
  const { category } = props
  const navigation = useNavigation()

  const moviePress = (movie) => {
    navigation.navigate('MovieDetailScreen', {id: movie.id})
  }

  return (
    <>
      <Text style={styles.title}> {category.title} </Text>
      <FlatList
        data={category.movies}
        renderItem={({ item }) => (
          <Pressable onPress = {() => moviePress(item)}>
            <Image style={styles.image} source={{uri: item.poster}} />
          </Pressable>
        )}
        horizontal
        showsHorizontalScrollIndicator = {false}
      />
    </>
  );
}

export default HomeCategory

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 170,
    resizeMode: 'cover',
    borderRadius: 5,
    margin: 3.5
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10
  }
});
