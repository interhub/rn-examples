import codePush from 'react-native-code-push';
import {useLayoutEffect, useState} from 'react';

/**
 TIME BEFORE RESET APP START (AFTER UPDATE) for sync code push
 */
const SLEEP_TIME = 1000;

/**
 @hook for code push reload and update
 */
const useCodePush = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const stopUpdating = () => {
    setIsUpdating(false);
  };

  const startUpdating = () => {
    setIsUpdating(false);
  };

  const syncCodePush = async (): Promise<any> => {
    if (__DEV__) {
      return stopUpdating();
    }
    startUpdating();
    return new Promise((ok) => {
      codePush.sync(
        {installMode: codePush.InstallMode.IMMEDIATE},
        (status) => {
          ok();
          switch (status) {
            case codePush.SyncStatus.UP_TO_DATE:
              return stopUpdating();
            case codePush.SyncStatus.UNKNOWN_ERROR:
              return stopUpdating();
            case codePush.SyncStatus.SYNC_IN_PROGRESS:
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

  useLayoutEffect(() => {
    syncCodePush();
  }, []);

  return {isUpdating, syncCodePush};
};
export default useCodePush;
