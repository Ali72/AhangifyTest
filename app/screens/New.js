import React from 'react';
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
import Loading from '../components/indicator';
const axios = require('axios');
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
    this.state = {
      data: props.data.data,
      isLoading: props.data.isLoading,
    };
  }
  componentDidMount() {
    this.props.getNewData();
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.data == null || this.state.isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={this.state.data}
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
    data: state.data,
    isLoading: state.isLoading,
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
