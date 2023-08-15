/* eslint-disable no-undef */
module.exports = {
    "sourceType": "unambiguous",
    "presets": [
        [
            "@babel/preset-env",
            {
                "modules": false,
                "targets": {
                    "node": 'current'
                },
                "useBuiltIns": "usage",
                "corejs": "3.23"
            }
        ]
    ],
    "plugins": [
        "@babel/plugin-transform-modules-commonjs"
    ]
}