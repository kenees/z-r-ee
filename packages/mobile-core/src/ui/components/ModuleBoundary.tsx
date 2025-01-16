import React, {ReactNode} from 'react';
import {ColorValue, ViewStyle} from 'react-native';

import {useModuleBoundaryStore} from '../../utils';

export const ModuleBoundary = ({
  color,
  children,
  borderStyle = 'dashed',
}: {
  children: ReactNode;
  color: ColorValue;
  borderStyle?: ViewStyle['borderStyle'];
}) => {
  const {isEnabled} = useModuleBoundaryStore();

  if (!isEnabled) {
    return children;
  }

  const updatedChildren = React.isValidElement(children)
    ? React.cloneElement(children, {
        ...children.props,
        style: [
          ...(Array.isArray(children.props.style)
            ? children.props.style
            : [children.props.style]),
          {
            borderColor: color,
            borderWidth: 8,
            borderStyle,
          },
        ],
      })
    : children;

  return updatedChildren;
};
