import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Dimensions, 
  ScrollView, 
  TouchableOpacity,
  TouchableHighlight,
  Modal, 
  Pressable,
  TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DeviceInfo from 'react-native-device-info';
import CardView from 'react-native-rn-cardview';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from 'react-native-picker-select';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
class UserScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      inputText: "",
      birth: "",
      sex: "",
      isLoading: true,
      diviceId: "",
      modalVisible: false,
      changeName: "",
      changeBirth: "",
      changeSex: ""
    }
  }

  componentDidMount() {
    let uniqueId = DeviceInfo.getUniqueId();
    return fetch('http://13.209.250.239:8080/selectUniqueId',{
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers:{
        'Content-Type' : 'application/json'
      },
      body: uniqueId
    })
    .then ( (response) => response.json() )
    .then ( (responseJson) => {
      if(responseJson.user_id == null || responseJson.user_id == "" || responseJson.user_id == undefined){
        this.setState({
          diviceId: uniqueId,
        })
      } else {
        this.setState({
          isLoading: false,
          diviceId: responseJson.user_id,
          inputText: responseJson.user_nickname,
          birth: responseJson.user_birth,
          sex: responseJson.user_sex,
        })
      }
      })
      .catch((error) => {
        console.log(error)
      });
  }

  onUserDetilBtn(id) {
    if(id != null || id != "" || id != undefined){
      this.setState({
         modalVisible: true,
       })
    }
  }

  render() {
    if(this.state.inputText == '' || this.state.inputText == null || this.state.inputText == undefined){
      return  <View style={styles.container}>
        <LinearGradient colors={['#00aef3', '#00aef3', '#6ac9eb']} start={{ x: 0, y: 5 }} end={{ x: 1, y: 5 }} style={styles.topDeco}>
        </LinearGradient>
        <View style={styles.muiBoxRoot}>
          <View style={{width:Width, height:'80%'}}>
            <Text style={styles.welcome}>안녕하세요 !</Text>
            <Text style={styles.mainTitle}>홍길동 님</Text>
            <View style={{paddingLeft:6}}>
              <Text style={styles.userInfo}>생년월일: </Text>
              <Text style={styles.userInfo}>성별: </Text>
            </View>
          </View>
        </View>
      </View>
    } else {
      return (
        <View style={styles.container}>
          <LinearGradient colors={['#00aef3', '#00aef3', '#6ac9eb']} start={{ x: 0, y: 5 }} end={{ x: 1, y: 5 }} style={styles.topDeco} />
          <View style={styles.muiBoxRoot}>
            <TouchableHighlight
              style={{flex: 2,}}
              Button onPress={() => this.onUserDetilBtn(this.state.diviceId)}  
              underlayColor={'(0, 0, 0, 0.5)'}
              activeOpacity={0.5}>
              <View style={{width:Width, height:'100%',justifyContent:'center'}}>
                <Text style={styles.welcome}>안녕하세요 !</Text>
                <Text style={styles.mainTitle}>{this.state.inputText} 님</Text>
                <View>
                  <Text style={styles.userInfo}>생년월일: {this.state.birth}</Text>
                  <Text style={styles.userInfo}>성별: {this.state.sex == '2' ? '남' : '여'}</Text>
                </View>
              </View>
            </TouchableHighlight>
          </View>

          <View style={styles.aiHistoryBox}>
            <View style={styles.boxLine} />
            <ScrollView>
              <View style={{paddingLeft: 16, paddingTop:80, width:'100%'}}>
                <Text style={styles.aiHistoryTitle}>AI 진단기록</Text>
                <Text style={styles.aiHistoryBirth}>2021년 11월 8일 (월)</Text>
                <View style={{width:'100%'}}>
                  <CardView cardElevation={4}
                    maxCardElevation={4}
                    radius={10}>
                    <View style={{padding:12}}>
                      <View>
                        <Text style={{fontWeight:'bold'}}>족저근막염 88.3%</Text>
                      </View>
                      <View>
                        <Text>2021.10.8 (월)</Text>
                      </View>
                    </View>
                  </CardView>
                  <CardView cardElevation={4}
                    maxCardElevation={4}
                    radius={10}>
                    <View style={{padding:12}}>
                      <View>
                        <Text style={{fontWeight:'bold'}}>발목염좌 88.3%</Text>
                      </View>
                      <View>
                        <Text>2021.10.8 (월)</Text>
                      </View>
                    </View>
                  </CardView>
                  <CardView cardElevation={4}
                    maxCardElevation={4}
                    radius={10}>
                    <View style={{padding:12}}>
                      <View>
                        <Text style={{fontWeight:'bold'}}>발목 골절 88.3%</Text>
                      </View>
                      <View>
                        <Text>2021.10.8 (월)</Text>
                      </View>
                    </View>
                  </CardView>
                  <CardView cardElevation={4}
                    maxCardElevation={4}
                    radius={10}>
                    <View style={{padding:12}}>
                      <View>
                        <Text style={{fontWeight:'bold'}}>족저근막염 88.3%</Text>
                      </View>
                      <View>
                        <Text>2021.10.8 (월)</Text>
                      </View>
                    </View>
                  </CardView>
                  <CardView cardElevation={4}
                    maxCardElevation={4}
                    radius={10}>
                    <View style={{padding:12}}>
                      <View>
                        <Text style={{fontWeight:'bold'}}>발목염좌 48.3%</Text>
                      </View>
                      <View>
                        <Text>2021.10.8 (월)</Text>
                      </View>
                    </View>
                  </CardView>
                </View>
              </View>
            </ScrollView>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {this.setState({modalVisible:false})}}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                  <Text style={styles.modalText}>기본 정보</Text>
                  <Text style={styles.modalDivice}>diviceID: {this.state.diviceId}</Text>
                  <View style={{flexDirection:'row'}}>
                    <Text style={styles.modalSubTitle}>이름: </Text>
                    <TextInput
                    maxFontSizeMultiplier={0}
                    style={styles.textInput}
                      onChangeText={(text) => {this.setState({changeName: text})}}
                      placeholder={this.state.inputText}
                    />
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Text style={styles.modalSubTitle}>생일: </Text>
                    <DateTimePicker onChange={(date) => this.onDateChange(date)} birth={this.state.birth}/>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Text style={styles.modalSubTitle}>성별: </Text>
                    <PickerScreen sexChange={(sex) => this.onSexChange(sex)} sex={this.state.sex}/>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <View style={{paddingRight:16}}>
                      <Pressable style={[styles.button, styles.buttonClose]} onPress={() => this.setState({modalVisible:false})}>
                        <Text style={styles.textStyle}>뒤로가기</Text>
                      </Pressable>
                    </View>
                    <View style={{paddingRight:16}}>
                      <Pressable style={[styles.button, styles.buttonModify]} onPress={() => this.setState({modalVisible:false})}>
                        <Text style={styles.textStyle}>저장</Text>
                      </Pressable>
                    </View>
                  </View>
              </View>
            </View>
          </Modal>
        </View>
      )
    }
  }
}

Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";
 
    const weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    let d = this;
     
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};
 
