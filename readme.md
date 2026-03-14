# GitFleet

GitFleet is a CLI tool to **manage multiple Git repositories from one place**.

It allows developers working with many repositories (microservices, multi-repo projects, etc.) to run Git commands across all repositories quickly.

---

# Features

* Manage multiple Git repositories as a **fleet**
* Pull updates across all repos
* Check repository status
* Run commands across multiple repos
* Automatically scan and detect Git repositories
* Workspace-based configuration

---

# Installation

Install GitFleet globally using npm:

```bash
npm install -g gitfleet
```

Verify installation:

```bash
gitfleet --version
```

---

# Workspace Configuration

GitFleet stores repository information in a **workspace configuration file**.

```
.gitfleet/config.json
```

Example:

```json
{
  "repos": [
    "./auth-service",
    "./payment-service",
    "./dashboard"
  ]
}
```

This file tracks all repositories that belong to the fleet.

---

# Getting Started

Navigate to a directory that contains your repositories.

Example:

```bash
cd ~/projects/microservices
```

Initialize GitFleet workspace:

```bash
gitfleet init
```

This creates:

```
.gitfleet/config.json
```

---

# Automatically Scan Repositories

To automatically detect Git repositories in your workspace:

```bash
gitfleet init --scan
```

or

```bash
gitfleet scan .
```

Example output:

```
✔ GitFleet workspace initialized

Scanning workspace...

Added: auth-service
Added: payment-service
Added: dashboard
```

---

# List Repositories

Show all repositories in the fleet:

```bash
gitfleet list
```

Example output:

```
auth-service
payment-service
dashboard
```

---

# Pull All Repositories

Pull updates across every repository:

```bash
gitfleet pull
```

This runs:

```
git pull
```

in every repository in the fleet.

---

# Check Repository Status

```bash
gitfleet status
```

Example output:

```
auth-service      ✔ clean
payment-service   ⚠ uncommitted changes
dashboard         ↓ 2 commits behind
```

---

# Execute Commands Across Repositories

Run any command across all repositories.

Example:

```bash
gitfleet exec "npm install"
```

Another example:

```bash
gitfleet exec "git checkout main"
```

---

# Fetch Updates

Fetch updates from all repositories without merging.

```bash
gitfleet fetch
```

---

# Show Current Branch

Display the active branch of each repository:

```bash
gitfleet branch
```

Example output:

```
auth-service      main
payment-service   develop
dashboard         main
```

---

# Add Repository Manually

Add a repository manually to the fleet.

```bash
gitfleet add ../new-service
```

---

# Example Workflow

Typical workflow for a developer managing multiple repositories:

```bash
cd ~/projects/microservices

gitfleet init --scan

gitfleet pull

gitfleet status

gitfleet exec "npm install"
```

---

# Example Project Structure

```
microservices/
   .gitfleet/
      config.json

   auth-service/
   payment-service/
   dashboard/
```

---

# Why GitFleet?

Developers working with microservices or multiple repositories often run the same commands repeatedly.

GitFleet helps automate those workflows and manage repositories as a single fleet.

---

# License

MIT
