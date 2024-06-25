import { View, Text,StyleSheet,TextInput,Button, Platform } from 'react-native'
import React, { useState } from 'react'

import { styles } from '../style'

import { useLoan } from '../hooks/loan/useLoan'
import DateTimePicker from '@react-native-community/datetimepicker';



export default function LoanCollection() {
  
  const {loanID,setLoanID,handleLoanPerson,data,setData}=useLoan()
  const [showDatePicker, setShowDatePicker] = useState(false);


const onChange = (event:any, selectedDate:any) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(Platform.OS === 'ios');
    setData({...data,collection_date:currentDate});
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };


  return (
    <View style={{ padding: 10 }}>
    <Text style={{ marginTop: 5 }}>Person ID</Text>
    <TextInput
      style={styles.input}
      value={loanID}
      onChangeText={(text:any) => setLoanID(text)}
      placeholder='Write Person ID'
    />
    <View style={{ marginTop: 10 }}>
      <Button title='Enter' color='green' onPress={handleLoanPerson} />
      {data && (
        <>
          <View style={{ display: 'flex', marginTop: 10, flexDirection: 'row' }}>
            <Text>Loan Id : </Text>
            <Text>{data.loan_id}</Text>
          </View>
          <View style={{ display: 'flex', marginTop: 10, flexDirection: 'row' }}>
            <Text>Name : </Text>
            <Text>{data.person_name}</Text>
          </View>
          <View style={{ display: 'flex', marginTop: 10, flexDirection: 'row' }}>
            <Text>Person ID : </Text>
            <Text>{data.person_id}</Text>
          </View>
          <Text style={styles.labelText}>Selected Date: {data.collection_date.toDateString()}</Text>
          <Button title="Show Date Picker" onPress={showDatepicker} />
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={data.collection_date}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}
        </>
      )}
    </View>
  </View>




     
   
  )
}


