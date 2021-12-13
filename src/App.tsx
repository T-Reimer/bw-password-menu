import React, { useState } from "react";
import "./App.scss";
import AuthenticateUser from "./AuthenticateUser";
import PasswordList from "./PasswordList";

/**
 * *1
 * Master Password Prompt
 *
 * *2
 * Show search at the top
 * Show the list of passwords
 *
 */

function App() {
    const [password, setPassword] = useState("");

    /**
     * Check if the password supplied unlocks the bitwarden vault
     * @param value
     */
    const authenticate = async (value: string) => {
        // check if the bw vault unlocks from the supplied password
        // save the password to state to unlock show the list of passwords
    };

    return (
        <div className="App">
            {password ? (
                <PasswordList password={password} />
            ) : (
                <AuthenticateUser />
            )}
        </div>
    );
}

export default App;
