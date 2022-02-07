import {useIsFocused} from '@react-navigation/native'
import React, {useEffect, useRef, useState} from 'react'
import {ActivityIndicator, StyleSheet, View} from 'react-native'
import MapView, {Polygon, Region} from 'react-native-maps'
// import locationTool, { LocationType } from '../../tool/locationTool'
import {FontAwesome} from '@expo/vector-icons'

import locationTool, {LocationType} from '../tool/locationTool'
import TextLine from '../../../components/TextLine'

/**
 location type for use to all application and set up location state
 */

const MapFill = () => {
  const mapRef = useRef<MapView | null>(null)
  const [address, setAddress] = useState('')
  const onRegionChangeComplete = async (loc: LocationType) => {
    // await locationTool.setLocationFullState(loc)
    const user_address = await locationTool.getAddressString(loc)
    if (!user_address) return
    setAddress(user_address)
  }

  const goToLocation = (loc: LocationType) => {
    mapRef.current?.animateToRegion(loc)
  }

  const setCurrentLocationStart = async () => {
    const user_location = await locationTool.findMe()
    if (!user_location) return
    const user_address = await locationTool.getAddressString(user_location)
    if (!user_address) return
    setAddress(user_address)
    goToLocation(user_location)
  }

  useEffect(() => {
    setCurrentLocationStart()
  }, [])

  const loading = false
  const initialRegion: Region = {
    latitudeDelta: 0.0022,
    longitudeDelta: 0.0001,
    latitude: 54.706443,
    longitude: 20.511817,
  }

  return (
    <>
      <TextLine style={{padding: 10}}>{address}</TextLine>
      <MapView onRegionChangeComplete={onRegionChangeComplete} ref={mapRef} initialRegion={initialRegion} style={{flex: 1}} />
      <View
        pointerEvents={'none'}
        style={[
          StyleSheet.absoluteFillObject,
          {
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 100,
          },
        ]}>
        {!loading && <FontAwesome name="map-marker" size={40} color={'black'} />}
        {loading && <ActivityIndicator color={'#454'} size={'large'} />}
      </View>
    </>
  )
}

export default MapFill
