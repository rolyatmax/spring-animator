import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'example/index.js',
  output: {
    file: 'example/bundle.js',
    format: 'iife',
    sourcemap: 'inline'
  },
  plugins: [
    resolve(),
    commonjs({
      namedExports: { 'dat-gui': ['GUI'] }
    })
  ]
}
