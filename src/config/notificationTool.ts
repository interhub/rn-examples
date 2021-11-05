// import * as Notifications from 'expo-notifications'
import {Platform} from 'react-native'
import messaging from '@react-native-firebase/messaging'

import IS_IOS from './IS_IOS'

/**
 @class for set up notification and set up initial notification response from system mobile api
 */
class NotificationConfigTool {
  constructor() {
    this.initialize()
  }

  channel_id = 'example'

  /**
     set up initialize notification handler
     */
  private initialize = async () => {
    if (!IS_IOS) {
      await this.setAndroidChannel()
    }
    messaging().setBackgroundMessageHandler(async (data) => {
      console.log(JSON.stringify(data, null, ' '), 'setBackgroundMessageHandler')
    })
    messaging().onMessage((message) => {
      const body = message?.notification?.body || ''
      const title = message?.notification?.title || ''
      console.log(JSON.stringify(message, null, ' '), 'message new')
      // this.showNotification({body, title})
    })
    // await Notifications.setNotificationHandler({
    //   handleNotification: async () => ({
    //     shouldShowAlert: true,
    //     shouldPlaySound: true,
    //     shouldSetBadge: true,
    //   }),
    // })
  }

  /**
     method for display notification from open application
     */
  private showNotification = async () => {
    //Notifications.NotificationContentInput
    // console.log(data) //TODO CHECK
    // await Notifications.scheduleNotificationAsync({
    //   content: data,
    //   trigger: {
    //     seconds: 1,
    //     channelId: this.channel_id,
    //   },
    // })
  }

  /**
     set android channel
     */
  private setAndroidChannel = async () => {
    // await Notifications.setNotificationChannelAsync(this.channel_id, {
    //   name: this.channel_id,
    //   importance: Notifications.AndroidImportance.HIGH,
    // })
  }

  /**
     get push token (return string token from Promise)
     */
  protected getPushToken = async (): Promise<string> => {
    if (IS_IOS) {
      const success = await this.requestPermission()
      if (!success) {
        return ''
      }
    }
    return await messaging().getToken()
  }

  /**
     request permission for notification
     */
  protected async requestPermission(): Promise<boolean> {
    const authStatus = await messaging().requestPermission()
    return authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL
  }

  protected async unsubscribe() {
    await messaging().deleteToken()
  }
}

/**
 @class extended for use notification config from NotificationConfigTool (interface)
 */
class NotificationTool extends NotificationConfigTool {
  /**
     update notification token to server and subscribe
     */
  public update = async (): Promise<boolean> => {
    const fcm_token = await this.getPushToken()
    if (fcm_token) {
      console.log(fcm_token, 'TOKEN PUSH', Platform.OS)
      return true
    }
    return false
  }
  /**
     unsubscribe to notification
     */
  public remove = async () => {
    await this.unsubscribe()
    // return await API.changeUser({notifications_token: ''})
  }

  public async getInitital() {
    return await messaging().getInitialNotification()
  }
}

export default new NotificationTool()
