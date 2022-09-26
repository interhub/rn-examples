import React, {useState} from 'react'
import {FlatList, SafeAreaView, Text, TextInput, TouchableOpacity, View} from 'react-native'
//@ts-ignore
import {MeetingProvider, useMeeting, useParticipant, MediaStream, RTCView} from '@videosdk.live/react-native-sdk'

function JoinScreen(props: {getMeetingId: (v?: string) => Promise<void>}) {
  const [meetingVal, setMeetingVal] = useState('')
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#F6F6FF',
        justifyContent: 'center',
        paddingHorizontal: 6 * 10,
      }}>
      <TouchableOpacity
        onPress={() => {
          props.getMeetingId()
        }}
        style={{backgroundColor: '#1178F8', padding: 12, borderRadius: 6}}>
        <Text style={{color: 'white', alignSelf: 'center', fontSize: 18}}>Create Meeting</Text>
      </TouchableOpacity>

      <Text
        style={{
          alignSelf: 'center',
          fontSize: 22,
          marginVertical: 16,
          fontStyle: 'italic',
          color: 'grey',
        }}>
        ---------- OR ----------
      </Text>
      <TextInput
        value={meetingVal}
        onChangeText={setMeetingVal}
        placeholder={'XXXX-XXXX-XXXX'}
        style={{
          padding: 12,
          borderWidth: 1,
          borderRadius: 6,
          fontStyle: 'italic',
        }}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#1178F8',
          padding: 12,
          marginTop: 14,
          borderRadius: 6,
        }}
        onPress={() => {
          props.getMeetingId(meetingVal)
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

  const getMeetingId = async (id?: string) => {
    console.log({id})
    if (id) {
      setMeetingId(id)
      console.log({id})
    } else {
      const meetingId = await createMeeting({token})
      console.log({meetingId})
      setMeetingId(meetingId)
    }
  }

  return meetingId ? (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F6F6FF'}}>
      <MeetingProvider
        config={{
          meetingId,
          micEnabled: false,
          webcamEnabled: true,
          name: 'Test User',
        }}
        token={token}>
        <MeetingView />
      </MeetingProvider>
    </SafeAreaView>
  ) : (
    <JoinScreen getMeetingId={getMeetingId} />
  )
}

export const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIwYmIyZDcxNC05YWI4LTRlZDItYjUzYS02MWIzZTY3OTA1MWMiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY2NDIyNDI2OCwiZXhwIjoxNjY0ODI5MDY4fQ.WHg5JElntDQ5L7VJsKTgr7ItXxPqYVGZs5plZ-zbvvQ'
// API call to create meeting
export const createMeeting = async ({token}: {token: string}) => {
  const res = await fetch(`https://api.videosdk.live/v1/meetings`, {
    method: 'POST',
    headers: {
      authorization: `${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({region: 'sg001'}),
  })

  console.log(res.status, 'status')

  const {meetingId} = await res.json()
  return meetingId
}
