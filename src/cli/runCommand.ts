import { invoke } from "@tauri-apps/api"

/**
 * Run the bitwarden client command to get the results
 * 
 * @param args the list of args to add to the command
 * @returns 
 */
export default async function runCommand(args: string[], token?: string): Promise<string> {

    // add the auth token value to the command
    if (token) {
        args.push("--session", token);
    }

    // add the raw flag if not included already
    if (!args.includes("--raw")) {
        args.push("--raw");
    }

    try {
        // run the command in rust
        const result = await invoke<{ stdout: string, stderr: string }>("run_cli_command", { commandArgs: args });

        // check if stderr is empty
        if (result.stderr) {
            throw new Error(result.stderr);
        }

        // return the text result
        return result.stdout;
    } catch (err) {

        if (typeof err === "string") {
            throw new Error(err);
        }

        if (err instanceof Error) {
            throw err;
        }
        throw new Error("Unknown Error.");
    }
}