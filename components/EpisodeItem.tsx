import React from "react";
import { Image, StyleSheet } from "react-native";
import { View, Text } from "../components/Themed";
import { AntDesign } from '@expo/vector-icons';

interface EpisodeItemProps {
  episode: {
    id: string,
    title: string,
    poster: string,
    duration: string,
    plot: string,
    video: string
  }
}

const EpisodeItem = (props: EpisodeItemProps) => {
  const { episode } = props
  return (
    <View style={{paddingHorizontal: 12, paddingBottom: 30}}>
      <View style={styles.row}>
        <Image source={{uri: episode.poster}} style = {styles.image}/>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{episode.title}</Text>
          <Text style={styles.duration}>{episode.duration}</Text>
        </View>

        <AntDesign name='download' size={24} color={'white'} />
      </View>

      <Text style = {styles.plot}>{episode.plot}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  image: {
    height: 80,
    aspectRatio: 16/9,
    resizeMode: 'cover',
    borderRadius: 3
  },
  titleContainer: {
    flex: 1,
    padding: 10
  },
  title: {
    fontWeight: 'bold'
  },
  duration: {
    color: 'darkgray',
    fontSize: 13
  },
  plot: {
    color: 'darkgray',
    fontSize: 13,
    marginTop: 8
  }
})

export default EpisodeItem
