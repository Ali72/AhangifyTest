import React from 'react';
import {View, ActivityIndicator} from 'react-native';

export default function Loading() {
  return (
    <View style={{width: '100%', height: '100%'}}>
      <ActivityIndicator
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        size="large"
      />
    </View>
  );
}
