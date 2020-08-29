import React, { useState } from "react";
import { Button, Form, Label, Input } from "reactstrap";
import { useAuth } from "../../hooks/useAuth";
import "./Login.css";

function Login() {
    const { login, isLoading, error } = useAuth();

    const [state, setState] = useState({});

    const handleSubmit = async event => {
        event.preventDefault();
        await login(state.email, state.password);
    };

    const handleChange = event => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    return (
        <div className="form-container" onSubmit={handleSubmit}>
            <Form className="form-signin">
                <h1 className="h3 mb-3 font-weight-normal">Please log in</h1>
                <Label for="inputEmail" className="sr-only">
                    Email address
                </Label>
                <Input
                    type="email"
                    name="email"
                    id="inputEmail"
                    placeholder="Email address"
                    required
                    autoComplete="off"
                    onChange={handleChange}
                />
                <Label for="inputPassword" className="sr-only">
                    Password
                </Label>
                <Input
                    type="password"
                    name="password"
                    id="inputPassword"
                    placeholder="Password"
                    required
                    onChange={handleChange}
                />
                {!!error && <p className="text-danger">{error.message}</p>}
                <Button
                    color="primary"
                    block
                    size="lg"
                    type="submit"
                    disabled={isLoading}
                >
                    Log in
                </Button>
            </Form>
        </div>
    );
}

export default Login;
