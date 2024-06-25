import { useSelector } from "react-redux";
import { baseurl } from "../../alldata/basedata";
import { StateProps } from "../../../type/user";
import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";



export const useLoan=()=>{
  const {authToken} = useSelector((state:StateProps)=>state.counter)
  const [data,setData] = useState({loan_id:null,person_name:'',person_id:null,collection_date:new Date(),amount_collected:null,remarks:'',usersf:null})

  const mutation = useMutation({
    mutationFn:async (loanID)=> {
        return await axios.get(`${baseurl}loan/loanamount/${loanID}`,{headers:{
            Authorization:`Bearer ${authToken?.access}`
        }})
    },
    onSuccess:(data)=>{
        console.log(data.data)
        setData((prev)=>{
            return {
                ...prev,
                loan_id:data.data.loan_id,
                person_name : data.data.person_name,
                person_id: data.data.person_id
            }

        })
    }

  })
 
  const [loanID, setLoanID] = useState();

const handleLoanPerson = async  () => {
    mutation.mutate(loanID)
  };

  const onChange =(text:any)=>{
    console.log(text)

  }


    return {loanID,setLoanID,handleLoanPerson,mutation,data,onChange,setData}
}