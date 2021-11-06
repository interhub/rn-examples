// import * as Notifications from 'expo-notifications'
import {Platform} from 'react-native'
import messaging from '@react-native-firebase/messaging'
import notifee, {AndroidBadgeIconType, AndroidImportance, AndroidStyle, Notification} from '@notifee/react-native'

import IS_IOS from './IS_IOS'

const channelId = 'example'

/**
 @class for set up notification and set up initial notification response from system mobile api
 */
class NotificationConfigTool {
  constructor() {
    this.initialize()
  }

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
      console.log(JSON.stringify(message, null, ' '), 'message new')
      //JUST foreground
      const body: string = message?.notification?.body || ''
      const title: string = message?.notification?.title || ''
      //@ts-ignore
      const imgUrl: string | undefined = message?.data?.fcm_options?.image || message?.notification?.android?.imageUrl || undefined
      const badgeCount: number | undefined = Number(message?.notification?.android?.count) || Number(message?.notification?.ios?.badge) || undefined
      this.showNotification({imgUrl, badgeCount, title, body})
    })
  }

  /**
     method for display notification from open application
     */
  public showNotification = async ({title, body, imgUrl, badgeCount}: {title: string; body: string; imgUrl?: string; badgeCount?: number}) => {
    const notfeeObj: Notification = {
      title,
      body,
      ios: {attachments: [], badgeCount},
      android: {
        channelId,
        badgeCount,
        badgeIconType: AndroidBadgeIconType.LARGE,
        smallIcon: 'notification_icon',
        color: '#4649ad',
      },
      remote: false,
    }
    if (imgUrl) {
      //@ts-ignore
      notfeeObj.ios.attachments = [{url: imgUrl}]
      //@ts-ignore
      notfeeObj.android.largeIcon = imgUrl
      //@ts-ignore
      notfeeObj.android.style = {picture: imgUrl, type: AndroidStyle.BIGPICTURE}
    }
    if (badgeCount !== undefined) {
      //@ts-ignore
      notfeeObj.ios.badgeCount = badgeCount
      //@ts-ignore
      notfeeObj.android.badgeCount = badgeCount
    }
    await notifee.displayNotification(notfeeObj)
  }

  public async setBadgeCount(count: number) {
    if (Number.isFinite(count)) await notifee.setBadgeCount(count)
  }

  /**
     set android channel
     */
  private setAndroidChannel = async () => {
    await notifee.createChannel({name: channelId, id: channelId, importance: AndroidImportance.HIGH})
  }

  /**
     get push token (return string token from Promise)
     */
  protected getPushToken = async (): Promise<string> => {
    const success = await this.requestPermission()
    if (!success) {
      return ''
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
