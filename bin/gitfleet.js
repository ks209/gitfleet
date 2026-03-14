#!/usr/bin/env node

const { Command } = require("commander");

const init = require("../commands/init");
const add = require("../commands/add");
const status = require("../commands/status");
const pull = require("../commands/pull");
const exec = require("../commands/exec");
const scan = require("../commands/scan");
const list = require("../commands/list");
const branch = require("../commands/branch");
const fetch = require("../commands/fetch");

const program = new Command();

program
  .name("gitfleet")
  .description("Manage multiple git repositories")
  .version("1.0.0");

program
  .command("init")
  .option("--scan", "Scan workspace for git repos")
  .action((options) => init(options));

program
  .command("add <path>")
  .description("Add repository to fleet")
  .action(add);

program
  .command("status")
  .description("Show repo status")
  .action(status);

program
  .command("pull")
  .description("Pull all repositories")
  .action(pull);

program
  .command("scan <path>")
  .description("Scan directory for git repositories")
  .action(scan);

program
  .command("exec <command>")
  .description("Run command across all repos")
  .action(exec);

program
  .command("list")
  .description("List all repos in fleet")
  .action(list);

program
  .command("branch")
  .description("Show branches across repos")
  .action(branch);

program
  .command("fetch")
  .description("Fetch updates from all repos")
  .action(fetch);

program.parse();