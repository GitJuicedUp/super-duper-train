# GitHub CLI Manual

GitHub CLI, or `gh`, is a command-line interface to GitHub for use in your terminal or your scripts.

## Available Commands

See the [GitHub CLI command reference](https://cli.github.com/manual/) for a full list of available commands.

## Usage Examples

See the [GitHub CLI usage examples](https://cli.github.com/manual/) for common workflows and scripts.

## Community Extensions

Browse [community extensions](https://github.com/topics/gh-extension) built by the GitHub community to extend `gh` with custom commands.

## Installation

You can find installation instructions on the [GitHub CLI README](https://github.com/cli/cli#installation).

## Configuration

Run `gh auth login` to authenticate with your GitHub account. Alternatively, `gh` will respect the `GITHUB_TOKEN` environment variable.

To set your preferred editor, use:

```bash
gh config set editor <editor>
```

Read more about [`gh config`](https://cli.github.com/manual/gh_config) and [environment variables](https://cli.github.com/manual/gh_help_environment).

Declare your aliases for often-used commands with [`gh alias set`](https://cli.github.com/manual/gh_alias_set).

## GitHub Enterprise

GitHub CLI supports GitHub Enterprise Server 2.20 and above. To authenticate with a GitHub instance, run:

```bash
gh auth login --hostname <hostname>
```

To define this host as a default for all GitHub CLI commands, set the `GH_HOST` environment variable:

```bash
export GH_HOST=<hostname>
```

To authenticate commands in scripting mode or automation, set the `GH_ENTERPRISE_TOKEN`:

```bash
export GH_ENTERPRISE_TOKEN=<access-token>
```

## Support

- Ask usage questions and send feedback in [Discussions](https://github.com/cli/cli/discussions)
- Report bugs or search for existing feature requests in the [issue tracker](https://github.com/cli/cli/issues)
