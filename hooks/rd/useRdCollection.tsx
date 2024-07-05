import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { baseurl } from "../../app/alldata/basedata"
import axios from "axios"
import { useSelector } from "react-redux"
import { StateProps } from "../../type/user"
import Toast from "react-native-toast-message"

interface datatypeRD {
    Rd_id: null | number,
    person_name: string,
    person_id: null | number,
    collection_date: string,
    amount_collected: null | number,
    remarks: string,
    usersf: null | number
  }


export const useRdCollection=()=>{

    const {authToken,userId}=useSelector((state: StateProps) => state.counter)

    const [data,setData] = useState<datatypeRD>({Rd_id:null,person_id:null,person_name:'',collection_date:'',amount_collected:null,remarks:'',usersf:null})
    const [collectin_date,setCollectiondate] = useState(new Date())
    const [RdId, setRdID] = useState();

    const handleChangeDate = (date: any) => {
        setCollectiondate(date);
      };




      const mutation = useMutation({
        mutationFn: async (RdId) => {
          return await axios.get(`${baseurl}loan/rdintrest/${RdId}`, {
            headers: {
              Authorization: `Bearer ${authToken?.access}`
            }
          })
        },
        onSuccess: (data) => {
        //   console.log(data.data)
          setData((prev) => {
            return {
              ...prev,
              Rd_id: data.data.rd_id,
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
      


      const handleLoanPerson = async () => {
        mutation.mutate(RdId)
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






      
  const mutationRD = useMutation<any, any, any, unknown>({
    mutationFn: async (newTodo: any) => {
      return await axios.post(`${baseurl}loan/rdcollectionPer`, newTodo, {
        headers: {
          Authorization: `Bearer ${authToken?.access}`
        }
      })
    },
    onSuccess: () => {

      setData({ Rd_id: null, person_name: '', person_id: null, collection_date: String(new Date()), amount_collected: null, remarks: '', usersf: null })
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
      rd_interest: data.Rd_id,
      amount_collected: data.amount_collected,
      remarks: data.remarks,
      collection_date: collectin_date
    }
    console.log(newData)


    mutationRD.mutate(newData)

  }


    //   date picker 


    
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



      
    

    return {RdId, setRdID, handleLoanPerson, mutation, data, handleChange, setData, collectin_date, setCollectiondate, handleChangeDate, handleSubmitAmount ,showDatePicker,isDatePickerVisible,handleConfirm,hideDatePicker}
}