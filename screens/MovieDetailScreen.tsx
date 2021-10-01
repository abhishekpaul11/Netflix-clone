import React, { useState } from "react";
import { StyleSheet, Pressable, FlatList } from "react-native";
import VideoPlayer from "../components/VideoPlayer";
import { View, Text } from "../components/Themed";
import { Picker } from "@react-native-picker/picker";
import EpisodeItem from "../components/EpisodeItem";
import Movie from "../assets/data/movie";
import { MaterialIcons, Entypo, AntDesign, Ionicons, Feather } from '@expo/vector-icons';

const firstSeason = Movie.seasons.items[0]
const firstEpisode = firstSeason.episodes.items[0]

const MovieDetailScreen = () => {

  const [currentSeason, setCurrentSeason] = useState(firstSeason)
  const [currentEpisode, setCurrentEpisode] = useState(firstEpisode)
  const seasonNames = Movie.seasons.items.map(season => season.name)

  return (
    <View style = {{flex: 1}}>
      <VideoPlayer episode = {currentEpisode} />
      <FlatList
          data={currentSeason.episodes.items}
          renderItem = {({ item }) => <EpisodeItem episode={item} onPress={(episode) => setCurrentEpisode(episode)} />}
          ListHeaderComponent = {(
            <View style={{padding: 12}}>
              <Text style = {styles.title}>{Movie.title}</Text>
              <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                <Text style = {styles.match}>98% match</Text>
                <Text style = {styles.year}>{Movie.year}</Text>
                <View style = {styles.ageContainer}>
                  <Text style = {styles.age}>12+</Text>
                </View>
                <Text style = {styles.year}>{Movie.numberOfSeasons} seasons</Text>
                <MaterialIcons name="hd" size={28} color="darkgray" />
              </View>

              {/* Play Button */}
              <Pressable onPress={() => console.warn('Play')} style={styles.playButton}>
                <Entypo name="controller-play" size={24} color="black" style={{marginRight: 5}}/>
                <Text style = {styles.playButtonText}>Play</Text>
              </Pressable>

              {/* Download Button */}
              <Pressable onPress={() => console.warn('Play')} style={styles.downloadButton}>
                <AntDesign name="download" size={24} color="white" style={{marginRight: 10}} />
                <Text style = {styles.downloadButtonText}>Download</Text>
              </Pressable>

              <Text style={{marginTop: 3}}>{Movie.plot}</Text>
              <View style={{flexDirection: 'row', marginTop: 8}}>
                <Text style={{color: 'darkgray', fontWeight: 'bold'}}>Starring: </Text>
                <Text style={{color: 'darkgray'}}>{Movie.cast}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: 'darkgray', fontWeight: 'bold'}}>Creator: </Text>
                <Text style={{color: 'darkgray'}}>{Movie.creator}</Text>
              </View>

              {/* Row with icons*/}
              <View style = {{flexDirection: 'row', marginVertical: 20, justifyContent: 'space-around'}}>
                <View style={styles.icons}>
                  <AntDesign name='plus' size={20} color='white' />
                  <Text style={styles.label}>My List</Text>
                </View>
                <View style={styles.icons}>
                  <Feather name='thumbs-up' size={20} color='white' />
                  <Text style={styles.label}>Rate</Text>
                </View>
                <View style={styles.icons}>
                  <Ionicons name='share-social' size={20} color='white' />
                  <Text style={styles.label}>Share</Text>
                </View>
                <View style={styles.icons}>
                  <Feather name='download' size={20} color='white' />
                  <Text style={styles.label}>Download</Text>
                </View>
              </View>

              <View style={styles.picker}>
                <Picker
                  selectedValue={currentSeason}
                  onValueChange = {(itemValue, itemIndex) => {
                    setCurrentSeason(Movie.seasons.items[itemIndex])
                  }}
                  style={{color: 'white', width: 130}}
                  dropdownIconColor={'white'}
                >
                {seasonNames.map(seasonName => (
                  <Picker.Item label={seasonName} value={seasonName} key={seasonName} />
                ))}
                </Picker>
              </View>
            </View>
          )}
      />
    </View>
  )
}

export default MovieDetailScreen

const styles = StyleSheet.create({
  image: {
    width: '100%',
    aspectRatio: 16/9,
    resizeMode: 'cover'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold'
  },
  match: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#3CB371',
    marginRight: 10
  },
  year: {
    color: 'darkgray',
    fontSize: 15,
    marginRight: 5
  },
  ageContainer: {
    backgroundColor: '#e6e229',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 3,
    marginRight: 5
  },
  age: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15
  },
  playButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginTop: 10,
    borderRadius: 5
  },
  playButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16
  },
  downloadButton: {
    backgroundColor: '#2b2b2b',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
    marginVertical: 8
  },
  downloadButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  label: {
    color: 'darkgray',
    marginTop: 5,
    fontSize: 12
  },
  icons: {
    alignItems: 'center'
  },
  picker: {
    backgroundColor: '#383838',
    padding: 10,
    borderRadius: 7,
    alignSelf: 'flex-start'
  }
})
