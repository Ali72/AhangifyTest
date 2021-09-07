import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {BASE_URL} from '../constants';
import Loading from '../components/indicator';
const axios = require('axios');
import {primaryColor} from '../theme';
// import {CTX} from '../tools/context';

export default function BrowseScreen() {
  // Want to use async/await? Add the `async` keyword to your outer function/method.
  const [data, setData] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  // useEffect(() => {
  //   // getBrowseData();
  // });
  getBrowseData();
  function getBrowseData() {
    if (data != null) {
      return;
    }
    try {
      axios
        .get(BASE_URL + 'tracks')
        .then(function (response) {
          setData(response.data);
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
  }

  const CategoryItem = ({item, onPress}) => (
    <TouchableOpacity>
      <View style={{...styles.vStack}}>
        <View style={{...styles.hStack, padding: 8}}>
          <Image
            style={styles.image}
            source={{
              uri: `${item.cover}`,
            }}
          />
          <View
            style={{
              ...styles.vStack,
              ...styles.item,
            }}>
            <Text style={{fontWeight: '400', fontSize: 18}}>
              {item.performerFa}
            </Text>
            <View
              style={{...styles.hStack, alignItems: 'center', marginTop: 8}}>
              <FontAwesome5 name={'heart'} color={'red'} size={20} solid />
              <Text style={{paddingStart: 8, fontWeight: '400', fontSize: 14}}>
                {item.like_count}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.border} />
    </TouchableOpacity>
  );

  const renderCategoryItem = ({item}) => {
    return <CategoryItem item={item} onPress={() => setSelectedId(item.id)} />;
  };

  return (
    <View style={styles.container}>
      {data != null ? (
        <FlatList
          data={data}
          renderItem={renderCategoryItem}
          keyExtractor={item => item.id}
        />
      ) : (
        <Loading />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  vStack: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  hStack: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  item: {
    color: 'black',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  border: {
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: primaryColor,
  },
  image: {
    height: 100,
    width: 100,
  },
});
