import React, { useRef, useState, useEffect } from "react";
import * as ScreenOrientation from 'expo-screen-orientation';
import { StyleSheet, ActivityIndicator } from "react-native";
import { Video } from "expo-av";
import { Episode } from "../types";
import { Storage } from "aws-amplify";

interface VideoPlayerProps {
  episode: Episode
}
var isLandscape = false
var flag = false

const VideoPlayer = (props: VideoPlayerProps) => {
  const { episode, play } = props
  const [videoURL, setVideoURL] = useState('')
  const [posterURL, setPosterURL] = useState('')
  const video = useRef<Playback>(null)
  const [status, setStatus] = useState({})
  const isFirstRender = useRef(true)

  useEffect(() => {
    setPosterURL('')
    Promise.all([Storage.get(episode.poster).then(setPosterURL), Storage.get(episode.video).then(setVideoURL)])
  },[episode])

  useEffect(() => {
    if(!video) return
    if(videoURL !== ''){
      (async() => {
        await video?.current?.unloadAsync()
        await video?.current?.loadAsync(
          {uri: videoURL},
          {},
          false
        )
        await video?.current?.playAsync()
        if(!isFirstRender.current) await video?.current?.presentFullscreenPlayer()
        else isFirstRender.current = false
      })()
    }
  }, [videoURL])

  useEffect(() => {
    const playVideo = (async() => {
      if(play > 0){
        await video?.current?.playAsync()
        await video?.current?.presentFullscreenPlayer()
      }
    })()
  }, [play])

  const changeToLandscape = async() => {
    if(flag){
      if(!isLandscape){
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT).then(() => isLandscape = true);
      }
      else{
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP).then(() => isLandscape = false);
      }
    }
    flag = !flag
  }

  if(videoURL === '' || posterURL === ''){
    return <ActivityIndicator style={styles.video} size='large' color='#fff' />
  }

  return (
    <Video
      ref = {video}
      style = {styles.video}
      source = {{ uri: videoURL }}
      shouldPlay = {true}
      posterSource = {{ uri: posterURL }}
      posterStyle = {styles.video}
      usePoster = {true}
      useNativeControls
      resizeMode = 'contain'
      onPlaybackStatusUpdate = {status => setStatus(() => status)}
      onFullscreenUpdate = {changeToLandscape}
    />
  )
}

export default VideoPlayer

const styles = StyleSheet.create({
  video: {
    width: '100%',
    aspectRatio: 16/9
  }
})
