import React, { useState, useReducer, useEffect, useRef } from "react";
import { Modal, Form, Row, Col, Button, Alert } from "react-bootstrap";
import AccountService from '../../service/AccountService';
import ExternalTransfertService from '../../service/ExternalTransfertService';

const initTransfert = {
    fromAccount: null,
    toAccount: null,
    amount: 0
}

const transfertReducer = (state, action) => {
    switch (action.type) {
        case 'SET_FROM_ACCOUNT':
            return {...state, fromAccount: action.payload};
        case 'SET_TO_ACCOUNT':
            return {...state, toAccount: action.payload};
        case 'SET_AMOUNT':
            return {...state, amount: action.payload};
        case 'RESET':
            return {...state, toAccount: null, amount: 0};
        default:
            return state;
    }
}

export const TransfertExternal = (props) => {

    const { showExternalTransfert, setShowExternalTransfert, selectedAccount, dispatchAccounts } = props;
    const [ transfert, dispatchTransfert ] = useReducer(transfertReducer, initTransfert);
    const [ message, setMessage ] = useState('');
    const [ validated, setValidated ] = useState(false);
    const innerRef = useRef();

    const handleChangeToAccount = event => 
        dispatchTransfert({type: "SET_TO_ACCOUNT", payload: {numAccount: event.target.value}});

    const handleChangeAmount = event => 
        dispatchTransfert({type: "SET_AMOUNT", payload: event.target.value});

    const handleClose = event => {
        setShowExternalTransfert(false);
        setMessage('');
        setValidated(false);
        dispatchTransfert({type: "RESET"});
    }

    const handleSubmit = event => {
        event.preventDefault();
        setValidated(true);
        if ((transfert.fromAccount?.numAccount > 0) 
                && (transfert.toAccount?.numAccount > 0) 
                && (transfert.amount > 0)) {
            ExternalTransfertService.credit(transfert.toAccount, transfert.amount)
                .then(() => {
                    return AccountService.withdraw(transfert.fromAccount, transfert.amount);
                })
                .then(() => {
                    transfert.fromAccount.solde = parseFloat(transfert.fromAccount.solde) - parseFloat(transfert.amount);
                    dispatchAccounts({type: "UPT_ACCOUNT", payload: parseFloat(transfert.fromAccount).toFixed(2)});
                    setMessage("Succès: transfert réussi");
                    setTimeout(() => handleClose(), 1000);
                })
                .catch(err => {
                    if (err.response.status === 400) {
                        setMessage("Echec du transfert: vérifiez le montant à débiter");
                    } else if (err.response.status === 404) {
                        setMessage("Echec du transfert: numéro de compte inexistant");
                    } else {
                        setMessage("Echec du transfert: une erreur est survenue");
                    }
                })
        }
    }

    useEffect(() => {
        dispatchTransfert({type: "SET_FROM_ACCOUNT", payload: selectedAccount});
    }, [selectedAccount]);

    return (
        <Modal
        show={ showExternalTransfert } 
        backdrop="static" 
        onHide={ handleClose }
        centered
        onShow={() => {innerRef.current.focus()}}
        animation={ false }
        >
        <Modal.Header closeButton>
            <Modal.Title>Virement externe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form noValidate validated={ validated } onSubmit={ handleSubmit }>
            <Form.Group as={Row} className="mb-3" controlId="validationCustom01">
                <Form.Label column sm="4">Compte à débiter</Form.Label>
                <Col sm="8">
                <Form.Control type="text" value={ selectedAccount?.label } readOnly />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="validationCustom02">
                <Form.Label column sm="4">Compte à créditer</Form.Label>
                <Col sm="8">
                    <Form.Control type="text" value={ transfert?.toAccount?.numAccount } onChange={ handleChangeToAccount } required />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="validationCustom03">
                <Form.Label column sm="4">Montant</Form.Label>
                <Col sm="8">
                <Form.Control type="number" defaultValue={''} onChange={ handleChangeAmount } ref={ innerRef } required />
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