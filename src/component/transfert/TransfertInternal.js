import React, { useState, useReducer, useRef } from "react";
import { Modal, Form, Row, Col, Button, Alert } from "react-bootstrap";

const transfertReducer = (state, action) => {
    switch (action.type) {
        case 'SET_FROM_ACCOUNT':
            return action.payload;
        case 'SET_TO_ACCOUNT':
            return action.payload;
        case 'SET_AMOUNT':
            return action.payload;
        default:
            return state;
    }
}

const initTransfert = {
    fromAccount: null,
    toAccount: null,
    amount: 0
}

export const TransfertInternal = (props) => {

    const { showInternalTransfert, setShowInternalTransfert, selectedAccount, accounts, dispatchAccounts } = props;
    const [ transfert, dispatchTransfert ] = useReducer(transfertReducer, initTransfert);
    const [ message, setMessage ] = useState('');
    const [ validated, setValidated ] = useState(false);
    const innerRef = useRef();

    const handleChangeAmount = event => dispatchTransfert({type: "SET_AMOUNT", payload: event.target.value});

    const handleClose = event => {
        setShowInternalTransfert(false);
        setMessage('');
        setValidated(false);
    }

    const handleSubmit = event => {
        event.preventDefault();
        setValidated(true);
        
    }

    return (
        <Modal
        show={ showInternalTransfert } 
        backdrop="static" 
        onHide={ handleClose }
        centered
        onShow={() => {innerRef.current.focus()}}
        animation={ false }
        >
        <Modal.Header closeButton>
            <Modal.Title>Virement interne</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form noValidate validated={ validated } onSubmit={ handleSubmit }>
            <Form.Group as={Row} className="mb-3" controlId="validationCustom01">
                <Form.Label column sm="5">Compte à débiter</Form.Label>
                <Col sm="7">
                <Form.Control type="text" value={ selectedAccount?.label } readOnly />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="validationCustom01">
                <Form.Label column sm="5">Compte à créditer</Form.Label>
                <Col sm="7">
                    <Form.Select>
                    {
                        accounts
                            .filter(account => account.numAccount !== selectedAccount.numAccount)
                            .map( account => 
                            <option value={ account.numAccount }>{ account.label }</option>
                        )
                    }
                    </Form.Select>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="validationCustom01">
                <Form.Label column sm="5">Montant</Form.Label>
                <Col sm="7">
                <Form.Control type="text" defaultValue={''} onChange={ handleChangeAmount } ref={ innerRef } />
                </Col>
            </Form.Group>
            <Form.Group className="d-flex justify-content-end">
                <Button type="submit" variant="primary">
                Enregistrer
                </Button>
            </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            {message && <Alert variant={ message.includes("Succès") ? "success" : "danger" }>{ message }</Alert>}
        </Modal.Footer>
        </Modal>
    );
}