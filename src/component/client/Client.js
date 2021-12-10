import React from "react";

export const Client = ( client ) => {
    console.log(JSON.stringify(client));

    return (
        <h2>{ client?.name }</h2>
    );
}