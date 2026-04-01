# super-duper-train

A development environment pre-configured for [Visual Studio Code](https://code.visualstudio.com/) with [GitHub Copilot](https://github.com/features/copilot) enabled out of the box.

## Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/) installed on your machine
- A [GitHub account](https://github.com/) with access to GitHub Copilot

## Getting Started

1. Clone this repository and open it in Visual Studio Code:

   ```bash
   git clone https://github.com/HustleHack/super-duper-train.git
   cd super-duper-train
   code .
   ```

2. When prompted, install the recommended extensions:

   - **GitHub Copilot** – AI-powered code completion and suggestions
   - **GitHub Copilot Chat** – Conversational AI assistant for coding questions

   VS Code will automatically suggest these extensions based on `.vscode/extensions.json`.

3. Sign in to your GitHub account in VS Code to activate GitHub Copilot.

## Configuration

### Extensions

Recommended extensions are listed in `.vscode/extensions.json`. VS Code will prompt you to install them when you open the repository.

### GitHub Copilot Settings

GitHub Copilot is enabled for all file types via `.vscode/settings.json`. This means you will get AI-powered suggestions regardless of the language or file type you are working with.

## Usage

Once set up, GitHub Copilot will:

- Suggest code completions as you type
- Help you write boilerplate code faster
- Answer questions about your codebase via **GitHub Copilot Chat** (`Ctrl+Alt+I` / `Cmd+Alt+I`)

## Contributing

Feel free to open issues or pull requests to improve this repository.