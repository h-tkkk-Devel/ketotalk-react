import React, { Component, useRef } from 'react'
import { Text, View, Image, Dimensions, StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper'
import Icon from 'react-native-vector-icons/Ionicons';
const { width } = Dimensions.get('window');
import { ActivityIndicator } from 'react-native-paper';
import YoutubePlayer from "react-native-youtube-iframe";

const Width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  youtube_container: {
    width:Width,
    height: '80%',
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
      dataSource: null,
      auto: true,
      playing: false,
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

    onStateChange = (status) => {
      if(status === "buffering" || status == "playing" || status === "unstarted") {
          this.setState({auto: false});
      } else if(status == 'ended' || status === "paused") {
          this.setState({auto: true});
      }
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
        return <View key={key} style={styles.youTubeSlide} >
                    {/* <Image
                    style={{width: '110%', height: 200, borderRadius: 12, paddingRight: 2}}
                    source={{uri: val.youtube_Img}}
                    /> */}
                    <View style={{width: '110%', height: 200, borderRadius: 12, paddingRight: 2}}>
                        <YoutubePlayer 
                            height={220} 
                            videoId={val.youtube_Id} 
                            onChangeState={this.onStateChange}
                        />
                    </View>
                    <View style={{justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', marginTop:16}}>
                        <Icon name="logo-youtube" size={20} color="red"></Icon>
                        <Text style={styles.title_text}>슬기로운 운동생활</Text>
                    </View>
                    <View>
                        <Text style={styles.sub_title_text}>{val.youtube_Title}</Text>
                    </View>
              </View>

      });
      return (
        <View style={styles.youtube_container}>
        <Swiper style={styles.wrapper} 
          paddingLeft={-44}
          horizontal={true}
          showsPagination={false}
          autoplayTimeout={5}
          autoplay={this.state.auto}>
          {movies}
        </Swiper>
      </View>
      )
    }
  }
}

export default YoutubeSwiper;