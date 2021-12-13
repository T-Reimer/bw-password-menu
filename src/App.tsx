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
    const [token, setToken] = useState("");

    return (
        <div className="App">
            {token ? (
                <PasswordList token={token} />
            ) : (
                <AuthenticateUser onAuth={token => setToken(token)} />
            )}
        </div>
    );
}

export default App;
