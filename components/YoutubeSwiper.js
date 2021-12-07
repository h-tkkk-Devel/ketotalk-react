import React, { Component } from 'react'
import { Text, View, Image, Dimensions, StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper'
import Icon from 'react-native-vector-icons/Ionicons';
const { width } = Dimensions.get('window');
import { ActivityIndicator } from 'react-native-paper';

const Width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  youtube_container: {
    width:Width,
    height: '70%',
    position: 'relative',
    overflow: 'hidden',
  },
  wrapper: {
  },
  youTubeSlide: {
    width: Width-30,
    justifyContent: 'flex-start',
    paddingRight: 35,
    borderRadius: 24,
    backgroundColor: '#F5F5F5',
  },
  text: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold'
  },
  title_text: {
    fontWeight: '700',
    fontSize: 14,
    color: '#999999',
    fontFamily: 'NotoSansKR-Light',
  },
  sub_title_text: {
    fontWeight: 'normal',
    fontSize: 17,
    color: 'black',
    fontFamily: 'NotoSansKR-Bold',
    paddingLeft: 16,
  },
  content_text: {
    fontWeight: '800',
    fontSize: 14,
    color: '#999999',
    fontFamily: 'NotoSansKR-Medium',
    paddingLeft: 16,
  },
  image: {
    width,
    flex: 1
  }
});

class YoutubeSwiper extends React.Component {
//export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null
    }
  }

  componentDidMount() {
    return fetch('http://13.209.250.239:8080/home')
              .then ( (response) => response.json() )
              .then ( (responseJson) => {
                this.setState({
                  isLoading: false,
                  dataSource: responseJson,
                })
              })
              .catch((error) => {
                console.log(error)
              });
  }

  render() {
    if(this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    } else {
      //let movies = this.state.dataSource;
      let movies = this.state.dataSource.map((val, key) => {
        return <View key={key} style={styles.youTubeSlide}>
                <Image
                  style={{width: '110%', height: 200, borderRadius: 12, paddingRight: 2}}
                  source={{uri: val.youtube_Img}}
                />
                <View style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row'}}>
                  <Icon name="logo-youtube" size={20} color="red"></Icon>
                  <Text style={styles.title_text}>슬기로운 운동생활</Text>
                </View>
                <View>
                  <Text style={styles.sub_title_text}>{val.youtube_Title}</Text>
                </View>
                {/* <View>
                  <Text style={styles.content_text}>벤치프레스 그립 너비, 겨드랑이 각도를 정확하게</Text>
                </View> */}
              </View>

      });
      return (
        <View style={styles.youtube_container}>
        <Swiper style={styles.wrapper} 
          paddingLeft={-44}
          horizontal={true}
          showsPagination={false}
          autoplayTimeout={5}
          autoplay>
          {movies}
        </Swiper>
      </View>
      )
    }
  }
}

export default YoutubeSwiper;