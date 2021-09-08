import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Loading from '../components/indicator';
import {primaryColor} from '../theme';
import {connect} from 'react-redux';
import {GET_NEW_DATA} from '../actions/actionTypes';

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
          <View style={{...styles.hStack, alignItems: 'center', marginTop: 8}}>
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
  return <CategoryItem item={item} onPress={() => {}} />;
};
export class NewScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const {navigation} = this.props;
    console.log('did mount');
    this.didFocusListener = navigation.addListener('focus', () => {
      console.log('did focus');
      this.props.getNewData();
    });
    // this.props.getBrowseData();
  }
  componentWillUnmount() {
    console.log('remove focus', this.didFocusListener);
    this.didFocusListener.remove();
  }

  render() {
    // console.log('props=>', this.props);
    const {data} = {...this.props};
    const {isLoading} = this.props;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={data}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    );
  }
}
export default connect(
  state => ({
    data: state.dataReducer.data,
    isLoading: state.dataReducer.isLoading,
  }),
  dispatch => ({
    getNewData: () => dispatch({type: GET_NEW_DATA}),
    // getBrowseData: bindActionCreators(getBrowseData, () => {
    //   return {type: GET_BROWSE_DATA};
    // }),
  }),
)(NewScreen);

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
