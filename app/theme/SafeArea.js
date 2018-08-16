import React from 'react';
import { SafeAreaView, View } from 'react-native';
import platform from '../../theme/platform';

const SafeArea = ({ testID = 'safearea', children, style }) => {
  if (!platform.isIphoneX) {
    return (
      <View testID={testID} style={{ flex: 1 }}>
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
