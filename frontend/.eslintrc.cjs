module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@typescript-eslint/strict',
        'prettier',
      ],
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
        'no-console': 'error',
      },
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
  ],
};
