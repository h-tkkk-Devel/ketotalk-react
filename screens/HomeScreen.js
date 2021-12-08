import React, {useEffect} from 'react';
import {StyleSheet, Text, View, TextInput, ScrollView, Dimensions, StatusBar, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import NoticeSwiper from '../components/NoticeSwiper';
import YoutubeSwiper from '../components/YoutubeSwiper';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const BarHeight = Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;
const Width = Dimensions.get('window').width;

const Height = Dimensions.get('window').height;
class HomeScreen extends React.Component {
  render() {
      return (
        <View style={styles.container}>
            <View>
                <LinearGradient colors={['#00aef3', '#00aef0', '#6ac9eb']} start={{ x: 0, y: 5 }} end={{ x: 1, y: 5 }} style={styles.topDeco}>
                    <View style={{position:"relative", margin:16}}>
                        <Text style={styles.mainTitle}>KETOTALK</Text>
                    </View>
                    <View style={styles.noticeBox}>
                        <View style={styles.noticeMuBox}>
                            <NoticeSwiper />
                        </View>
                    </View>
                </LinearGradient>
            </View>

            <View style={styles.content}>
                <View style={styles.youtubeBox}>
                    <YoutubeSwiper />
                </View>
            </View>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection:"column",
    backgroundColor: '#fff',
    height: Height
  },
  topDeco: {
    width: Width,
    height: 160 + BarHeight,
    paddingTop:BarHeight,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  content:{
    padding:16
  }, 
  muiBoxRoot: {
    position: 'relative',
  },
  mainTitle: {
    fontWeight: '900',
    fontSize: 30,
    color: '#FFF',
    backgroundColor:'transparent',
    fontFamily: 'NotoSansKR-Black',
  },
  no_wrapper: {},
  noticeBox: {
    marginBottom: 16,
    marginTop: 16,
    padding: 16,
    marginRight:16,
    marginLeft:16,
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