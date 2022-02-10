import React, { useReducer } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ColorCounter from './ColorCounter';
import { FontAwesome } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

const COLOR_INCREMENT = 15;

const colorCalc = (value) => {
  return value === undefined || isNaN(value) ? 0 : parseInt(value);
};

const reducer = (state, action) => {
  // state === {red:number,green:number,blue:number}
  // action ==== {type: "change_red" || "change_green" || "change_blue", payload: 15 || -15 }

  switch (action.type) {
    case 'change_red':
      return state.red + action.payload > 255 || state.red + action.payload < 0
        ? state
        : { ...state, red: state.red + action.payload };
    case 'set_red':
      return action.payload > 255 || action.payload < 0
        ? state
        : { ...state, red: colorCalc(action.payload) };
    case 'change_green':
      return state.green + action.payload > 255 ||
        state.green + action.payload < 0
        ? state
        : { ...state, green: state.green + action.payload };
    case 'set_green':
      return action.payload > 255 || action.payload < 0
        ? state
        : { ...state, green: colorCalc(action.payload) };
    case 'change_blue':
      return (state.blue + action.payload > 255) |
        (state.blue + action.payload < 0)
        ? state
        : { ...state, blue: state.blue + action.payload };
    case 'set_blue':
      return action.payload > 255 || action.payload < 0
        ? state
        : { ...state, blue: colorCalc(action.payload) };
    default:
      return state;
  }
};

const copyToClipboard = (value) => {
  Clipboard.setString(value);
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, { red: 0, green: 0, blue: 0 });
  const { red, green, blue } = state;

  return (
    <View style={styles.container}>
      <ColorCounter
        colorValue={red}
        onColorValueChange={(colorValue) => {
          dispatch({ type: 'set_red', payload: colorValue });
        }}
        onIncrease={() => {
          dispatch({ type: 'change_red', payload: COLOR_INCREMENT });
        }}
        onDecrease={() => {
          dispatch({ type: 'change_red', payload: -1 * COLOR_INCREMENT });
        }}
        color="red"
      />
      <ColorCounter
        colorValue={green}
        onColorValueChange={(colorValue) => {
          dispatch({ type: 'set_green', payload: colorValue });
        }}
        onIncrease={() => {
          dispatch({ type: 'change_green', payload: COLOR_INCREMENT });
        }}
        onDecrease={() => {
          dispatch({
            type: 'change_green',
            payload: -1 * COLOR_INCREMENT,
          });
        }}
        color="green"
      />
      <ColorCounter
        colorValue={blue}
        onColorValueChange={(colorValue) => {
          dispatch({ type: 'set_blue', payload: colorValue });
        }}
        onIncrease={() => {
          dispatch({ type: 'change_blue', payload: COLOR_INCREMENT });
        }}
        onDecrease={() => {
          dispatch({ type: 'change_blue', payload: -1 * COLOR_INCREMENT });
        }}
        color="blue"
      />
      <View
        style={[
          styles.colorView,
          { backgroundColor: `rgb(${red},${green},${blue})` },
        ]}
      ></View>
      <View style={styles.resultView}>
        <Text style={styles.resultText}>{`rgb(${red},${green},${blue})`}</Text>
      </View>
      <View style={styles.copyButton}>
        <FontAwesome.Button
          name="copy"
          backgroundColor={'black'}
          onPress={() => copyToClipboard(`rgb(${red},${green},${blue})`)}
        ></FontAwesome.Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    top: 50,
  },
  colorView: {
    top: 50,
    width: 150,
    height: 150,
    borderRadius: 30,
    justifyContent: 'center',
  },
  resultView: {
    marginTop: 90,
    flexDirection: 'row',
  },
  resultText: {
    fontSize: 25,
  },
  copyButton: {
    marginTop: 20,
  },
});
