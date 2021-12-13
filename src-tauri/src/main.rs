#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::process::Command;

#[tauri::command]
fn run_cli_command(command_args: Vec<String>) -> String {
  let command = Command::new("bw")
    .args(command_args)
    .output()
    .expect("Failed to run command!");

  return String::from_utf8_lossy(&command.stdout).to_string();
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![run_cli_command])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
