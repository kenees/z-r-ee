import React from 'react';

import ErrorBoundary from '../components/ErrorBoundary';
import Placeholder from '../components/Placeholder';
import { View, Text } from 'react-native';

// const OrdersScreen = React.lazy(async () => {
//   // @ts-ignore federated dts not enabled yet
//   // eslint-disable-next-line import/no-unresolved
//   return await import('MobileOrders/OrdersScreen');
// });

const LazyLoadedOrderScreen = () => {
  return (
    <ErrorBoundary name="OrderScreen">
      <React.Suspense fallback={<Placeholder />}>
        {/* <OrdersScreen /> */}
        <View>
          <Text>order screen</Text>
        </View>
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default LazyLoadedOrderScreen;
