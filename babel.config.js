 
module.exports = {
    "sourceType": "unambiguous",
    "presets": [
        [
            "@babel/preset-env",
            {
                "modules": false,
                "targets": {
                    "node": 'current'
                }
            }
        ]
    ],
    "plugins": [
        "@babel/plugin-transform-modules-commonjs",
        [
            "babel-plugin-polyfill-corejs3",
            {
                "method": "usage-global",
                "version": "3.50"
            }
        ]
    ]
}