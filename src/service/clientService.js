import axios from "axios";

const ClientService = {

    getClient: (id) => axios.get(process.env.REACT_APP_API_URL + 'client/' + id),

    loginClient: (email, password) => axios.post(process.env.REACT_APP_API_URL + 'client/login',
        { email: email, password: password }
    ),
}

export default ClientService;