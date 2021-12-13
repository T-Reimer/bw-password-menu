import { useEffect, useState } from "react";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import getPasswordList, { PasswordData } from "./cli/getPasswordList";
import ListGroup from "react-bootstrap/ListGroup";

export default function PasswordList(
    props: React.PropsWithoutRef<{ token: string }>
) {
    const { token } = props;

    const [search, setSearch] = useState("");
    const [list, setList] = useState<PasswordData[]>([]);

    const [error, setError] = useState<null | Error>(null);

    useEffect(() => {
        let mounted = true;

        getPasswordList(token, search)
            .then(list => {
                if (mounted) {
                    console.log(list);
                    setList(list);
                }
            })
            .catch(err => {
                console.error(err);
                setError(err);
            });

        return () => {
            mounted = false;
        };
    }, [token, search]);

    return (
        <div>
            <div className="sticky-top p-1 bg-default">
                <InputGroup>
                    <FormControl
                        value={search}
                        onChange={event => setSearch(event.target.value)}
                        placeholder="Search"
                    />
                </InputGroup>
            </div>

            {/* list the passwords */}
            <ListGroup variant="flush">
                {list.map(item => {
                    return (
                        <ListGroup.Item
                            key={item.id}
                            className="p-1 text-start bg-transparent text-light"
                        >
                            <div className="text-truncate">
                                <h6>{item.name}</h6>
                            </div>

                            {item.login ? (
                                <small className="text-muted">
                                    {item.login.username}
                                </small>
                            ) : null}
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
        </div>
    );
}
