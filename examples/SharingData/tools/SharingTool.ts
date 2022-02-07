import moment from 'moment'
import * as FileSystem from 'expo-file-system'
import {Share} from 'react-native'
import * as Clipboard from 'expo-clipboard'

type ProgressUpdateCallbackType = (progress: number) => void

class SharingTool {
  downloadFile = async (link: string, onProgress?: ProgressUpdateCallbackType): Promise<{localPath: string; ext: string; isSuccess: boolean}> => {
    try {
      const ext = link.split('.').pop() || '.jpg'
      const timestamp = moment().valueOf()
      const fullFileName = `file_${timestamp}.${ext}`
      console.log('start download file', {fullFileName})
      const localPath = FileSystem.cacheDirectory + fullFileName
      const FSR = FileSystem.createDownloadResumable(link, localPath, {}, (progressObj) => {
        const progress = (progressObj.totalBytesWritten / progressObj.totalBytesExpectedToWrite) * 100
        if (onProgress) onProgress(progress)
      })
      const res = await FSR.downloadAsync()
      const localUri = res?.uri || ''
      const mimeType = res?.mimeType || ''
      // const {uri, mimeType} = await FSR.downloadAsync()
      // const {uri: localUri, mimeType} = await FileSystem.downloadAsync(link, localPath)
      console.log('Finished downloading to ', {localUri, mimeType})
      return {localPath, ext, isSuccess: true}
    } catch (e) {
      console.error(e, 'err')
      return {localPath: '', ext: '', isSuccess: false}
    }
  }

  shareFileRemote = async (remoteLink: string = '', onProgress?: ProgressUpdateCallbackType): Promise<boolean> => {
    const {localPath, isSuccess} = await this.downloadFile(remoteLink, onProgress)
    if (!isSuccess || !localPath) return false
    await Share.share(
      {title: remoteLink.slice(10), url: localPath},
      {
        dialogTitle: remoteLink.slice(10),
        subject: 'Link from app',
      },
    )
    return true
  }

  shareLink = async (link: string = '') => {
    await Share.share(
      {title: link.slice(10), url: link},
      {
        dialogTitle: link.slice(10),
        subject: 'Link from app',
      },
    )
  }

  shareText = async (text: string = '') => {
    await Share.share(
      {title: text.slice(10), message: text},
      {
        dialogTitle: text.slice(10),
        subject: 'Text from app',
      },
    )
  }

  writeClipboardText = async (text: string) => {
    Clipboard.setString(text)
  }

  readClipboardText = async () => {
    return (await Clipboard.getStringAsync()) || ''
  }
}

export default new SharingTool()
