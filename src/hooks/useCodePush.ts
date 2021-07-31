import codePush from 'react-native-code-push';
import {useLayoutEffect, useState} from 'react';

/**
 TIME BEFORE RESET APP START (AFTER UPDATE) for sync code push
 */
const SLEEP_TIME = 1000;

/**
code push dev keys
 */
enum CODE_PUSH_KEYS {
  STAGING = 'cNG5Y9IF9Yd1tmpMfARSQU0t2A2QC_7nDnD-8',
  PRODUCTION = 'y4ad57B9UBuP607WlBgqLj-Vupwhfq5pF2Ukb',
}

/**
 @hook for code push reload and update
 */
const useCodePush = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const stopUpdating = () => {
    setIsUpdating(false);
  };

  const startUpdating = () => {
    setIsUpdating(true);
  };

  const syncCodePush = async (isProduction: boolean): Promise<any> => {
    if (__DEV__) {
      return stopUpdating();
    }
    startUpdating();
    return new Promise((ok) => {
      const deploymentKey: CODE_PUSH_KEYS = isProduction ? CODE_PUSH_KEYS.PRODUCTION : CODE_PUSH_KEYS.STAGING

      codePush.sync(
        {installMode: codePush.InstallMode.IMMEDIATE, deploymentKey},
        (status) => {
          ok();
          switch (status) {
            case codePush.SyncStatus.UP_TO_DATE:
              return stopUpdating();
            case codePush.SyncStatus.UNKNOWN_ERROR:
              return stopUpdating();
            case codePush.SyncStatus.SYNC_IN_PROGRESS:
                console.log('hello')
              return startUpdating();
          }
        },
        async (progress) => {
          if (progress.receivedBytes === progress.totalBytes) {
            setTimeout(ok, SLEEP_TIME);
          }
        },
      );
    });
  };

  return {syncCodePush, isUpdating};
};
export default useCodePush;
