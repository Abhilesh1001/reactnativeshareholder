import { View, Text, StyleSheet, TextInput, Button, Platform } from 'react-native'
import React, { useState } from 'react'

import { styles, toastConfig, styles1 } from '../style'

import { useLoan } from '../hooks/loan/useLoan'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Toast from 'react-native-toast-message';




export default function LoanCollection() {

  const { loanID, handleChange, setLoanID, handleLoanPerson, data, collectin_date, handleSubmitAmount, showDatePicker, isDatePickerVisible, handleConfirm, hideDatePicker } = useLoan()


  return (
    <View style={{ padding: 10 }}>
      <View style={{ zIndex: 5000 }} >
        <Toast />
      </View>

      <Text style={{ marginTop: 5 }}>Enter Loan ID</Text>
      <TextInput
        style={styles.input}
        value={loanID}
        onChangeText={(text: any) => setLoanID(text)}
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
            <Text style={styles.labelText}>Selected Date: {collectin_date.toDateString()}</Text>

            <View style={styles1.datePicker}>
              <Button title="Show Date Picker" onPress={showDatePicker} />
            </View>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <Text style={{ display: 'flex', marginTop: 10, flexDirection: 'row', marginBottom: 10 }} >Enter Amount Collected</Text>
            <TextInput
              style={styles.input}
              value={data.amount_collected !== null ? String(data.amount_collected) : ''}
              onChangeText={handleChange}
              placeholder='Enter Amount Collected'
              keyboardType='numeric'
            />

          </>
        )}

        <View style={{ display: 'flex', marginTop: 10, flexDirection: 'row', marginBottom: 10 }} >
          <Button title="Submit" onPress={handleSubmitAmount} />
        </View>

      </View>
    </View>






  )
}




