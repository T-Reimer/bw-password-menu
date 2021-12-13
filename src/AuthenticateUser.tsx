import Card from "react-bootstrap/Card";
import React, { useState } from "react";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

/**
 * Show the user authentication menu
 * @returns
 */
export default function AuthenticateUser() {
    const [password, setPassword] = useState("");
    const [inputType, setInputType] = useState("password");

    return (
        <Card>
            <InputGroup>
                <FormControl
                    value={password}
                    type={inputType}
                    onChange={event => setPassword(event.target.value)}
                    onKeyPress={event => console.log(event)}
                />
                <Button
                    variant="outline-secondary"
                    onClick={() =>
                        setInputType(
                            inputType === "password" ? "text" : "password"
                        )
                    }
                >
                    Show
                </Button>
            </InputGroup>
        </Card>
    );
}
