import React, {useEffect} from 'react';
import {StyleSheet, Text, View, TextInput, ScrollView, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import NoticeSwiper from '../components/NoticeSwiper';
import YoutubeSwiper from '../components/YoutubeSwiper';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
class HomeScreen extends React.Component {
  render() {
      return (
        <View style={styles.container}>
          <LinearGradient colors={['#00aef3', '#00aef0', '#6ac9eb']} start={{ x: 0, y: 5 }} end={{ x: 1, y: 5 }} style={styles.topDeco}>
          </LinearGradient>
          <View style={styles.muiBoxRoot}>
            <View style={{paddingBottom: 16}}>
              <Text style={styles.mainTitle}>KETOTALK</Text>
            </View>
          </View>
          <View style={styles.noticeBox}>
            <View style={styles.noticeMuBox}>
              <NoticeSwiper />
            </View>
          </View>
          <View style={styles.youtubeBox}>
              <YoutubeSwiper />
          </View>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    height: Height
  },
  topDeco: {
    top: 0,
    left: 50,
    width: Width,
    height: 160,
    zIndex: 0,
    position: 'absolute',
    maxWidth: 482,
    transform: [
      {translateX: -50},
    ],
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  muiBoxRoot: {
    position: 'relative',
  },
  mainTitle: {
    fontWeight: '900',
    fontSize: 30,
    color: '#FFF',
    fontFamily: 'NotoSansKR-Black',
  },
  no_wrapper: {},
  noticeBox: {
    marginBottom: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 24,
    backgroundColor: '#fff',
  },
  noticeMuBox: {
    width: 330,
    paddingBottom: 0,
    paddingTop: 0,
    
  },
  youtubeBox: {
    paddingTop: 16,
    height: '80%'
  },
});

export default HomeScreen;