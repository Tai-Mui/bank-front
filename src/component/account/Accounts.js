import React, { useState, useReducer, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { TransfertInternal } from "../transfert/TransfertInternal";
import { TransfertExternal } from "../transfert/TransfertExternal";

const initAccount = {
    numAccount: 0,
    label: '',
    solde: 0,
    overdraftAllowed: 0,
    client: {}
}

const accountsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ACCOUNTS':
            return action.payload;
        case 'UPT_ACCOUNT':
            return state.map(account =>
                (account.numAccount === action.payload.numAccount) ? action.payload : account
            );
        default:
            return state;
    }
}

export const Accounts = ( { accounts } ) => {

    const [ accountList, dispatchAccounts ] = useReducer(accountsReducer, (accounts ? accounts : []));
    const [ showInternalTransfert, setShowInternalTransfert ] = useState(false);
    const [ showExternalTransfert, setShowExternalTransfert ] = useState(false);
    const [ selectedAccount, setSelectedAccount ] = useState(initAccount);

    const handleInternalTransfert = (account) => {
        setShowInternalTransfert(true);
        setSelectedAccount(account);
    }

    const handleExternalTransfert = (account) => {
        setShowExternalTransfert(true);
        setSelectedAccount(account);
    }

    useEffect(() => {
        dispatchAccounts({type: "SET_ACCOUNTS", payload: accounts})
    }, [accounts]);

    return (
        <>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Intitulé de compte</th>
                    <th>Solde</th>
                    <th>Découvert autorisé</th>
                    <th>Virement</th>
                </tr>
            </thead>
            <tbody>
            {
                accountList && accounts.map( (account) => 
                    <tr key={ account.numAccount }>
                        <td>{ account.label }</td>
                        <td className="text-end">
                            <span className={ (account.solde < 0) ? "text-danger" : "" }>
                                { parseFloat(account.solde).toFixed(2) }
                            </span>
                        </td>
                        <td className="text-center">{ account.overdraftAllowed }</td>
                        <td className="d-flex justify-content-evenly">
                        {accounts.length > 1 && 
                            <Button variant="info" onClick={ () => handleInternalTransfert(account) }>
                                Interne
                            </Button>
                        }
                            <Button variant="warning" onClick={ () => handleExternalTransfert(account) }>
                                Externe
                            </Button>
                        </td>
                    </tr>
                )
            }
            </tbody>
        </Table>

        <TransfertInternal
            showInternalTransfert={ showInternalTransfert }
            setShowInternalTransfert={ setShowInternalTransfert }
            selectedAccount={ selectedAccount }
            accounts={ accountList }
            dispatchAccounts={ dispatchAccounts }
        />

        <TransfertExternal 
            showExternalTransfert={ showExternalTransfert }
            setShowExternalTransfert={ setShowExternalTransfert }
            selectedAccount={ selectedAccount }
            dispatchAccounts={ dispatchAccounts }
        />
        </>
    );
}