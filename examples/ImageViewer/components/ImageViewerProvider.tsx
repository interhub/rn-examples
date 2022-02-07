import React, {createContext, useContext, useState} from 'react'
import {ActivityIndicator, Modal, SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import {IImageInfo} from 'react-native-image-zoom-viewer/built/image-viewer.type'
import {map} from 'lodash'
import FastImage from 'react-native-fast-image'
import {AntDesign} from '@expo/vector-icons'

type ImageViewerContextType = {
  openPhotosViewer: (urls: string[]) => void
}
//@ts-ignore
export const ImageViewerContext = createContext<ImageViewerContextType>(undefined)

const ImageViewerProvider: React.FC = ({children}) => {
  const [openedPhotos, setOpenedPhotos] = useState<IImageInfo[]>([])
  const openPhotosViewer: ImageViewerContextType['openPhotosViewer'] = (urls) => {
    const imagesArr: IImageInfo[] = map(urls, (url) => ({url} as IImageInfo))
    setOpenedPhotos(imagesArr)
  }
  const closePhotoViewer = () => setOpenedPhotos([])
  const isOpened = !!openedPhotos?.length

  return (
    <ImageViewerContext.Provider value={{openPhotosViewer}}>
      {children}
      <Modal onRequestClose={closePhotoViewer} animationType={'fade'} animated visible={isOpened} transparent>
        <View style={{flex: 1, backgroundColor: '#000'}}>
          <SafeAreaView style={{flex: 1}}>
            <ImageViewer
              enableSwipeDown
              onSwipeDown={closePhotoViewer}
              swipeDownThreshold={80}
              saveToLocalByLongPress={false}
              loadingRender={() => {
                return (
                  <View style={styles.loadBox}>
                    <ActivityIndicator color={'#fff'} />
                  </View>
                )
              }}
              renderHeader={() => {
                return (
                  <TouchableOpacity style={styles.headerBox} onPress={closePhotoViewer}>
                    <AntDesign name="closecircleo" size={24} color="black" />
                  </TouchableOpacity>
                )
              }}
              renderImage={(item: {source: {uri: string}; style: any}) => {
                return <FastImage source={item.source} style={item.style} />
              }}
              imageUrls={openedPhotos}
            />
          </SafeAreaView>
        </View>
      </Modal>
    </ImageViewerContext.Provider>
  )
}

const styles = StyleSheet.create({
  headerBox: {position: 'absolute', top: 30, right: 20, zIndex: 15, padding: 20},
  loadBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export const useImageViewer = () => {
  return useContext(ImageViewerContext)
}

export default ImageViewerProvider
