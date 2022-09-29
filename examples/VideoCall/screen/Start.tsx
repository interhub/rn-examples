import React, {useEffect, useState} from 'react'
import {FlatList, SafeAreaView, Text, TouchableOpacity, View} from 'react-native'
//@ts-ignore
import {MediaStream, MeetingProvider, RTCView, useConnection, useMeeting, useParticipant} from '@videosdk.live/react-native-sdk'
import axios from 'axios'
import {useNavigation} from '@react-navigation/native'

import SIZE from '../../../src/config/SIZE'
import LoadingFullScreen from '../../StoriesSlider/components/LoadingFullScreen'

const Button = ({onPress, buttonText, backgroundColor}: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        margin: 3,
        flex: 1,
        height: 50,
      }}>
      <Text style={{color: 'white', fontSize: 16}}>{buttonText}</Text>
    </TouchableOpacity>
  )
}

const useFlipInitCamera = () => {
  const {changeWebcam, localWebcamOn} = useMeeting()
  const [isFlippedInit, setIsFlippedInit] = useState(false)
  useEffect(() => {
    if (!localWebcamOn) return
    if (isFlippedInit) return
    changeWebcam()
    setIsFlippedInit(true)
  }, [localWebcamOn])
}

function ControlsContainer() {
  const {goBack} = useNavigation()
  const {isJoined, joining} = useJoined()
  const {changeWebcam, toggleWebcam, toggleMic, join, leave} = useMeeting()
  useEffect(() => {
    join()
  }, [])
  useFlipInitCamera()

  return (
    <View
      style={{
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {joining && <Text style={{color: '#fff'}}>Joining ...</Text>}
      {/*{!isJoined && (*/}
      {/*  <Button*/}
      {/*    onPress={() => {*/}
      {/*      join()*/}
      {/*    }}*/}
      {/*    buttonText={'Join'}*/}
      {/*    backgroundColor={'#1178F8'}*/}
      {/*  />*/}
      {/*)}*/}
      {isJoined && (
        <Button
          onPress={() => {
            toggleWebcam()
          }}
          buttonText={'Toggle Webcam'}
          backgroundColor={'#1178F8'}
        />
      )}
      {isJoined && (
        <Button
          onPress={() => {
            changeWebcam()
          }}
          buttonText={'Flip Camera'}
          backgroundColor={'#1178F8'}
        />
      )}
      {isJoined && (
        <Button
          onPress={() => {
            toggleMic()
          }}
          buttonText={'Toggle Mic'}
          backgroundColor={'#1178F8'}
        />
      )}
      {isJoined && (
        <Button
          onPress={() => {
            leave()
            goBack()
          }}
          buttonText={'Leave'}
          backgroundColor={'#FF0000'}
        />
      )}
    </View>
  )
}

function ParticipantView({participantId}: {participantId: string}) {
  const {webcamStream, webcamOn, isLocal, displayName} = useParticipant(participantId)
  const isActive = !!webcamStream?.track && webcamOn

  if (isActive) {
    const stream = new MediaStream([webcamStream.track])
    const streamURL = stream.toURL()

    return (
      <RTCView
        mirror={false}
        streamURL={streamURL}
        objectFit={'cover'}
        style={{
          height: SIZE.height / 3,
          width: SIZE.width,
          marginVertical: 8,
          borderRadius: 10,
        }}
      />
    )
  }
  return (
    <View
      style={{
        backgroundColor: 'grey',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
      }}>
      <Text style={{fontSize: 16, color: '#ccc', fontWeight: 'bold'}}>{displayName}</Text>
    </View>
  )
}

function ParticipantList({participants}: {participants: string[]}) {
  const isExistParticipants = !!participants?.length
  if (isExistParticipants) {
    return (
      <FlatList
        data={participants}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item}) => {
          return <ParticipantView participantId={item} />
        }}
      />
    )
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 20, color: '#fff'}}>Press Join button to enter the meeting</Text>
    </View>
  )
}

const useLeaveMeeting = () => {
  const {leave, end, stopLiveStream, stopVideo, stopHls} = useMeeting()
  const stop = () => {
    leave()
    end()
    if (stopLiveStream) stopLiveStream()
    if (stopHls) stopHls()
    stopVideo()
  }
  useEffect(() => {
    return () => {
      stop()
    }
  }, [])
  return {stop}
}

const useJoined = () => {
  const [isJoined, setJoined] = useState(false)
  const [joining, setJoining] = useState(true)
  useMeeting({
    onMeetingJoined: () => {
      setJoined(true)
      setJoining(false)
    },
    onMeetingLeft: () => {
      setJoined(false)
      setJoining(false)
    },
  })
  return {isJoined, joining}
}

function MeetingView() {
  const {participants, meetingId} = useMeeting()
  useLeaveMeeting()
  const participantsArrId = [...participants.keys()] // Add this line

  return (
    <View style={{flex: 1}}>
      {meetingId ? <Text style={{fontSize: 18, padding: 12, color: '#fff'}}>Meeting Id :{meetingId}</Text> : null}
      <ParticipantList participants={participantsArrId} />
      <ControlsContainer />
    </View>
  )
}

export default function () {
  const [meetingId, setMeetingId] = useState<string | null>(null)
  const [token, setToken] = useState<string>('')

  const connectMeeting = async () => {
    const {meetingId, token} = await createMeeting()
    console.log({meetingId, token})
    setToken(token)
    setMeetingId(meetingId)
  }

  useEffect(() => {
    connectMeeting()
  }, [])

  if (!meetingId) {
    return <LoadingFullScreen color={'black'} />
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#464646'}}>
      <MeetingProvider
        config={{
          meetingId,
          micEnabled: true,
          webcamEnabled: true,
          name: 'Test User 2', //TODO user name add from store
        }}
        token={token}>
        <MeetingView />
      </MeetingProvider>
    </SafeAreaView>
  )
}

// const getToken = async () => {
//   const getFromStorage = async () => {
//     return await AsyncStorage.getItem('meeting-token')
//   }
//   const getFromServer = async () => {
//     const res = await axios.get('https://e520-93-171-64-249.in.ngrok.io/meeting/token')
//     const token = res.data?.token
//     if (token) {
//       await AsyncStorage.setItem('meeting-token', token)
//     }
//     return token
//   }
//   const tokenStorage = await getFromStorage()
//   if (!tokenStorage) return await getFromServer()
//   return tokenStorage
// }

export const createMeeting = async (): Promise<{meetingId: string; token: string}> => {
  const res = await axios.get('https://prod.api.aspectapp.io/aspect-api-v2/meeting/test-meeting-id')
  const data = res.data
  console.log({data})
  return data
}
