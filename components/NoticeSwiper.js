import React, { Component } from 'react'
import { Text, View, Image, Dimensions, StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper'
const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  notice_container: {
    height: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  wrapper: {
  },
  slide: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'transparent'
  },
  noticeContent: {
    color:'#000',
    fontWeight: '700',
    fontSize: 15,
    fontFamily: 'NotoSansKR-Medium',
  },
});

export default class extends Component {
  render() {
    return (
      <View style={styles.notice_container}>
        <Swiper style={styles.wrapper} height={70} horizontal={true} showsPagination={false} autoplay>
          <View style={styles.slide}>
            <Text style={styles.noticeContent}>[공지] 케토톡 오픈 이벤트!</Text>
          </View>
          <View style={styles.slide}>
            <Text style={styles.noticeContent}>[공지] 사용자 등록 팁</Text>
          </View>
          <View style={styles.slide}>
            <Text style={styles.noticeContent}>[이벤트] 스타벅스 아이스아메리카노 지급!!</Text>
          </View>
        </Swiper>
      </View>
    )
  }
}