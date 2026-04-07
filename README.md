# super-duper-train

A development environment pre-configured for [Visual Studio Code](https://code.visualstudio.com/) with [GitHub Copilot](https://github.com/features/copilot) enabled out of the box, featuring **Gemini 3.1 Pro Preview** for advanced agentic workflows.

## Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/) installed on your machine
- A [GitHub account](https://github.com/) with access to GitHub Copilot
- A GitHub Enterprise subscription with Gemini 3.1 Pro Preview enabled by your Enterprise Administrator

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

GitHub Copilot is enabled for all file types via `.vscode/settings.json`. Gemini 3.1 Pro Preview is configured as the default model for GitHub Copilot Chat, and agent mode is enabled for agentic edit-then-test workflows.

### MCP Servers

Model Context Protocol (MCP) server configuration is provided in `.vscode/mcp.json`. The included [exa-mcp-server](https://github.com/exa-labs/exa-mcp-server) lets the Gemini agent search the web for up-to-date documentation and context. VS Code will prompt you for your [Exa API key](https://exa.ai/) on first use.

To add more MCP servers, extend the `servers` object in `.vscode/mcp.json`.

## Gemini 3.1 Pro Preview – Agentic Workflow

### Enterprise Setup (Administrator)

Before developers can use Gemini 3.1 Pro Preview, an Enterprise Administrator must enable it:

1. Go to **Enterprise Settings → Policies → Copilot**.
2. Locate **Gemini 3.1 Pro (Preview)** and set it to **Enabled**.
3. Under **Model Picker**, confirm that users are allowed to select Gemini 3.1 Pro in VS Code and on GitHub.com.

### Using Agent Mode in VS Code

1. Open **GitHub Copilot Chat** (`Ctrl+Alt+I` / `Cmd+Alt+I`).
2. Select **Agent** from the mode dropdown (agent mode is pre-enabled via `.vscode/settings.json`).
3. Gemini 3.1 Pro Preview is already set as the default model; you can also select it manually from the model picker.
4. Use the agent for iterative edit-then-test loops, code reviews, and vulnerability fixes.

### GitHub Actions Integration

Gemini 3.1 Pro Preview can be wired into your CI/CD pipeline:

- **Automated code reviews** – Configure Copilot Extensions in your workflow to trigger reviews on pull requests.
- **Unit test generation** – Use the agent to generate and update tests as part of your workflow dispatch.
- **Vulnerability remediation** – Pair with GitHub secret scanning to automatically surface and fix issues.

Example workflow dispatch snippet:

```yaml
- name: Copilot code review
  uses: github/copilot-code-review-action@v1
  with:
    model: gemini-3-pro-preview
```

> **Tip:** Use the **Medium Thinking Level** in API settings to balance reasoning depth and speed for background agent tasks.

## Usage

Once set up, GitHub Copilot with Gemini 3.1 Pro Preview will:

- Suggest code completions as you type
- Help you write boilerplate code faster
- Answer questions about your codebase via **GitHub Copilot Chat** (`Ctrl+Alt+I` / `Cmd+Alt+I`)
- Run multi-step agentic tasks (edit, test, fix) in **Agent mode**
- Search external documentation and the web via the connected **MCP server**

## Juicebot Card Generator

The card generator reads `cards.csv` (the 27-card **Juiced Up V1.0** launch set) and exposes a typed REST API backed by a Prisma-managed SQLite database.

### Card data (`cards.csv`)

Each row represents one card in the launch set. Columns:

| Column | Field | Description |
|--------|-------|-------------|
| 0 | `releaseOrder` | Numeric release sequence |
| 1 | `cardId` | Unique card identifier (e.g. `JU-001`) |
| 2 | `title` | Card name |
| 3 | `subtitle` | Flavour subtitle |
| 4 | `baseOrFoil` | `Base` or `Foil` variant |
| 5 | `rarity` | Common / Uncommon / Rare / Epic / Legendary |
| 6 | `category` | Juice / Boost / Power / Defense / Recovery / Special |
| 7 | `tier` | 1–4 power tier |
| 8 | `pullRateStandard` | Pull rate % in standard packs |
| 9 | `pullRatePremium` | Pull rate % in premium packs |
| 10 | `acquisitionMethod` | How the card is obtained |
| 11 | `pool` | Card pool (Core / Power / Elite / Legendary) |
| 12 | `statBoost` | Stat bonus granted by the card |
| 13 | `relatedCards` | Related card ID(s) |

### Running locally

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Apply database migrations
npm run db:migrate

# Seed the database from cards.csv
npm run db:seed

# Start the development server
npm run dev
```

The API will be available at `http://localhost:3000`.

### API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Health check |
| `GET` | `/api/cards` | List all cards |
| `GET` | `/api/cards/:id` | Get card by ID (e.g. `JU-001`) |
| `GET` | `/api/cards/rarity/:rarity` | Filter by rarity |
| `GET` | `/api/cards/category/:category` | Filter by category |

### GitHub Actions workflow

The `.github/workflows/juicedup-agent-flow.yml` workflow automatically re-seeds the database whenever `cards.csv` is updated on `main`. It can also be triggered manually from the **Actions** tab.

## Contributing

Feel free to open issues or pull requests to improve this repository.