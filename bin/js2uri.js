#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");
const { js2uriString, js2uriStringReplaces } = require("../tasks/js2uriHelpers.js");

const USAGE = `Usage: js2uri [options] <input.js> [output.js]

Convert a JavaScript file to a javascript: URI bookmarklet.

Arguments:
  input.js   Source JavaScript file
  output.js  Output file (default: stdout)

Options:
  --protocol <proto>   URI protocol prefix (default: javascript:)
  --no-void            Omit void'0' suffix
  --no-single-quote    Keep %22 instead of replacing with single quotes
  --append-version     Append version from package.json
  --entity-encode      Encode HTML entities (& < >)
  --force-semicolon    Force trailing semicolon
  --no-semicolon       Remove trailing semicolon
  --version            Print js2uri version
  --help               Show this help message
`;

const args = process.argv.slice(2);

if (args.length === 0 || args.includes("--help")) {
  process.stdout.write(USAGE);
  process.exit(args.includes("--help") ? 0 : 1);
}

if (args.includes("--version")) {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf8"));
  process.stdout.write(`${pkg.version}\n`);
  process.exit(0);
}

// Parse options
const opts = {
  protocol: "javascript:",
  appendVoid: true,
  appendVersion: false,
  customVersion: "",
  entityEncode: false,
  forceLastSemicolon: false,
  noLastSemicolon: true,
  useNewlineEOL: true,
  useSingleQuote: true
};

let inputFile = null;
let outputFile = null;

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === "--protocol") {
    opts.protocol = args[++i];
  } else if (arg === "--no-void") {
    opts.appendVoid = false;
  } else if (arg === "--no-single-quote") {
    opts.useSingleQuote = false;
  } else if (arg === "--append-version") {
    opts.appendVersion = true;
    try {
      const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf8"));
      opts.customVersion = pkg.version;
    } catch {
      // ignore
    }
  } else if (arg === "--entity-encode") {
    opts.entityEncode = true;
  } else if (arg === "--force-semicolon") {
    opts.forceLastSemicolon = true;
  } else if (arg === "--no-semicolon") {
    opts.noLastSemicolon = true;
  } else if (!arg.startsWith("--")) {
    if (inputFile === null) {
      inputFile = arg;
    } else if (outputFile === null) {
      outputFile = arg;
    }
  }
}

if (!inputFile) {
  process.stderr.write("Error: input file required\n");
  process.exit(1);
}

let jsSource;
try {
  jsSource = fs.readFileSync(inputFile, "utf8");
} catch (e) {
  process.stderr.write(`Error reading ${inputFile}: ${e.message}\n`);
  process.exit(1);
}

let result = js2uriString(jsSource, opts.protocol, opts.useNewlineEOL);
result = js2uriStringReplaces(result, opts);

if (outputFile) {
  try {
    fs.writeFileSync(outputFile, result);
    process.stderr.write(`${inputFile} -> ${outputFile} (${result.length} bytes)\n`);
  } catch (e) {
    process.stderr.write(`Error writing ${outputFile}: ${e.message}\n`);
    process.exit(1);
  }
} else {
  process.stdout.write(result + "\n");
}
