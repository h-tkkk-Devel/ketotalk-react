import React, {useState} from 'react'
import { View, StyleSheet } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';

export default function PickerScreen({sexChange, sex}) {
	const [text, setText] = useState("");
    const placeholder = '성별';
    
    const onChangeText = (value) => {
        //console.warn(value)
        setText(value);
        sexChange(value);
    } 
    
    return (
    <RNPickerSelect
        textInputProps={{ underlineColorAndroid: 'transparent'}}
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
        fontSize: 16,
        height: 40, 
        width: 360, 
        color: '#000000',
        borderColor: '#000000', 
        borderWidth: 1, 
        borderRadius: 12,
        padding: 10
    },
});