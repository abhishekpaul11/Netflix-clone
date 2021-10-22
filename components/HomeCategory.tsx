import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import MovieItem from "./MovieItem";

import { Text } from '../components/Themed';
import { Category, Movie } from "../src/models";
import { DataStore } from "aws-amplify";

interface HomeCategoryProps {
  category: Category
}

const HomeCategory = (props: HomeCategoryProps) => {
  const { category } = props
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    const fetchMovies = (async() => {
      setMovies((await DataStore.query(Movie)).filter(movie => movie.categoryID === category.id))
    })()
  },[])

  return (
    <>
      <Text style={styles.title}> {category.title} </Text>
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieItem movie={item} />}
        horizontal
        showsHorizontalScrollIndicator = {false}
      />
    </>
  );
}

export default HomeCategory

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10
  }
});
