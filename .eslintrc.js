module.exports = {
  extends: [
    require.resolve('@kurocado-studio/style-guide/eslint/browser'),
    require.resolve('@kurocado-studio/style-guide/eslint/react'),
  ],
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['~', './src']],
        extensions: ['.ts', '.tsx'],
      },
      typescript: {
        project: require.resolve('./tsconfig.json'),
      },
    },
  },
};
