import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Accounts } from "../account/Accounts";

export const Client = ( { client, logout } ) => {
    console.log(JSON.stringify(client));

    return (
        <>
        <Row>
            <Col>
                <h2>{ client?.name } ( { client?.email } )</h2>
            </Col>
            <Col className="d-flex justify-content-end">
                <Button variant="primary" onClick={ logout } className="mb-3">
                    Déconnexion
                </Button>
            </Col>
        </Row>
        {client?.accounts && <Accounts accounts={ client?.accounts } />}
        </>
    );
}