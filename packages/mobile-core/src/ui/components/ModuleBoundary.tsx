import React, {ReactNode} from 'react';
import {ColorValue, StyleSheet, View, ViewStyle} from 'react-native';

// @ts-ignore
import {ScreenCornerRadius} from 'react-native-screen-corner-radius';

import {useModuleBoundaryStore} from '../../utils';

export const ModuleBoundary = ({
  color,
  withTopRadius = false,
  withBottomRadius = false,
  children,
}: {
  children: ReactNode;
  color: ColorValue;
  withTopRadius?: boolean;
  withBottomRadius?: boolean;
}) => {
  const {isEnabled} = useModuleBoundaryStore();

  if (!isEnabled || !React.isValidElement(children)) {
    return children;
  }

  return (
    <View style={styles.container}>
      <View
        pointerEvents="none"
        style={[
          styles.borderView,
          {
            borderColor: color,
          },
          withTopRadius && {
            borderTopLeftRadius: ScreenCornerRadius,
            borderTopRightRadius: ScreenCornerRadius,
          },
          withBottomRadius && {
            borderBottomLeftRadius: ScreenCornerRadius,
            borderBottomRightRadius: ScreenCornerRadius,
          },
        ]}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  borderView: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1000,
    width: '100%',
    height: '100%',
    borderWidth: 8,
    borderStyle: 'dotted',
  },
});
