import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  ScrollView,
  TouchableHighlight, 
  Modal, 
  Pressable,
  Image,
  Dimensions,
  Platform,
  StatusBar
 } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import SearchBar from '../components/SearchBar';
import Tabs from 'react-native-tabs';
import DictCard from '../components/DictCard';
import CardView from 'react-native-rn-cardview';
import ModalTest from '../components/ModalTest';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const BarHeight = Platform.OS === 'ios' ? getStatusBarHeight(true) : 0;
// const BarHeight = Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;
const cardPadding = Platform.OS === 'ios' ? 16 : 0;

const Width = Dimensions.get('window').width;    //스크린 너비 초기화
class DictScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      page:'ALL',
      isLoading: true,
      diseaseList: null,
      modalVisible: false,
      detailTitle: "",
      detailContent: "",
      detailSymptom: "",
      detailCure: "",
      detailNameUn: ""
    };
  }

  componentDidMount() {
    return fetch('http://172.30.1.10:8080/diseaseList',{
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers:{
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(this.state.page)
    })
              .then ( (response) => response.json() )
              .then ( (responseJson) => {
                this.setState({
                  isLoading: false,
                  diseaseList: responseJson,
                })
              })
              .catch((error) => {
                console.log(error)
              });
  }

  testComp(name) {
    return fetch('http://172.30.1.10:8080/diseaseList',{
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers:{
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(name)
    })
              .then ( (response) => response.json() )
              .then ( (responseJson) => {
                this.setState({
                  isLoading: false,
                  diseaseList: responseJson,
                  page: name,
                })
              })
              .catch((error) => {
                console.log(error)
              });
  }

  onDiseaseDetilBtn(detailNo) {
    return fetch('http://13.209.250.239:8080/getDiseaseDetail',{
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers:{
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(detailNo)
    })
    .then ( (response) => response.json() )
    .then ( (responseJson) => {
      this.setState({
         modalVisible: true,
         detailTitle: responseJson.disease_name,
         detailContent: responseJson.disease_content,
         detailSymptom: responseJson.disease_symptom,
         detailCure: responseJson.disease_cure,
         detailNameUn: responseJson.disease_name_un
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
            <View style={{marginTop: BarHeight}}></View>
            <LinearGradient colors={['#6ac9eb', '#6ac9eb', '#c3e9f7']} start={{ x: 0, y: 5 }} end={{ x: 1, y: 5 }} style={styles.topDeco2}>
            </LinearGradient>
            <LinearGradient colors={['#00aef3', '#00aef0', '#6ac9eb']} start={{ x: 0, y: 5 }} end={{ x: 1, y: 5 }} style={styles.topDeco}>
            </LinearGradient>
            <View style={styles.topTitleBox}>
              <Text style={styles.topTitle}>질환백과</Text>
              <View style={{display:'flex', alignItems:'center', paddingTop: 6, paddingBottom:46}}>
                <SearchBar />
              </View>
            </View>
            <ScrollView>
              <View style={{height:80}}>
                <Tabs selected={this.state.page} style={{backgroundColor:'white'}}
                    selectedStyle={{color:'blue'}} onSelect={el=>this.setState({page:el.props.name, isLoading: true, diseaseList: null},() => {
                      return this.testComp();
                    })}>
                      <Text name="ALL" selectedIconStyle={{borderBottomWidth:2,borderBottomColor:'blue'}}>전체</Text>
                      <Text name="UPPER" selectedIconStyle={{borderBottomWidth:2,borderBottomColor:'blue'}}>상체</Text>
                      <Text name="LOWER" selectedIconStyle={{borderBottomWidth:2,borderBottomColor:'blue'}}>하체</Text>
                      <Text name="FOOT" selectedIconStyle={{borderBottomWidth:2,borderBottomColor:'blue'}}>발</Text>
                      <Text name="HAND" selectedIconStyle={{borderBottomWidth:2,borderBottomColor:'blue'}}>손</Text>
                      <Text name="ETC" selectedIconStyle={{borderBottomWidth:2,borderBottomColor:'blue'}}>기타</Text>
                </Tabs>
              </View>
              <View style={{paddingTop:16}}></View>
              <Text style={styles.instructions}>
                  페이징Selected page: {this.state.page}
              </Text>
            </ScrollView>
          </View>
      )
    } else {
      let disease = this.state.diseaseList.map((val, key) => {
        return <View>
            <TouchableHighlight 
              style={{flex: 2, paddingBottom:cardPadding}}
              Button onPress={() => this.onDiseaseDetilBtn(val.disease_seq)}  
              underlayColor={'#fff'}
              activeOpacity={0.5}
              >
              <CardView key={key} cardElevation={4}             
                  maxCardElevation={4}
                  radius={10}
                  backgroundColor={'#ffffff'}>
                <View style={{padding:12}}>
                  <View>
                    <Text style={{fontWeight:'bold'}}>{val.disease_name}</Text>
                  </View>
                  <View>
                    <Text>{val.disease_content}</Text>
                  </View>
                </View>
              </CardView>
            </TouchableHighlight>
        </View>
      });
      return (
          <View style={styles.container}>
            <View style={{marginTop: BarHeight}}></View>
            <LinearGradient colors={['#6ac9eb', '#6ac9eb', '#c3e9f7']} start={{ x: 0, y: 5 }} end={{ x: 1, y: 5 }} style={styles.topDeco2}>
            </LinearGradient>
            <LinearGradient colors={['#00aef3', '#00aef0', '#6ac9eb']} start={{ x: 0, y: 5 }} end={{ x: 1, y: 5 }} style={styles.topDeco}>
            </LinearGradient>
            <View style={styles.topTitleBox}>
              <Text style={styles.topTitle}>질환백과</Text>
              <View style={{display:'flex', alignItems:'center', paddingTop: 6, paddingBottom:46}}>
                <SearchBar />
              </View>
            </View>
            <ScrollView>
              <View style={{height:80}}>
                <Tabs selected={this.state.page} style={{backgroundColor:'white'}}
                    selectedStyle={{color:'blue'}} onSelect={el => this.testComp(el.props.name)}>
                      <Text name="ALL" selectedIconStyle={{borderBottomWidth:2,borderBottomColor:'blue'}}>전체</Text>
                      <Text name="UPPER" selectedIconStyle={{borderBottomWidth:2,borderBottomColor:'blue'}}>상체</Text>
                      <Text name="LOWER" selectedIconStyle={{borderBottomWidth:2,borderBottomColor:'blue'}}>하체</Text>
                      <Text name="FOOT" selectedIconStyle={{borderBottomWidth:2,borderBottomColor:'blue'}}>발</Text>
                      <Text name="HAND" selectedIconStyle={{borderBottomWidth:2,borderBottomColor:'blue'}}>손</Text>
                      <Text name="ETC" selectedIconStyle={{borderBottomWidth:2,borderBottomColor:'blue'}}>기타</Text>
                </Tabs>
              </View>
              <View>
                {(() => {
                  switch(this.state.page) {
                    case 'ALL' :
                      return disease
                    case 'UPPER' :
                      return disease
                    case 'LOWER' :
                      return disease
                    case 'FOOT' :
                      return disease
                    case 'HAND' :
                      return disease
                    case 'ETC' :
                      return disease
                  }
                })()}
              </View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {this.setState({modalVisible:false})}}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <ScrollView>
                      <Text style={styles.modalText}>{this.state.detailTitle}</Text>
                      <Text style={styles.modalSubText}>{this.state.detailNameUn}</Text>
                      {/* <Image style={{width: 190, height: 200,marginBottom: 15,alignItems: "center"}}
                        source={require('../public/body3.png')}
                        resizeMode="contain"
                      /> */}
                      <Text style={styles.modalContent}>{this.state.detailContent}</Text>
                      <Text style={styles.modalSubTitle}>증상</Text>
                      <Text style={styles.modalContent}>{this.state.detailSymptom}</Text>
                      <Text style={styles.modalSubTitle}>진단 및 치료</Text>
                      <Text style={styles.modalContent}>{this.state.detailCure}</Text>
                      <Pressable style={[styles.button, styles.buttonClose]} onPress={() => this.setState({modalVisible:false})}>
                        <Text style={styles.textStyle}>뒤로가기</Text>
                      </Pressable>
                      <Text style={styles.instructions}></Text>
                    </ScrollView>
                  </View>
                </View>
              </Modal>
              <Text style={styles.instructions}></Text>
            </ScrollView>
          </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff'
  },
  topDeco: {
    top: 0,
    left: 50,
    width: Width,
    height: 130,
    zIndex: 1,
    position: 'absolute',
    maxWidth: 482,
    transform: [
      {translateX: -50},
    ],
    opacity:0.8,
    borderBottomLeftRadius: 100,
  },
  topDeco2: {
    top: 0,
    left: 50,
    width: Width,
    height: 150,
    zIndex: 1,
    position: 'absolute',
    maxWidth: 482,
    transform: [
      {translateX: -50},
    ],
    opacity:0.8,
    borderBottomLeftRadius: 80,
  },
  topTitleBox: {
    left:  50,
    width: '100%',
    height: 120,
    paddingLeft: 36,
    paddingRight: 16,
    zIndex: 2,
    maxWidth: 482,
    transform: [
      {translateX: -50},
    ],
  },
  topTitle: {
    fontWeight: '900',
    fontSize: 30,
    color: '#FFF',
    fontFamily: 'NotoSansKR-Black',
  },
  tabGroup: {
    display: 'flex',
    height: 300,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 65,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    color: '#000',
    fontSize: 24,
    fontFamily: 'NotoSansKR-Regular',
    fontWeight:'700',
    marginBottom: 15,
    textAlign: "center"
  },
  modalSubText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'NotoSansKR-Regular',
    fontWeight:'700',
    marginBottom: 15,
    textAlign: "center"
  },
  modalContent: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'NotoSansKR-Regular',
    marginBottom: 15,
    textAlign: "left"
  },
  modalSubTitle: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'NotoSansKR-Regular',
    fontWeight:'700',
    marginBottom: 15,
    textAlign: 'left',
  }
});

export default DictScreen;