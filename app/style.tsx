import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Toast from 'react-native-toast-message';
import { ToastConfigParams } from 'react-native-toast-message';

interface ToastProps extends ToastConfigParams<any> {
  text1?: string; // text1 can be undefined
  props: {
    uuid: string;
  };
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    padding: 10,
    marginTop: 20,
  },
  labelText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  input: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  inputWithlabel: {
    marginBottom: 10,
    marginTop: 5,
  },
});

export const toastConfig = {
  warning: ({ text1, props }: ToastProps) => (
    <View style={toastStyles.warning}>
      <Text style={toastStyles.text}>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
  success: ({ text1, props }: ToastProps) => (
    <View style={toastStyles.success}>
      <Text style={toastStyles.text}>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
  error: ({ text1, props }: ToastProps) => {
    console.log(text1);
    return (
      <View style={toastStyles.error}>
        <Text style={toastStyles.text}>{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    );
  },
};

const toastStyles = StyleSheet.create({
  warning: {
    width: '100%',
    backgroundColor: 'orange',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    zIndex: 5000,
    elevation: 10, // For Android
  },
  success: {
    width: '100%',
    backgroundColor: 'green',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    zIndex: 5000,
    elevation: 10, // For Android
  },
  error: {
    width: '90%',
    backgroundColor: 'red',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    position: 'absolute',
    top: 0,
    zIndex: 9999,
    elevation: 10, // For Android
  },
  text: {
    paddingLeft: 4,
    fontSize: 15,
    color: 'white',
  },
});

export { styles };
