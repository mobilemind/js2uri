"use strict";
const { describe, test } = require("node:test");
const assert = require("node:assert/strict");
const { spawnSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { js2uriString, js2uriStringReplaces } = require("../tasks/js2uriHelpers.js");

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf8"));
const CLI = path.join(__dirname, "..", "bin", "js2uri.js");

const defaultOpts = {
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

function expectedURI(content, opts) {
  const result = js2uriString(content, opts.protocol, opts.useNewlineEOL);
  return js2uriStringReplaces(result, opts);
}

describe("js2uri CLI", () => {
  test("--help exits 0 and shows Usage:", () => {
    const result = spawnSync(process.execPath, [CLI, "--help"], { encoding: "utf8" });
    assert.equal(result.status, 0);
    assert.ok(result.stdout.includes("Usage:"));
  });

  test("no args exits 1 and shows Usage:", () => {
    const result = spawnSync(process.execPath, [CLI], { encoding: "utf8" });
    assert.equal(result.status, 1);
    assert.ok(result.stdout.includes("Usage:"));
  });

  test("--version exits 0 and prints version", () => {
    const result = spawnSync(process.execPath, [CLI, "--version"], { encoding: "utf8" });
    assert.equal(result.status, 0);
    assert.equal(result.stdout.trim(), pkg.version);
  });

  test("converts JS file with defaults to javascript: URI", () => {
    const tmpFile = path.join(os.tmpdir(), "j2u_test.js");
    const content = "alert(1)";
    fs.writeFileSync(tmpFile, content, "utf8");
    try {
      const result = spawnSync(process.execPath, [CLI, tmpFile], { encoding: "utf8" });
      assert.equal(result.status, 0);
      assert.equal(result.stdout.trim(), expectedURI(content, defaultOpts));
    } finally {
      fs.unlinkSync(tmpFile);
    }
  });

  test("--no-void omits void suffix", () => {
    const tmpFile = path.join(os.tmpdir(), "j2u_novoid.js");
    const content = "alert(1)";
    fs.writeFileSync(tmpFile, content, "utf8");
    try {
      const result = spawnSync(process.execPath, [CLI, "--no-void", tmpFile], { encoding: "utf8" });
      assert.equal(result.status, 0);
      const opts = { ...defaultOpts, appendVoid: false };
      assert.equal(result.stdout.trim(), expectedURI(content, opts));
    } finally {
      fs.unlinkSync(tmpFile);
    }
  });

  test("missing input file exits 1 with Error on stderr", () => {
    const result = spawnSync(
      process.execPath,
      [CLI, "/nonexistent/j2u_missing.js"],
      { encoding: "utf8" }
    );
    assert.equal(result.status, 1);
    assert.ok(result.stderr.includes("Error"));
  });

  test("writes to output file and logs src -> dest to stderr", () => {
    const tmpIn = path.join(os.tmpdir(), "j2u_in.js");
    const tmpOut = path.join(os.tmpdir(), "j2u_out.js");
    const content = "alert(1)";
    fs.writeFileSync(tmpIn, content, "utf8");
    try {
      const result = spawnSync(process.execPath, [CLI, tmpIn, tmpOut], { encoding: "utf8" });
      assert.equal(result.status, 0);
      assert.equal(fs.readFileSync(tmpOut, "utf8"), expectedURI(content, defaultOpts));
      assert.ok(result.stderr.includes("->"));
      assert.ok(result.stderr.includes("bytes"));
    } finally {
      fs.unlinkSync(tmpIn);
      fs.rmSync(tmpOut, { force: true });
    }
  });
});
