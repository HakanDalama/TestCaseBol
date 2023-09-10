# TestCaseBol
Ontwikkel een geautomatiseerd testscript met Cypress dat  zoekt voor specifiek producten binnen bol.com

Details:
Extractie van prijzen: Na het uitvoeren van de zoekopdracht,bijv een laptop,, moet het script de prijs van het 3e weergegeven product (of een specifieke lijstpositie, zoals de derde plaats) extraheren. Voordat je dat doet wil ik graag dat je de prijs van laag naar hoog sorteert

Uitdagingen:
Druk op bestelknop en bestel een item. Hier leer je omgaan Omgaan met pop-ups of andere website-specifieke hindernissen. Hierna klik je op verder winkelen
Zoek nu het vierde product en haal de prijs output van de laptop of gewenste product op
Ga nu naar de categorie eten en drinken, koffie en thee en druk op de link alles in de koffie. Klik op koffie. Selecteer het 2e product en haal de prijs output op via een console log

**How to run:**

Depenencies:
FastCSV: 
--npm install fast-csv

Dit script voert een test uit op de webpagina van bol. om het script te runnen heb je FastCSV nodig. Open het script in Cypress door de volgende command uit te voeren:
--npx cypress open 
Kies vervolgens E2E Testing en de Chrome Browser
Klik op de WebshopProgram.cy.js en deze zal automatisch de test uitvoeren
Alle testresultaten worden in een CSV gezet "data.csv"

