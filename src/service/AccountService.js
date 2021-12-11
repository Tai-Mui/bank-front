import axios from "axios";

const AccountService = {

    credit: (account, amount) =>
        axios.post(
            process.env.REACT_APP_API_URL + "account/credit/" + account.numAccount, 
            amount,
            {headers: { "Content-type": "application/json" }}
        ),

    withdraw: (account, amount) =>
        axios.post(
            process.env.REACT_APP_API_URL + "account/withdraw/" + account.numAccount, 
            amount,
            {headers: { "Content-type": "application/json" }}
        )
    
}

export default AccountService;