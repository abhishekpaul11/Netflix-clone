import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, FlatList, Pressable } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import { Text } from '../components/Themed';
import { Category, Movie } from "../src/models";
import { DataStore } from "aws-amplify";

interface HomeCategoryProps {
  category: Category
}

const HomeCategory = (props: HomeCategoryProps) => {
  const { category } = props
  const [movies, setMovies] = useState<Movie[]>([])
  const navigation = useNavigation()

  useEffect(() => {
    const fetchMovies = (async() => {
      setMovies((await DataStore.query(Movie)).filter(movie => movie.categoryID === category.id))
    })()
  },[])

  const moviePress = (movie: Movie) => {
    navigation.navigate('MovieDetailScreen', {id: movie.id})
  }

  return (
    <>
      <Text style={styles.title}> {category.title} </Text>
      <FlatList
        data={movies}
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
