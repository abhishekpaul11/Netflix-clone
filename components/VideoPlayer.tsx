import React, { useRef, useState, useEffect } from "react";
import * as ScreenOrientation from 'expo-screen-orientation';
import { StyleSheet } from "react-native";
import { Video } from "expo-av";
import { Episode } from "../types";

interface VideoPlayerProps {
  episode: Episode
}
var isLandscape = false
var flag = false

const VideoPlayer = (props: VideoPlayerProps) => {
  const { episode, play } = props
  const video = useRef<Playback>(null)
  const [status, setStatus] = useState({})
  const isFirstRender = useRef(true)

  useEffect(() => {
    if(!video) return
    (async() => {
      await video?.current?.unloadAsync()
      await video?.current?.loadAsync(
        {uri: episode.video},
        {},
        false
      )
      await video?.current?.playAsync()
      if(!isFirstRender.current) await video?.current?.presentFullscreenPlayer()
      else isFirstRender.current = false
    })()
  }, [episode])

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

  return (
    <Video
      ref = {video}
      style = {styles.video}
      source = {{ uri: episode.video }}
      shouldPlay = {true}
      posterSource = {{ uri: episode.poster }}
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
