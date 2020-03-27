import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import pkg from './package.json';

const SOURCE = 'src/main.js';

export default [
  {
    input: SOURCE,
    output: {
      file: pkg.main,
      format: 'cjs',
    },
    plugins: [commonjs()],
  },
  {
    input: SOURCE,
    output: {
      file: pkg.module,
      format: 'esm',
    },
    plugins: [commonjs()],
  },
  {
    input: SOURCE,
    output: {
      file: 'dist/mtproto.min.js',
      format: 'umd',
      name: 'MTProto',
    },
    plugins: [
      resolve({ preferBuiltins: false }),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
      }),
      uglify(),
    ],
  },
];
