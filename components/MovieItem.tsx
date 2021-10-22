import React, { useState, useEffect } from "react";
import { Pressable, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Storage } from "aws-amplify";

const MovieItem = ({ movie } : {movie: Movie}) => {

  const navigation = useNavigation()
  const [imageURL, setImageURL] = useState('')

  const moviePress = () => {
    navigation.navigate('MovieDetailScreen', {id: movie.id})
  }

  useEffect(() => {
    Storage.get(movie.poster).then(setImageURL)
  },[])

  if(imageURL == '') return <ActivityIndicator style={styles.image} size='small' color='#fff' />

  return (
    <Pressable onPress = {moviePress}>
      <Image style={styles.image} source={{uri: imageURL}} />
    </Pressable>
  )
}

export default MovieItem

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 170,
    resizeMode: 'cover',
    borderRadius: 5,
    margin: 3.5
  }
})
