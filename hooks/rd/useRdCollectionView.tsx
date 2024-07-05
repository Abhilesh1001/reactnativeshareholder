import { useSelector } from "react-redux";
import { StateProps } from "../../type/user";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { baseurl } from "../../app/alldata/basedata";
import axios from "axios";
import Toast from "react-native-toast-message";


export const useRdCollectionView=()=>{

    const { authToken, userId } = useSelector((state: StateProps) => state.counter)
    
    const [collectin_date, setCollectiondate] = useState(new Date())

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const [rdId, setRdId] = useState();


    const handleLoanPerson = async () => {
       
        const formattedDate = collectin_date instanceof Date ? collectin_date.toISOString().split('T')[0] : collectin_date;
      
        const data = {
          "collection_date": formattedDate
        };
      
        mutation.mutate(data);
      };

      const mutation = useMutation<any, any, any, any>({
        mutationFn: async (data) => {
          try {
            return await axios.post(`${baseurl}loan/rdCollectionViewDate/${rdId}`, data, {
              headers: {
                Authorization: `Bearer ${authToken?.access}`
              }
            });
          } catch (error) {
            console.error('Request error:', error);
            throw error;
          }
        },
        onSuccess: (data) => {
        //   console.log(data.data);
        },
        onError: (error) => {
          console.error('Error response:', error.response);
          Toast.show({
            type: 'error',
            text1: 'Enter correct LoanID',
            visibilityTime: 1000,
            position: 'top',
            topOffset: 10,
          });
        }
      });



    // date picker /

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: any) => {

        setCollectiondate(date)
        hideDatePicker();
    };






    return {mutation,rdId, setRdId,showDatePicker,isDatePickerVisible,handleConfirm,hideDatePicker,collectin_date,handleLoanPerson}
}