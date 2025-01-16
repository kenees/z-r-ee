import React, {useMemo} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import {
  colors,
  EmptyScreen,
  ModuleBoundary,
  Text,
  useAuthStore,
  useOrderStore,
  useTranslation,
} from 'mobile-core';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {OrderItem} from '../components/OrderItem';

export default function CartScreen() {
  const {t} = useTranslation('orders');
  const {top} = useSafeAreaInsets();
  const {orders} = useOrderStore();
  const {user} = useAuthStore();

  const currentOrders = useMemo(
    () => orders.filter(order => order.user === user),
    [orders, user],
  );

  if (currentOrders.length === 0) {
    return (
      <EmptyScreen
        boundaryColor={colors.moduleBoundaries.orders}
        icon="clipboard-off-outline"
        title={t('list.empty')}
      />
    );
  }

  return (
    <ModuleBoundary color={colors.moduleBoundaries.orders} borderStyle="dotted">
      <View style={[styles.container, {paddingTop: top}]}>
        <View style={styles.headerContainer}>
          <Text variant="headlineLarge">{t('list.headline')}</Text>
        </View>
        <FlatList
          style={styles.list}
          data={currentOrders}
          keyExtractor={item => item.id}
          renderItem={({item}) => <OrderItem order={item} />}
        />
      </View>
    </ModuleBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    marginHorizontal: 16,
  },
  headerContainer: {
    alignItems: 'center',
  },
});
