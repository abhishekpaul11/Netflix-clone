import React from "react";
import { Image, StyleSheet, Pressable } from "react-native";
import { View, Text } from "../components/Themed";
import { AntDesign } from '@expo/vector-icons';
import { Episode } from "../types";

interface EpisodeItemProps {
  episode: Episode
  onPress: (episode: Episode) => {}
}

const EpisodeItem = (props: EpisodeItemProps) => {
  const { onPress, episode } = props
  return (
    <Pressable style={{paddingHorizontal: 12, paddingBottom: 30}} onPress={() => {onPress(episode)}}>
      <View style={styles.row}>
        <Image source={{uri: episode.poster}} style = {styles.image}/>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{episode.title}</Text>
          <Text style={styles.duration}>{episode.duration}</Text>
        </View>

        <AntDesign name='download' size={24} color={'white'} />
      </View>

      <Text style = {styles.plot}>{episode.plot}</Text>
    </Pressable>
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
