# Release

## Release auf eigenem Server

Deine Geschichte ist fertig und du bist bereit sie mit der Welt zu teilen?
Dann kannst du jetzt dein Projekt bauen und hochladen.

```bash
cd _system
npm run build
```

Danach wird im Root deines Projektes ein **dist**-Verzeichnis ausgegeben.
In dem dist-Verzeichnis findet sich die kompilierte Version deiner Vue-App aus dem **_system**-Verzeichnis mit den Inhalten aus dem Story-Verzeichnis.

## Release mit Github Pages

Deine Geschichte kann auch automatisch über Github Pages gehostet werden. Dazu muss das Pages-Deployment in den Repo-Settings aktiviert werden.

1. Gehe in den Repository-Settings auf **Pages/Build and deployment**
2. Setze das Source-Dropdown auf Github Actions.

Danach wird bei jedem Push in den Main-Branch dein Projekt über einen Github Actions-Workflow gebaut und deployed. Der entsprechende Link zu deiner Geschichte wird am Anfang der Seite angezeigt:

**Your site is live at [https://schatt3npakt.github.io/sinnbild/](https://schatt3npakt.github.io/sinnbild/)**