String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};

const DateTimePicker = ({onChange, birth}) => {
  const placeholder = birth;

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [text, onChangeText] = useState("");
    
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        //console.warn("dateFormat: ", date.format("yyyy/MM/dd"));
        hideDatePicker();
        onChangeText(date.format("yyyy/MM/dd"));
        onChange(date.format("yyyy/MM/dd"));
        
  };

  return (
            <TouchableOpacity onPress={showDatePicker}>
                <TextInput
                    pointerEvents="none"
                    style={styles.textInput}
                    placeholder={placeholder}
                    placeholderTextColor='#808080'
                    underlineColorAndroid="transparent"
                    editable={false}
                    value={text}
                />
                <DateTimePickerModal
                    locale="ko"
                    headerTextIOS={placeholder}
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </TouchableOpacity>
  );
}

const PickerScreen = ({sexChange, sex}) => {
	const [text, setText] = useState("");
    const placeholder = sex == '2' ? '남' : '여';
    
    const onChangeText = (value) => {
        //console.warn(value)
        setText(value);
        sexChange(value);
    } 
    
    return (
    <RNPickerSelect
        textInputProps={{ underlineColorAndroid: 'transparent', color:'gray'}}
        placeholder={{
            label: placeholder,
        }}
        fixAndroidTouchableBug={true}
        value={text}
        
        onValueChange={value => onChangeText(value)}
        useNativeAndroidPickerStyle={false}
        items={[
            { label: '남자', value: '2', key: '2'},
            { label: '여자', value: '3', key: '3' },
        ]}
        style={pickerSelectStyles}
    />
    );
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        height: 50, 
        width: 300, 
        color: '#000000',
        borderColor: '#000000', 
        borderWidth: 1, 
        borderRadius: 12,
        padding: 10
    },
    inputAndroid: {
      marginBottom: 10,
      paddingHorizontal: 10,
      width: 160,
      height: 40,
      borderRadius: 10,
      borderColor: 'gray',
      borderWidth: 1,
      color: '#000'
    },
});

const styles = StyleSheet.create({
  container: {
    flex:1,
    display: 'flex',
    height: Height,
    padding:16,
    paddingBottom: 0,
    backgroundColor: '#fff'
  },
  topDeco: {
    top: -30,
    left: -20,
    width: Width + 60,
    height: 250,
    zIndex: 1,
    position: 'absolute',
    maxWidth: 482,
    transform: [{ skewY: "9deg" }],
  },
  muiBoxRoot: {
    flex:1,
    zIndex:2,
    position: 'relative',
  },
  welcome: {
    color: '#fff',
    fontSize:18,
    fontFamily: 'NotoSansKR-Regular',
    fontWeight: '700',
    lineHeight:24
  },
  mainTitle: {
    color: '#FFF',
    fontWeight: '400',
    fontSize: 30,
    fontFamily: 'NotoSansKR-Black',
    lineHeight:40
  },
  userInfo:{
    color: '#FFF',
    fontSize:14,
    fontFamily: 'NotoSansKR-Regular',
    fontWeight: '700',
  },
  aiHistoryBox: {
    flex:3,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  boxLine: {
    paddingTop:80,
    height:'100%',
    width: 1.5,
    backgroundColor: '#cccccc',
  },
  aiHistoryTitle: {
    color: '#000',
    fontSize:22,
    fontFamily: 'NotoSansKR-Regular',
    fontWeight:'500',
    lineHeight: 25
  },
  aiHistoryBirth: {
    fontSize: 14,
    fontFamily: 'NotoSansKR-Regular',
    fontWeight:'700'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "skyblue",
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
  buttonModify: {
    backgroundColor: "green",
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
  modalContent: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'NotoSansKR-Regular',
    marginBottom: 15,
    textAlign: "center"
  },
  modalDivice: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'NotoSansKR-Regular',
    fontWeight:'700',
    marginBottom: 15,
    textAlign: 'left'
  },
  modalSubTitle: {
    color: '#000',
    fontSize: 24,
    fontFamily: 'NotoSansKR-Regular',
    fontWeight:'700',
    marginBottom: 15,
    textAlign: 'left'
  },
  textInput: {
    marginBottom: 12,
    paddingHorizontal: 10,
    width: 160,
    height: 40,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    color: '#000'
  },
});

export default UserScreen;