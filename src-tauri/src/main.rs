#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

#[derive(serde::Serialize)]
struct CommandOutput {
  stdout: String,
  stderr: String,
}

use std::process::Command;

#[tauri::command]
fn run_cli_command(command_args: Vec<String>) -> Result<CommandOutput, String> {
  let command = Command::new("bw")
    .args(command_args)
    .output()
    .expect("Failed to run command!");

  if command.status.success() {
    return Ok(CommandOutput {
      stdout: String::from_utf8_lossy(&command.stdout).to_string(),
      stderr: String::from_utf8_lossy(&command.stderr).to_string(),
    });
  } else {
    return Err(String::from_utf8_lossy(&command.stderr).to_string().into());
  }
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![run_cli_command])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
