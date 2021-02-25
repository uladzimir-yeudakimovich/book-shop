module.exports = {
  parser: 'typescript',
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  bracketSpacing: true,
  printWidth: 100,
  overrides: [
    {
      files: '*.json',
      options: {
        parser: 'json',
        singleQuote: true,
        trailingComma: 'all',
        tabWidth: 2,
        printWidth: 100,
      },
    },
  ],
};
