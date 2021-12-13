import Card from "react-bootstrap/Card";
import React, { useState } from "react";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import runCommand from "./cli/runCommand";

/**
 * Show the user authentication menu
 * @param props
 * @returns
 */
export default function AuthenticateUser(
    props: React.PropsWithoutRef<{ onAuth: (token: string) => void }>
) {
    const { onAuth } = props;

    // the busy state... check if we are waiting from something
    const [busy, setBusy] = useState(false);

    const [password, setPassword] = useState("");
    const [inputType, setInputType] = useState("password");

    const [error, setError] = useState<null | Error>(null);

    const checkPassword = async () => {
        setError(null);
        setBusy(true);

        try {
            // check if the password supplied gives us a valid password
            const token = await runCommand(["unlock", password]);

            // clear the authenticated password
            setPassword("");
            onAuth(token);
        } catch (err) {
            // show the error to the user
            setError(err as Error);
            setBusy(false);
        }
    };

    return (
        <Card>
            {error ? (
                <div className="border border-danger">
                    <h5>{error.name}</h5>
                    <small>{error.message}</small>
                </div>
            ) : null}

            {/* show the form input */}
            <InputGroup>
                <FormControl
                    value={password}
                    type={inputType}
                    onChange={event => setPassword(event.target.value)}
                    onKeyPress={event => {
                        if (event.key === "Enter") {
                            // check the password
                            checkPassword();
                        }
                    }}
                    disabled={busy}
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
