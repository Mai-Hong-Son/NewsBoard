import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import platform from './platform';

const SafeArea = ({ testID = 'safearea', children, style }) => {
  if (!platform.isIphoneX) {
    return (
      <View testID={testID} style={{ flex: 1, backgroundColor: '#fff' }}>
        {children}
      </View>
    );
  }
  return (
    <SafeAreaView testID={testID} style={[{ flex: 1, backgroundColor: '#fff' }, style && style]}>
      {children}
    </SafeAreaView>
  );
};

export default SafeArea;
