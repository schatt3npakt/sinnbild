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

If you would like to learn more, read through the [Documentation](./docs/sinnbild/index.md).

## Your story

It's a good idea to keep notes on the characters, places, and events of your story. If you would like to document your story, feel free edit the [Story Docs](/docs/story/index.md) template!