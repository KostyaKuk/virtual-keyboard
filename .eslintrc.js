module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': 0,
    'global-require': 0,
    'import/extensions': ['error', 'ignorePackages'],
    'eslint linebreak-style': [0, 'error', 'windows'],
  },
};
