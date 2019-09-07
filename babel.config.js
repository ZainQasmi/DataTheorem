// module.exports = function (api) {
// api.cache(true);

// const plugins = [ "@babel/plugin-proposal-class-properties" ];

// return {
//     plugins
// };
// }

// const plugins = [ "@babel/plugin-proposal-class-properties" ]
//     [
//       "@babel/env",
//       {
//         targets: {
//           edge: "17",
//           firefox: "60",
//           chrome: "67",
//           safari: "11.1",
//         },
//       },
//     ],
//   ];
  
//   module.exports = { plugins };

  module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript'
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties'
    ]
};
  
  