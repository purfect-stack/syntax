# Purfect syntax

Use linting tools which helps to get consistent code through different react projects. If you use postcss in your project, this will also help you lint your style files 

### The problem

Getting all the best practices in one place and updating them throught the projects is really painful

### The solution 

This library allows to reuse it easily without any configuration

## How to start?

1. `npm install --save @purfect/syntax` or `yarn add @purfect/syntax`
2. In your project's `package.json` add these scripts
```
"scripts": {
  "check": "purfect-syntax check",
  "check:code": "purfect-syntax check:code",
  "check:style": "purfect-syntax check:style"
}
```

## Features

| Command | Feature |
|---|---| 
| `purfect-syntax check` | Checks both code and style files | 
| `purfect-syntax check:code` | Checks only code files | 
| `purfect-syntax check:style` | Checks only style files |
| `purfect-syntax commit-hook` | Allows to run checks against specified file paths. Should be used in conjunction with `husky` (see below) or similar pre-commit hook manager |

