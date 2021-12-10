import React from "react";
import { Table } from "react-bootstrap";

export const Accounts = ( { accounts } ) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Intitulé de compte</th>
                    <th>Solde</th>
                    <th>Découvert autorisé</th>
                </tr>
            </thead>
            <tbody>
            {
                accounts.length && accounts.map( (account) => 
                    <tr key={account.numAccount}>
                        <td>{account.label}</td>
                        <td>{account.solde}</td>
                        <td>{account.overdraftAllowed}</td>
                    </tr>
                )
            }
            </tbody>
        
        
        </Table>
    );
}