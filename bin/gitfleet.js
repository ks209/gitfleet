#!/usr/bin/env node

const { Command } = require("commander");

const init = require("../commands/init");
const add = require("../commands/add");
const status = require("../commands/status");
const pull = require("../commands/pull");
const exec = require("../commands/exec");
const scan = require("../commands/scan");
const list  = require("../commands/list")
const branch  = require("../commands/branch")


const program = new Command();

program
.name("gitfleet")
.description("Manage multiple git repositories");

program.command("init").action(init);

program.command("add <path>").action(add);

program.command("status").action(status);

program.command("pull").action(pull);

program.command("scan <path>").action(scan);

program.command("exec <command>").action(exec)

program.command("list").action(list)

program.command("branch").action(branch)

program.parse();