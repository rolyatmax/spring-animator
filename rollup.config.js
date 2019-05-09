import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'src/index.js',
  output: {
    file: 'lib/umd.js',
    format: 'umd',
    name: 'SpringAnimator',
    sourcemap: 'inline'
  },
  plugins: [
    resolve(),
    commonjs()
  ]
}
