import React, {useState} from 'react'
import {FlatList, SafeAreaView, Text, TextInput, TouchableOpacity, View} from 'react-native'
//@ts-ignore
import {MediaStream, MeetingProvider, RTCView, useMeeting, useParticipant} from '@videosdk.live/react-native-sdk'

function JoinScreen(props: {connectMeeting: () => Promise<void>}) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#F6F6FF',
        justifyContent: 'center',
        paddingHorizontal: 6 * 10,
      }}>
      <TouchableOpacity
        style={{
          backgroundColor: '#1178F8',
          padding: 12,
          marginTop: 14,
          borderRadius: 6,
        }}
        onPress={() => {
          props.connectMeeting()
        }}>
        <Text style={{color: 'white', alignSelf: 'center', fontSize: 18}}>Join Meeting</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const Button = ({onPress, buttonText, backgroundColor}: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        borderRadius: 4,
      }}>
      <Text style={{color: 'white', fontSize: 12}}>{buttonText}</Text>
    </TouchableOpacity>
  )
}

function ControlsContainer({join, leave, toggleWebcam, toggleMic}: any) {
  return (
    <View
      style={{
        padding: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Button
        onPress={() => {
          join()
        }}
        buttonText={'Join'}
        backgroundColor={'#1178F8'}
      />
      <Button
        onPress={() => {
          toggleWebcam()
        }}
        buttonText={'Toggle Webcam'}
        backgroundColor={'#1178F8'}
      />
      <Button
        onPress={() => {
          toggleMic()
        }}
        buttonText={'Toggle Mic'}
        backgroundColor={'#1178F8'}
      />
      <Button
        onPress={() => {
          leave()
        }}
        buttonText={'Leave'}
        backgroundColor={'#FF0000'}
      />
    </View>
  )
}

function ParticipantView({participantId}: {participantId: string}) {
  const {webcamStream, webcamOn} = useParticipant(participantId)
  const isActive = !!webcamStream?.track && webcamOn
  if (isActive) {
    const streamURL = new MediaStream([webcamStream.track]).toURL()
    return (
      <RTCView
        streamURL={streamURL}
        objectFit={'cover'}
        style={{
          height: 300,
          width: 300,
          marginVertical: 8,
          marginHorizontal: 8,
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
      }}>
      <Text style={{fontSize: 16}}>NO MEDIA</Text>
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
        backgroundColor: '#F6F6FF',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 20}}>Press Join button to enter meeting.</Text>
    </View>
  )
}

function MeetingView() {
  const {join, leave, toggleWebcam, toggleMic, meetingId, participants} = useMeeting({})
  console.log({participants})
  const participantsArrId = [...participants.keys()] // Add this line

  return (
    <View style={{flex: 1}}>
      {meetingId ? <Text style={{fontSize: 18, padding: 12}}>Meeting Id :{meetingId}</Text> : null}
      <ParticipantList participants={participantsArrId} />
      <ControlsContainer join={join} leave={leave} toggleWebcam={toggleWebcam} toggleMic={toggleMic} />
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

  return meetingId ? (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F6F6FF'}}>
      <MeetingProvider
        config={{
          meetingId,
          micEnabled: false,
          webcamEnabled: true,
          name: 'Test User 2', //TODO user name add from store
        }}
        token={token}>
        <MeetingView />
      </MeetingProvider>
    </SafeAreaView>
  ) : (
    <JoinScreen connectMeeting={connectMeeting} />
  )
}

export const createMeeting = async (): Promise<{meetingId: string; token: string}> => {
  const data = fetch('https://prod.api.aspectapp.io/aspect-api-v2/meeting/test-meeting-id')
    .then((res) => res.json())
    .then((res) => res || {})
  console.log({data})
  return data
}
