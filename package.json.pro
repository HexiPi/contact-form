{
  "name": "contact-form-hexipi",
  "version": "0.1.1",
  "main": "./lib/ContactForm.js",
  "types": "./lib/ContactForm.d.ts",
  "dependencies": {
    "bootstrap": "^4.4.1",
    "jquery": "^3.5.1",
    "libphonenumber-js": "^1.7.56",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-scripts": "3.4.1",
    "react-social-icons": "^4.1.0",
    "reactstrap": "^8.4.1"
  },
  "peerDependencies": {
    "react": "^16.13.1",
    "react-dom": "^16.13.1"
  },
  "devDependencies": {
    "@types/node": "^14.0.26",
    "@types/prop-types": "^15.7.3",
    "@types/react-dom": "^16.9.8",
    "@types/reactstrap": "^8.5.0",
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.5",
    "babel-preset-env": "^1.7.0",
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-0": "^6.24.1",
    "css-loader": "^3.6.0",
    "file-loader": "^6.0.0",
    "path": "^0.12.7",
    "prop-types": "^15.7.2",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "source-map-loader": "^1.0.1",
    "style-loader": "^1.2.1",
    "svg-url-loader": "^6.0.0",
    "ts-loader": "^8.0.1",
    "typescript": "^3.9.7",
    "webpack": "^4.43.0",
    "webpack-cli": "^3.3.12"
  },
  "scripts": {
    "prebuild": "tsc",
    "build": "webpack"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "files": [
    "lib/**/*"
  ],
  "description": "This is a React.JS contact form module.",
  "author": "Jose A. Alvarado",
  "license": "MIT"
}
