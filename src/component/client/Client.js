import React from "react";
import { Accounts } from "../account/Accounts";

export const Client = ( { client } ) => {
    console.log(JSON.stringify(client));

    return (
        <>
        <h2>{ client?.name }</h2>
        {client?.accounts && <Accounts accounts={ client?.accounts } />}
        </>
    );
}