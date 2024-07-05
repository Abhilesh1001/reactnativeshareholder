import { View, Text, Button, TextInput, ScrollView, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { styles1, styles } from '../style';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useLoanCollection } from '../../hooks/loan/useLoanColletion';
import Toast from 'react-native-toast-message';



export default function LoanCollectionView() {

    const { collectin_date, showDatePicker, isDatePickerVisible, handleConfirm, hideDatePicker, loanID, setLoanID, handleLoanPerson, mutation } = useLoanCollection()


    return (

        <SafeAreaView>
               <ScrollView>



            <View style={{ marginVertical: 10, marginHorizontal: 10 }}>


                <View>



                    <View style={{ zIndex: 5000 }} >
                        <Toast />
                    </View>

                    <Text>Enter Loan ID</Text>
                    <TextInput
                        style={styles.input}
                        value={loanID}
                        onChangeText={(text: any) => setLoanID(text)}
                        placeholder='Enter Loan Id'
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
                                    <View key={item.loan_collection_id} style={{ backgroundColor: 'azure', width: '100%', height: 150, marginVertical: 5, borderRadius: 6, paddingHorizontal: 12, paddingVertical: 10 }} >
                                        <Text style={{ fontSize: 16 }}>Customer ID : {item.person_id}</Text>
                                        <Text style={{ fontSize: 16 }}>Collection ID : {item.loan_collection_id}</Text>
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


