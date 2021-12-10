import React, { useState, useReducer } from "react";
import { Button, Table } from "react-bootstrap";
import { TransfertInternal } from "../transfert/TransfertInternal";
import { TransfertExternal } from "../transfert/TransfertExternal";

const accountsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DEFAULT':
            return action.payload;
        default:
            return state;
    }
}

const initAccount = {
    numAccount: 0,
    label: '',
    solde: 0,
    overdraftAllowed: 0,
    client: {}
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
                accounts.length && accounts.map( (account) => 
                    <tr key={ account.numAccount }>
                        <td>{ account.label }</td>
                        <td>{ account.solde }</td>
                        <td>{ account.overdraftAllowed }</td>
                        <td className="d-flex justify-content-between">
                            <Button variant="info" onClick={ () => handleInternalTransfert(account) }>Interne</Button>
                            <Button variant="warning">Externe</Button>
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
            accounts={ accounts }
            dispatchAccounts={ dispatchAccounts }
        />
        <TransfertExternal />
        </>
    );
}