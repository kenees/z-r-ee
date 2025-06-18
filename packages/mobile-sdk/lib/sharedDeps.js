/**
 * Collect shared dependencies from the SDK and expose them
 * for the ModuleFederationPluginV1.
 *
 * @param {{ eager: boolean }} options Options for the shared dependencies. Use eager: false if using in a mini-app.
 * @returns Shared dependencies object.
 */
const getSharedDependencies = ({eager = true}) => {
  const dependencies = require('./dependencies.json');

  const shared = Object.entries(dependencies).map(([dep, {version}]) => {
    return [dep, {singleton: true, eager, requiredVersion: version}];
  });

  shared.push(
    [
      'react-native/Libraries/Utilities/DevLoadingView',
      { singleton: false, eager: false }
  ]
  )


  console.log(shared)

  return Object.fromEntries(shared);
};

module.exports = getSharedDependencies;
