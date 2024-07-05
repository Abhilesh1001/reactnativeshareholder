import { View, Text,SafeAreaView,ScrollView,TextInput,Button } from 'react-native'
import React from 'react'
import { useRdCollectionView } from '../../hooks/rd/useRdCollectionView'
import Toast from 'react-native-toast-message'
import { styles,styles1 } from '../style'
import DateTimePickerModal from "react-native-modal-datetime-picker";



export default function RdCollectionView() {

  const {mutation,rdId, setRdId,showDatePicker,isDatePickerVisible,handleConfirm,hideDatePicker,collectin_date,handleLoanPerson} = useRdCollectionView() 


  return (
    <SafeAreaView>
      <ScrollView>

        <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
          <View>

            <View style={{ zIndex: 5000 }} >
              <Toast />
            </View>

            <Text>Enter Rd ID</Text>
            <TextInput
              style={styles.input}
              value={rdId}
              onChangeText={(text: any) => setRdId(text)}
              placeholder='Enter RD Id'
            />


            <View style={[styles1.datePicker, styles.textMargin]}>
              <Button title="Select Date" onPress={showDatePicker} />
            </View>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              style={{ marginTop: 20 }}
            />
            <Text style={[styles.labelText]}>Selected Date: {collectin_date.toDateString()}</Text>
            <View style={[styles1.datePicker, styles.textMargin]}>
              <Button title='Enter' color='green' onPress={handleLoanPerson} />
            </View>
          </View>

          {
            mutation?.data?.data?.map((item: any) => {
              return (
                <View>
                  <View key={item.rd_collection_id} style={{ backgroundColor: 'azure', width: '100%', height: 150, marginVertical: 5, borderRadius: 6, paddingHorizontal: 12, paddingVertical: 10 }} >
                    <Text style={{ fontSize: 16 }}>Customer ID : {item.person_id}</Text>
                    <Text style={{ fontSize: 16 }}>Collection ID : {item.rd_collection_id}</Text>
                    <Text style={{ fontSize: 16 }}>Customer Name : {item.person_name}</Text>
                    <Text style={{ fontSize: 16 }}>Amount collected :<Text style={{ fontWeight: 'bold' }}>{item.amount_collected}</Text> </Text>
                  </View>
                </View>

              )
            })
          }

        </View>

      </ScrollView>
    </SafeAreaView>
  )
}