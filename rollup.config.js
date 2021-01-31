import alias from '@rollup/plugin-alias';
import externals from 'rollup-plugin-node-externals';
import glob from 'glob';
import json from '@rollup/plugin-json';
import path from 'path';
import resolve from '@rollup/plugin-node-resolve';

const memberships = glob.sync('data/congresses/**/members.json');

export default memberships.map((membershipPath) => {
  const outputPath = path.relative(path.join(__dirname, 'data/congresses'), membershipPath).replace('members.json', '');
  const output = {
    dir: `congress/${outputPath}`,
    format: 'cjs',
  };

  const plugins = [
    resolve({ preferBuiltins: true, modulesOnly: true }),
    json(),
    externals({ deps: true }),
    alias({
      entries: [
        { find: 'congress-chamber-membership', replacement: membershipPath },
      ],
    }),
  ];

  return {
    input: 'src/index.js',
    output,
    plugins,
  };
});
