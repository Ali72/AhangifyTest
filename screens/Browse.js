import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
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
        .get(BASE_URL + 'browse')
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

  const SubCategoryItem = ({item, onPress}) => (
    <TouchableOpacity style={{flex: 1, padding: 4}}>
      <View
        style={{
          ...styles.vStack,
          alignItems: 'center',
          padding: 4,
          ...styles.border,
        }}>
        <Image
          style={styles.image}
          source={{
            uri: `${
              item.type === 'playlist' ? item.item.thumbnail : item.item.cover
            }`,
          }}
        />
        <Text style={styles.subCategoryItem}>{item.type === 'playlist' ? item.item.title:item.item.name}</Text>
      </View>
    </TouchableOpacity>
  );
  const renderSubCategoryItem = ({item}) => {
    return (
      <SubCategoryItem item={item} onPress={() => setSelectedId(item.id)} />
    );
  };

  const CategoryItem = ({item, onPress}) => (
    <TouchableOpacity>
      <Text style={styles.categoryItem}>{item.item.name}</Text>
      <FlatList
        numColumns={3}
        data={item.item.items}
        // ItemSeparatorComponent={() => (
        //   <View style={{width: 16, backgroundColor: 'pink'}} />
        // )}
        renderItem={renderSubCategoryItem}
        keyExtractor={item => item.id}
      />
    </TouchableOpacity>
  );

  const renderCategoryItem = ({item}) => {
    return <CategoryItem item={item} onPress={() => setSelectedId(item.id)} />;
  };

  return (
    <View style={styles.container}>
      {data != null ? (
        <FlatList
          data={data.items}
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
  categoryItem: {
    color: 'black',
    fontWeight: '600',
    fontSize: 25,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  subCategoryItem: {
    color: 'black',
    fontWeight: '400',
    fontSize: 18,
    marginTop: 8,
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
  image: {
    height: 100,
    width: 100,
  },
  border: {
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: primaryColor,
  },
});
