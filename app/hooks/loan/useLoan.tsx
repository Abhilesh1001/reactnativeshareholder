import { useSelector } from "react-redux";
import { baseurl } from "../../alldata/basedata";
import { StateProps } from "../../../type/user";
import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { format, parseISO } from 'date-fns'
import Toast from "react-native-toast-message";



interface datatype {
  loan_id: null | number,
  person_name: string,
  person_id: null | number,
  collection_date: string,
  amount_collected: null | number,
  remarks: string,
  usersf: null | number
}


export const useLoan = () => {
  const { authToken, userId } = useSelector((state: StateProps) => state.counter)
  const [data, setData] = useState<datatype>({ loan_id: null, person_name: '', person_id: null, collection_date: String(new Date()), amount_collected: null, remarks: '', usersf: null })
  const [collectin_date, setCollectiondate] = useState(new Date())


  const handleChangeDate = (date: any) => {
    setCollectiondate(date);
  };

  const mutation = useMutation({
    mutationFn: async (loanID) => {
      return await axios.get(`${baseurl}loan/loanamount/${loanID}`, {
        headers: {
          Authorization: `Bearer ${authToken?.access}`
        }
      })
    },
    onSuccess: (data) => {
      // console.log(data.data)
      setData((prev) => {
        return {
          ...prev,
          loan_id: data.data.loan_id,
          person_name: data.data.person_name,
          person_id: data.data.person_id
        }

      })
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: 'Enter correct LaonID',
        visibilityTime: 1000,
        position: 'top',
        topOffset: 10,

      });
    }

  })

  const [loanID, setLoanID] = useState();

  const handleLoanPerson = async () => {
    mutation.mutate(loanID)
  };

  const handleChange = (text: string) => {

    // Convert the input to a number
    const numericValue = text === '' ? null : parseFloat(text);

    if (text !== '' && isNaN(numericValue!)) {
      console.log('Invalid input: not a number');
      return;
    }

    setData({ ...data, amount_collected: numericValue });
  };





  const mutationLoan = useMutation<any, any, any, unknown>({
    mutationFn: async (newTodo: any) => {
      return await axios.post(`${baseurl}loan/loancollectionPer`, newTodo, {
        headers: {
          Authorization: `Bearer ${authToken?.access}`
        }
      })
    },
    onSuccess: () => {

      setData({ loan_id: null, person_name: '', person_id: null, collection_date: String(new Date()), amount_collected: null, remarks: '', usersf: null })
      Toast.show({
        type: 'success',
        text1: 'You are successfully added data',
        position: 'top',
        topOffset: 0,
        visibilityTime: 1000,
      });

    },
    onError: (error) => {
      // toast.error('Enter all required Fields',{position:'top-right'})
      Toast.show({
        type: 'error',
        text1: 'Please enter correct Loan ID',
        position: 'top',
        topOffset: 0,

      });
    }
  })




  const handleSubmitAmount = () => {
    const newData = {
      usersf: userId,
      loan_intrest: data.loan_id,
      amount_collected: data.amount_collected,
      remarks: data.remarks,
      collection_date: collectin_date
    }


    mutationLoan.mutate(newData)

  }



  // date picker 


  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    console.warn("A date has been picked: ", date);
    setCollectiondate(date)
    hideDatePicker();
  };




  return { loanID, setLoanID, handleLoanPerson, mutation, data, handleChange, setData, collectin_date, setCollectiondate, handleChangeDate, handleSubmitAmount ,showDatePicker,isDatePickerVisible,handleConfirm,hideDatePicker }
}