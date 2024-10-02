module.exports = {
  extends: [require.resolve('@kurocado-studio/style-guide/eslint/node')],
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
