
export type StateProps = {
    counter : {
        authToken:null|{
            refresh :string,
            access :string 
        },
        user :string,
        userId:number | null
    }   
    
}