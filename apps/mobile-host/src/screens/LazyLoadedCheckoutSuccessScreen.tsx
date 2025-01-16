import React from 'react';

import {LoadingScreen} from 'mobile-core';

import ErrorBoundary from '../components/ErrorBoundary';
import {CheckoutSuccessNavigationProps} from '../navigation/types';

const CheckoutSuccessScreen = React.lazy(() => {
  // @ts-ignore federated dts not enabled yet
  // eslint-disable-next-line import/no-unresolved
  return import('MobileCheckout/CheckoutSuccessScreen');
});

type Props = CheckoutSuccessNavigationProps;

const LazyLoadedCheckoutSuccessScreen = ({navigation}: Props) => {
  const handleDismiss = () => {
    navigation.popToTop();
    navigation.jumpTo('Home');
  };

  return (
    <ErrorBoundary name="CheckoutSuccessScreen">
      <React.Suspense fallback={<LoadingScreen />}>
        <CheckoutSuccessScreen onDismiss={handleDismiss} />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default LazyLoadedCheckoutSuccessScreen;
