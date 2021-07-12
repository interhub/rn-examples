import React from 'react';
import useCodePush from '../hooks/useCodePush'
import WaitUpdateAlert from '../components/WaitUpdateAlert'

const CodePushWrapper = ({children}: {children: React.ReactNode}) => {
  const {isUpdating} = useCodePush();
  if (isUpdating) {
    return <WaitUpdateAlert />;
  }
  return <>{children}</>;
};

export default CodePushWrapper;
