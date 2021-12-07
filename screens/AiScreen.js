import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  TouchableHighlight,
  TextInput,
  ScrollView,
  Alert,
  Dimensions
} from 'react-native';
import { ProgressBar, Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Btn from 'react-native-micro-animated-button';
import SexDropdown from '../components/SexDropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";
//import { Card } from 'react-native-elements';
import CardView from 'react-native-rn-cardview';
import DeviceInfo from 'react-native-device-info';

const Width = Dimensions.get('window').width;    //스크린 너비 초기화
const Height = Dimensions.get('window').height;
class AiScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      viewKey: 'default',
      btnState: true,
      persBar: 0,
      present: 0,
      inputText: "",
      birth: "",
      sex: "",
      isLoading: true,
      resultData: "",
      diviceId: "",
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
          persBar: 0.3,
          present: 30,
          diviceId: responseJson.user_id,
          inputText: responseJson.user_nickname,
          birth: responseJson.user_birth,
          sex: responseJson.user_sex,
          viewKey: 'defaultQ'
        })
      }
      })
      .catch((error) => {
        console.log(error)
      });
  }

  onDateChange(date) {
    this.setState({birth: date});
  }

  onSexChange(sex){
    this.setState({sex: sex});
  }

  onSubmitData() {
    let validation = true;
    if(this.state.inputText == "" || this.state.inputText == undefined){
      Alert.alert('사용자 이름을 입력해주세요')
      this.state.btnState ? this.setState({btnState:false}) : this.setState({btnState:true});
      validation = false;
    } else if(this.state.birth == "" || this.state.birth == undefined){
      Alert.alert('생년월일을 선택해주세요')
      this.state.btnState ? this.setState({btnState:false}) : this.setState({btnState:true});
      validation = false;
    } else if(this.state.sex == "" || this.state.sex == undefined){
      Alert.alertt('성별을 선택해주세요')
      this.state.btnState ? this.setState({btnState:false}) : this.setState({btnState:true});
      validation = false;
    }

    if(this.state.viewKey === 'default' && validation == true){
      return fetch('http://13.209.250.239:8080/insertUser',{
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers:{
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            user_nickname: this.state.inputText,
            user_id: this.state.diviceId,
            user_birth: this.state.birth,
            user_sex: this.state.sex
          })
      })
      .then ( (response) => response.text() )
      .then ( (resultView) => {
        this.setState({
          isLoading: false,
          //resultData: responseJson,
          viewKey: resultView,
          persBar: 0.3,
          present: 30,
        });
        this.state.btnState ? this.setState({btnState:false}) : this.setState({btnState:true});
      })
      .catch((error) => {
        console.log(error)
      });
    }
  }  

  onQChange(data) {
    alert('3'+data);
  }

  render() {
    if(this.state.isLoading){
      return <ScrollView style={styles.coinView}>
        <View style={styles.container}>
          <View style={{ padding: 28, height:'16%'}}>
            <View style={styles.root_box}>
              <View>
                <Button />
              </View>
              <View style={{flexGrow:1,maxWidth:'100%',flexBasis:0}}>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontWeight:'bold',fontSize:18,color:'#000'}}>{this.state.present}% </Text>
                  <Text style={{fontWeight:'bold'}}>of 100</Text>
                </View>
              </View>
            </View>
              <View style={{paddingLeft: 6}}>
                <Progress persBar={this.state.persBar}/>
              </View>
          </View>

          <View style={styles.content} key={this.state.viewKey}>
            <View style={styles.ai_info}>
              <Text style={styles.ai_info_text}>준비 되었나요?</Text>
              <Text style={styles.ai_info_text}>기본 정보를 입력해주세요</Text>
            </View>
            <Image style={{width: Width, height: 250}}
              source={require('../public/whoareyou.png')}
            />
            <View style={{paddingLeft: 28}}>
              <TextInput
                style={styles.textInput}
                placeholderTextColor='gray'
                onChangeText={(text) => {this.setState({inputText: text})}}
                placeholder="이름"
              />
              <View style={styles.textInput_groupBox}>
                <DateTimePicker onChange={(date) => this.onDateChange(date)}/>
              </View>
                <SexDropdown sexChange={(sex) => this.onSexChange(sex)} />
            </View>
            <View style={{display: 'flex', width: Width, justifyContent: 'center', alignItems: 'center'}}>
              <Btn
                key={this.state.btnState}
                label="다음"
                onPress={() => this.onSubmitData()}
                //ef={ref => (this.btn = ref)}
                successIcon="check"
                style={styles.submitBtn}
              />
            </View>
          </View>

        </View>
      </ScrollView>
    } else {
      let resultData = this.state.resultData.localeCompare((val, key) => {
        return <Text>성공</Text>
      });
      return (
        <ScrollView style={styles.coinView}>
        <View style={styles.container}>
          <View style={{ padding: 16}}>
            <View style={styles.root_box}>
              <View>
                <Button />
              </View>
              <View style={{flexGrow:1,maxWidth:'100%',flexBasis:0}}>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontWeight:'bold',fontSize:18}}>{this.state.present}% </Text>
                  <Text style={{fontWeight:'bold'}}>of 100</Text>
                </View>
              </View>
            </View>
              <View style={{paddingLeft: 6}}>
                <Progress persBar={this.state.persBar}/>
              </View>
          </View>

          <View style={styles.content}>
            {(() => {
              switch(this.state.viewKey) {
                case 'defaultQ' :
                  return <DefaultQ onDefulatQChange={(data) => this.onQChange(data)}/>
              }
            })()}
          </View>

          <View style={{display: 'flex', width: Width, justifyContent: 'center', alignItems: 'center'}}>
            <Btn
              key={this.state.btnState}
              label="다음"
              onPress={() => this.onSubmitData()}
              //ef={ref => (this.btn = ref)}
              successIcon="check"
              style={styles.submitBtn}
            />
          </View>

        </View>
      </ScrollView>
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

