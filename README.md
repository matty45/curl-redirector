# 
A tool for hooking into programs using libcurl to sniff traffic.

### How to compile & load

```sh
$ pip install frida-tools
$ npm install
$ frida binary.exe -l _agent.js
```

### Development workflow

To continuously recompile on change, keep this running in a terminal:

```sh
$ npm run watch
```

And use an editor like Visual Studio Code for code completion and instant
type-checking feedback.
