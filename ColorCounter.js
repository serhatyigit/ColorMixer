import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ColorCounter = ({
  colorValue,
  onColorValueChange,
  color,
  onIncrease,
  onDecrease,
}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.colorContainer}>
        <Text style={[styles.colorTextStyle, { color }]}>{color}</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          onChangeText={(value) => {
            onColorValueChange(colorCalc(value.replace(/[^0-9]/g, '')));
          }}
          value={colorCalc(colorValue).toString()}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.upButton}>
            <FontAwesome.Button
              name="angle-up"
              backgroundColor={color}
              onPress={onIncrease}
            ></FontAwesome.Button>
          </View>
          <View style={styles.downButton}>
            <FontAwesome.Button
              name="angle-down"
              backgroundColor={color}
              onPress={onDecrease}
            ></FontAwesome.Button>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

// Updates value if it is '' or NaN
const colorCalc = (value) => {
  return value === undefined || isNaN(value) ? 0 : parseInt(value);
};

const styles = StyleSheet.create({
  colorContainer: {
    flexDirection: 'row',
    padding: 15,
  },
  buttonContainer: {
    left: 20,
    flexDirection: 'row',
  },
  upButton: {},
  downButton: {
    marginHorizontal: 10,
  },
  colorTextStyle: {
    fontSize: 25,
  },
  input: {
    width: 50,
    height: 40,
    marginHorizontal: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});

export default ColorCounter;
