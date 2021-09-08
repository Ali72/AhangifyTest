import React from 'react';
import {connect} from 'react-redux';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Loading from '../components/indicator';
import {primaryColor} from '../theme';
import {GET_BROWSE_DATA} from '../actions/actionTypes';

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
      <Text style={styles.subCategoryItem}>
        {item.type === 'playlist' ? item.item.title : item.item.name}
      </Text>
    </View>
  </TouchableOpacity>
);
const renderSubCategoryItem = ({item}) => {
  return <SubCategoryItem item={item} onPress={() => {}} />;
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
  return <CategoryItem item={item} onPress={() => {}} />;
};

class BrowseScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {navigation} = this.props;
    console.log('did mount');
    this.didFocusListener = navigation.addListener('focus', () => {
      console.log('did focus');
      this.props.getBrowseData();
    });
  }
  componentWillUnmount() {
    console.log('remove focus', this.didFocusListener);
    this.didFocusListener.remove();
  }

  render() {
    // console.log('props=>', this.props);
    const data = {...this.props.data};
    const {isLoading} = this.props;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={data.items}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    );
  }
}

// const mapState = state => state.data;
// const mapDispatch = {getBrowseData};
// const connection = connect(mapState, mapDispatch);
// export default connection(BrowseScreen);

export default connect(
  state => ({
    data: state.dataReducer.data,
    isLoading: state.dataReducer.isLoading,
  }),
  dispatch => ({
    getBrowseData: () => dispatch({type: GET_BROWSE_DATA}),
    // getBrowseData: bindActionCreators(getBrowseData, () => {
    //   return {type: GET_BROWSE_DATA};
    // }),
  }),
)(BrowseScreen);

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
