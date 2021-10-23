import {openBrowserAsync} from 'expo-web-browser'
import {openURL} from 'expo-linking'

const openLink = async (link: string, controlsColor = '#000000') => {
  try {
    await openBrowserAsync(link, {
      controlsColor,
    })
  } catch (e) {
    console.log(e)
    openURL(link).catch((e) => {
      console.log(e)
    })
  }
}
export default openLink
