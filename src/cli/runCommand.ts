import { invoke } from "@tauri-apps/api"

/**
 * Run the bitwarden client command to get the results
 * 
 * @param args the list of args to add to the command
 * @returns 
 */
export default async function runCommand(args: string[]) {

    if (!args.includes("--raw")) {
        // add the raw flag if not included already
        args.push("--raw");
    }

    return await invoke("run_cli_command", { commandArgs: args });
}