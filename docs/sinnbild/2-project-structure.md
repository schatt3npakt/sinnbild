# Projektstruktur

Dein Sinnbild-Projekt besteht aus drei Teilen: Der Story-Config im Ordner **story**, der Frontend-Anwendung im Ordner **_system** und die Dokumentation von sinnbild und deiner Story im Bereich **docs**.

Wenn du nur deine Geschichte schreiben willst und keine weiteren Funktionen benötigst, musst du nur im **story**-Ordner arbeiten.

## Der Story-Ordner

Dieser Ordner erhält alle Konfigurationen, Szenen und Kapitel für deine Story. Für alle nötigen Komponenten sind entsprechende Vorlagendateien enthalten. Deine Geschichte wird über eine Reihe von JSON-Dataien konfiguriert, die beim Bauen der Vue-Anwendung geladen werden. 

Die Hauptkonfiguration ist die **config.json**. Dort werden generelle Einstellungen wie der Titel deiner Geschichte, aktive Szenen, Sprachen etc. beschrieben. Eine genaue Beschreibung der Optionen findest du unter [Story-Konfiguration](story-configuration.md).

Die **theme.css** ist die Styling-Datei für dein Projekt. Die dort enthaltenen Variablen können konfiguriert werden, um das Styling deiner Story einfach anzupassen.

Die **wiki.json** enthält alle Wiki-Einträge deiner Story. Genaueres zu dem Wiki und weiteren Story-Features findest du unter [Story-Features](./story-features.md).

In der **achievements.json** konfigurierst du die Errungenschaften, die dein Leser freischalten kann.

Der **assets-Ordner** kann genutzt werden, um Assets anzulegen, die du zum Beispiel in deinem CSS referenzierst.

Der **chapters-Ordner** enthält die Kapitel deiner Geschichte. Kapitel gruppieren die Szenen deiner Geschichte und dienen dem Leser als Sprungmarken, an die er springen kann, um sich durch die Geschichte zu bewegen.

Der **scenes-Ordner** enthält die Szenen deiner Geschichte. Szenen sind die einzelnen Seiten deiner Geschichte. Im Laufe der Geschichte bewegst du dich von Szene zu Szene.

___

Jetzt hast du einen Überblick über die Struktur deiner Geschichte. Als Nächstes gehen wir ins Detail und schauen uns alle Optionen der JSONS an, aus der deine Geschichten zusammengesetzt sind. Weiter zu [Story-Konfiguration](./story-configuration.md).