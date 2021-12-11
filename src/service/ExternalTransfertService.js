import axios from "axios";

const ExternalTransfertService = {

    credit: (account, amount) =>
        axios.post(
            process.env.REACT_APP_API_URL + "transfert/" + account.numAccount, 
            amount,
            {headers: { "Content-type": "application/json" }}
        )
}

export default ExternalTransfertService;