const DateTimePicker = ({onChange}) => {
  const placeholder = "생년월일을 입력해주세요";

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
        <View style={styles.container}>
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
        </View>
  );
}

const Button = ({ onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={onPress}>
      <Icon name="arrow-back-outline" size={20} color="#999999"></Icon>
    </TouchableOpacity>
  );
}

const Progress = ({persBar}) => (
  <ProgressBar progress={persBar} color={Colors.blue300} style={{width:340,height:10}}/>
);

const DefaultQ = ({onDefulatQChange}) => {
  const onPressBtn = (value) => {
    onDefulatQChange(value);
  }

  return (
    <View style={{display: 'flex', width: Width, justifyContent: 'center', alignItems: 'center'}}>
      <View style={styles.ai_info}>
        <Text style={styles.ai_info_text}>어디를 다쳤는지</Text>
        <Text style={styles.ai_info_text}>알려주세요</Text>
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
        <TouchableHighlight 
          style={{flex: 2,}}
          Button onPress={() => onPressBtn('front')}  
          underlayColor={'#fff'}
          activeOpacity={0.5}
          >
          <CardView cardElevation={4}
              maxCardElevation={4}
              radius={10}>
            <View style={{height:200}}>
              <Image style={{width: 190, height: 200}}
                source={require('../public/body_front.png')}
                resizeMode="contain"
              />
            </View>
          </CardView>
        </TouchableHighlight>
        <TouchableHighlight 
          style={{flex: 2,}}
          Button onPress={() => onPressBtn('back')}  
          underlayColor={'#fff'}
          activeOpacity={0.5}
          >
           <CardView cardElevation={4}
              maxCardElevation={4}
              radius={10}>
            <View style={{height:200, backgroundColor:"#fff"}}>
              <Image style={{width: 190, height: 200}}
                source={require('../public/body_back.png')}
                resizeMode="contain"
              />
            </View>
          </CardView>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  coinView: {
    width: Width,
  },
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
  },
  content:{height:650},
  root_box: {
    width: 340,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems:'center'
  },
  button: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff"
  },
  ai_info: {
    width: Width,
    alignItems: 'center',
    paddingTop: 28,
    paddingBottom: 28,
  },
  ai_info_text: {
    fontWeight: 'bold',
    letterSpacing: -1,
    color: 'black',
    fontSize: 30,
    fontFamily: 'NotoSansKR-Bold',
  },
  ai_info_textBox: {
    textAlign: 'center',
    padding: 28,
  },
  textInput: {
    marginBottom: 10,
    paddingHorizontal: 10,
    width: 360,
    height: 40,
    borderRadius: 10,
    borderColor: '#000000',
    borderWidth: 1,
    color: '#000000'
  },
  textInput_groupBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  textInput_group: {
    marginRight: 28,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: 110,
    height: 40,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1
  },
  submitBtn: {
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    shadowColor: '#0080ff',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,  
    elevation: 24
}
});

export default AiScreen;