# Story-Konfiguration

In diesem Abschnitt werden die Optionen zur Konfiguration deiner Geschichte erklärt. Jeder Abschnitt dieses Dokuments entspricht einer JSON in deinem **story**-Ordner.

## config.json

Das ist die Hauptkonfiguration deiner Geschichte. Hier werden grundlegende Einstellungen gesetzt. Es folgt eine Erklärung der einzelnen Properties.

### projectKey

Eine id, anhand derer deine Geschichte identifiziert wird. Er wird zum Beispiel zur Identifikation deines Speicherstandes im LocalStorage verwendet. Dort wird aus dem String "sinnbild-" + projectKey ein Identifier gebaut, über den der Speicherstand von anderen Sinnbild-Speicherständen auf deiner (Sub-)Domain unterschieden werden kann.

### title

Der Titel deiner Geschichte, wird im Hauptmenü angezeigt.

### description

Eine kurze Beschreibung deiner Geschichte die im entsprechenden Meta-Attribut der Seite ausgegeben wird.

### features

Sinnbild stellt eine Reihe von Systemen und Features bereit, die du für den Ausbau deiner Geschichte nutzen kannst. Falls du einige dieser Features nicht benötigst, kannst du sie hier deaktivieren. Standardmäßig sind alle Features aktiv.