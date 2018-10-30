import typescript from 'rollup-plugin-typescript2';

export default {
    input : './src/index.ts',
    output : {
        file : "./src/build/stupid-console.js",
        format: "iife",
        name: "StupidConsole",
    },

    sourceMap: true,
    external: [
        'jsPanel'
    ],
    plugins: [
        typescript(/*{ plugin options }*/)
    ]
}