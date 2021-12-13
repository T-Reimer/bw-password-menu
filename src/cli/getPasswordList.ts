import runCommand from "./runCommand";

export interface PasswordData {
    collectionIds: [];
    favorite: boolean;
    folderId: string;
    id: string;
    name: string;
    notes: string | null;
    object: string;
    organizationId: string | null;
    reprompt: 0 | 1;
    revisionDate: string;
    secureNote: { type: 0 | 1 };
    type: number;

    login?: {
        password: string;
        passwordRevisionDate: string;
        totp: null;
        uris: { match: null, uri: string }[],
        username: string;
    }
}

export default async function getPasswordList(token: string, search: string): Promise<PasswordData[]> {

    const result = await runCommand(["list", "items", "--search", search], token);

    const data = JSON.parse(result);
    return data;
}