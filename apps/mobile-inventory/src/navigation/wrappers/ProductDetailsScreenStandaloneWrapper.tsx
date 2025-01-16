import React from 'react';
import {Alert} from 'react-native';

import ProductDetailsScreen from '../../screens/ProductDetailsScreen';

export const ProductDetailsScreenStandaloneWrapper = () => {
  const goBack = () => {
    Alert.alert('Go back');
  };

  const productId = '1';

  return <ProductDetailsScreen goBack={goBack} productId={productId} />;
};
