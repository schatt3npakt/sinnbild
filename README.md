# sinnbild

sinnbild is an open-source template project for choose-your-own-adventure-style stories and games.
It was created using Vue3 and offers a variety of modern features to your readers, for example:

- Support for mouse, touch, keyboard and gamepad navigation
- Automated client-side progress saving (using local storage)
- An elegant and simple default theme with light and dark mode
- Multi-language-support (german and english as default)
- Chapter- and achievement systems
- A wiki system for quick reference to story-related terms
- screenreader accessibility
- An app-like PWA experience

## Project structure

The project is divided into to folders, **_system** and **story**.
The **_system** folder contains the vue-app you start for development and bundle for production.
The **story** folder contains the configuration and content of your story. Also included is a **theme.css** that sets a few easily editable styling variables, such as fonts and colors. If you don't want to alter the projects core functionality, you should be fine with just editing the files in the story folder.

Further information is found inside the **docs** folder.

## Project setup
### Set up the project via npm
```
cd _system
npm install
```

### Compiles and hot-reloads for development
```
cd _system
npm run serve
```

### Compiles and minifies for production
```
cd _system
npm run build
```

### Lints and fixes files
```
cd _system
npm run lint
```