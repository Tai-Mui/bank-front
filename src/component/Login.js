import React, { useState, useReducer, useRef } from "react";
import { Form, Row, Col, Button, Alert } from 'react-bootstrap';
import ClientService from "../service/ClientService";

const initialState = {
    email: '',
    password: '',
    success: false,
    errMsg: ''
}

const authReducer = (state, action) => {
    switch (action.type) {
        case 'SET_EMAIL':
            return {...state, email: action.payload};
        case 'SET_PASSWORD':
            return {...state, password: action.payload};
        case 'SET_SUCCESS':
            return {...state, success: action.payload};
        case 'SET_ERRMSG':
            return {...state, errMsg: action.payload};
        case 'SET_DEFAULT':
            return initialState;
        default:
            return state;
    }
}

export const Login = ({ setClient }) => {
    
    const [ auth, dispatchAuth ] = useReducer(authReducer, initialState);
    const [ validated, setValidated ] = useState(false);
    const innerRef = useRef();

    const handleChangeEmail = event => dispatchAuth({type: 'SET_EMAIL', payload: event.target.value});

    const handleChangePassword = event => dispatchAuth({type: 'SET_PASSWORD', payload: event.target.value});

    const handleSubmit = event => {
        event.preventDefault();
        setValidated(true);
        if (auth.email.length && auth.password.length) {
            ClientService.loginClient(auth.email, auth.password)
                .then( res => {
                    setClient(res.data);
                    dispatchAuth({type: 'SET_DEFAULT'});
                    setValidated(false);
                })
                .catch(err => dispatchAuth({type: 'SET_ERRMSG', payload: "Echec de connexion: EMAIL et/ou PASSWORD incorrect(s)"}));
        }
    }

    return (
        <>
        <Form noValidate validated={ validated } onSubmit={ handleSubmit }>
            <Form.Group as={Row} className="mb-3" controlId="validationCustom01">
                <Form.Label column sm="2">Email</Form.Label>
                <Col sm="10">
                    <Form.Control 
                        type="text" 
                        value={ auth.email } 
                        onChange={ handleChangeEmail } 
                        ref={ innerRef } 
                        maxLength="60" 
                        required
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="validationCustom02">
                <Form.Label column sm="2">Password</Form.Label>
                <Col sm="10">
                    <Form.Control 
                        type="text" 
                        value={ auth.password } 
                        onChange={ handleChangePassword }  
                        maxLength="50" 
                        required
                    />
                </Col>
            </Form.Group>
            <Button type="submit" variant="primary">Connect</Button>
        </Form>
        { (auth.errMsg !== '') && <Alert variant={ 'danger' }>{ auth.errMsg }</Alert> }
        </>
    );
}