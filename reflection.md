# Kapitel 2
Kapitlet fokuserar på namngivning av metoder och variabler. Jag har verkligen försökt att tänka på att skapa meningsfull namngivning. Namnet ska tillföra info till andra programmerare och på så sätt göra det enkelt att sätta sig in i koden. Jag har också tänkt mycket på att namnen inte är missvisande, utan verkligen reflekterar vad metoden gör. Därför har jag brutit ut funktionaliteten toDataURL() från draw-metoderna för att inte skapa sidoeffekter. ![kapitel2](./src/images/kapitel2.PNG).


# Kapitel 3
Ett viktigt budskap i det här kapitlet är att en funktion ska fokusera på att göra en sak. Jag utgår ofta från den här regeln och det har påverkat min kod till det bättre. Om funktionen gör mer än en sak så brukar jag dela upp den i fler funktioner. På så sätt kan jag se till att varje metod får en uppgift att utföra. I funktionen inputData() fanns mer än en uppgift och därför har jag nu lagt till funktionen checkInput(). ![kapitel3](./src/images/kapitel3.PNG).



# Kapitel 4
Efter att ha läst det här kapitlet har jag försökt att ta bort så många onödiga kommentarer som möjligt. Istället har jag ändrat i koden för att tydliggöra vad jag menar. Som författaren skriver finns det slutgiltiga svaret om vad koden gör i själva koden. Det är därför bättre att förbättra koden än att täcka upp för sämre kod med kommentarer. Jag valde dock att behålla JSDOC-kommentarerna just eftersom jag skriver i JavaScript. Jag tror att de kan tillföra viktig info. Jag försökte också vara noga med att hålla dem uppdaterade. ![kapitel4](./src/images/kapitel4.PNG).



# Kapitel 5



# Kapitel 6



# Kapitel 7



# Kapitel 8




# Kapitel 9



# Kapitel 10




# Kapitel 11






















































# Kapitel 2

| Name and explanation                                                            | Reflection and rules from Clean Code |
| ------------------------------------------------------------------------------- | ------------------------------------ |
| Statistics (Class name for the main class in the module)                               | **Class names** Till en början kallade jag den här klassen för Data, men efter att ha läst om namngivning av klasser i boken så insåg jag att det inte var ett bra val. Jag har därför döpt om klassen till Statistics och hoppas att det ska ge en tydligare beskrivning av vad för slags data som klassen hanterar.                                |
| Statistics.inputData(originalData) (void, a method that inputs the data set as an array)          |  **Add meaningful context** I det här fallet är det bra att metoden används så tydligt ihop med klassnamnet. Om vi bara hade sett metoden inputData() skulle det ha varit svårt att förstå vad metoden förväntas göra. Ihop med klassen Statistics blir det enklare. Vi kan förstå att syftet är att sammanställa statistik över datan. Slutsatsen är att kontexten är väldigt viktig för förståelsen.                                 |
| Statistics.getSortedData() (array, a method that sorts the data and then returns it)  | **Use intention-revealing names** En metods namn bör förklara vad den gör och hur den används, uttrycks det i boken. Det här metodnamnet kommunicerar vad metoden gör: den sorterar datan och returnerar (get) den sorterade datan. På så sätt bör det vara tydligt för användaren hur metoden används.    <br><br>  **Avoid encodings** I boken nämns det att programmerare i Java inte ska blanda in värdetypen i namngivningen. I Javascript är det frågan om den regeln gäller på samma sätt. Jag har dock valt att hålla mig till den här regeln också i Javascript. Den här metoden kallas därför getSortedData() och inte getSortedDataArray(). Eftersom man ofta använder sig av JSDOC-kommentarer i javascript skulle den typen av namn bara förvirra användaren. Dessutom är många metodnamn tillräckligt långa ändå.                           |
| Statistics.getStatistics() (object, a method that returns descriptive statistics)     | **Pick one word per concept** Jag har försökt att hålla mig till "get" om en metod returnerar något. I boken står det att man inte ska använda sig av synonymer eftersom det lätt blir förvirrande. Jag har därför undvikit att använda mig av "fetch" eller "retrieve" och istället konsekvent hållit mig till "get".                                   |
| Statistics.getTableImgPath() (promise, a method that returns a promise for a URL)     | **Make meaningful distinctions** getTableImgPath() skiljer sig från metoderna getBoxPlotImgPath() och getBarChartImgPath(). Det bör därför inte gå att blanda ihop dem och användaren kan förstå skillnaden i funktionalitet.                   |



# Kapitel 3

| Method name and link         | Number of rows       | Reflection and rules from Clean Code | 
| -----------------------------| -------------------- | ------------------------------------ |
| (void)Statistics.inputData(originalData)  [inputData](./src/js/components/statistics/statistics.js)      | 18         |   **Do one thing** Även om den här funktionen inte är överdrivet lång så har den vissa problem. Den följer inte regeln att bara göra en sak. Det är ganska tydligt att metoden både kontrollerar den inmatade datan och vid behov "throws errors" samt att den lagrar dataarrayen i en lokal variabel. Här finns möjligheter till förbättring av koden.                                     |
| (void)Statistics.setModeValue()  [setModeValue](./src/js/components/statistics/statistics.js)          | 20          |   **One level of abstraction per function** Jag tycker att den här funktionen i stort sett gör en sak. Den räknar ut datans typvärde eller typvärden och sparar arrayen med resultatet i en lokal variabel. I boken beskrivs det som fördelaktigt om funktionen har en och samma nivå av abstraktion. Jag tycker att abstraktionen är på ungefär samma nivå genom hela funktionen, vilket tyder på att den gör en sak. Sedan hade man kanske kunnat ha själva uträkningen i en annan funktion. Då hade setModeValue() bara stått för lagringen i den lokala variabeln. Jag har dock en känsla för att det hade försvårat läsningen av koden i det här fallet eftersom setModeValue() då hade fått anropa t.ex. countModeValue(). Det är inte säkert att det hade blivit bättre kodkvalité av en sådan ändring. Den här metoden är ändå inte överdrivet lång.                                   |
| (Promise)Diagram.drawTable() [drawTable](./src/js/components/lm-diagram/lm-diagram.js)      | 30         |      **Function Arguments** I boken står det att det ideala antalet argument för en funktion är noll ("niladic"). Det är alltså bra att den här funktionen inte har några argument.                               |
| (Promise)Diagram.drawBox()  [drawBox](./src/js/components/lm-diagram/lm-diagram.js)              | 68           |     **Don't repeat yourself** "Duplicate Code" är något som vi ständigt vill undvika. Det gör det ofta svårt att överblicka koden och resulterar i långa funktioner. Det går att korta ner antalet rader kod väsentligt om vi undviker upprepningar. Exempelvis kan vi korta ner koden genom att använda oss av funktioner som utför en sak och som kan anropas av andra funktioner. Man kan tycka att de tre funktionerna drawBox(), drawTable() och drawBarchart() har många likheter med varandra och att det kan vara tecken på upprepning. Här använder jag mig dock av canvas och varje diagram måste ritas enligt specifika mått, vilket gör det svårt att korta ner antalet rader kod. <br><br> **Do one thing** Här har funktionen problem. Den räknar ut kvartilerna från datamaterialet för att kunna skapa låddiagrammet. Här hade jag behövt ändra så att Statistics-klassen räknar ut kvartilerna och Diagram-klassen bara hämtar ut infon. Då hade den här funktionen blivit betydligt kortare och mer överskådlig.                                  |
| (Promise)Diagram.drawBarchart() [drawBarchart](./src/js/components/lm-diagram/lm-diagram.js)            | 45           |       **Have no side effects** Metodnamnet indikerar att metoden ritar ett stapeldiagram. Om vi granskar funktionen närmare kan vi se att den använder sig av canvas och ritar stapeldiagrammet. Närmare slutet av metoden anropas dock toDataURL() och metoden returnerar ett Promise om att leverera url:en till den sparade bilden. Det här kan vara ett exempel på en metod med sidoeffekter, men eftersom JSDOC-kommentaren visar på att metoden returnerar ett Promise om en image-path så borde användaren kunna inse att metoden gör mer än att bara rita diagrammet. Det är värt att tänka på att det här metodnamnet kan förbättras.         |



# Reflektion

I workshop 1 fick jag förståelse för svårigheterna som kan finnas när man ska förstå någon annans kod. Namngivningen av klasser, metoder och variabler spelar stor roll för att kommunicera kodens innehåll. I boken ”Clean Code” nämns betydelsen av meningsfulla namn för kodkvalitén. Ett misstag som är vanligt, och som ett exempel i boken tydliggör, är att man skapar kod som implicit förklarar för användaren vad den gör. Många gånger är det lätt att tro att bara för att man själv är insatt i koden och dess kontext, så kommer andra automatiskt att förstå vad man menar. I stället bör man tänka på att skapa kod som explicit förklarar för användaren hur den är tänkt att användas. Där kommer namngivning av exempelvis metoder och variabler in i bilden. Namnen bör vara såpass tydliga att vi inte behöver lägga till ytterligare kommentarer för att förklara vad vi menar. Det kan handla om att inte skapa missvisande namn, som att inte använda sig av ”get” i början på metodnamnet om metoden inte returnerar något. Man kan också visa på vilken värdetyp som metoden returnerar genom att exempelvis skriva ”is” i början för att indikera att metoden returnerar ”a boolean value”.

Det jag har lärt mig om kodkvalité från boken är också betydelsen av att låta arbetet få ta sin tid. Planering och namngivning är tidskrävande, men man har igen arbetet i längden. En bra idé är också att lämna kod efter sig i bättre skick än vad man fann den. Det är lätt att kodkvalitén annars hamnar i en nedåtgående spiral vilket kan vara negativt för ett företag. Effektiviteten blir alltså bättre i längden om man lägger ner det extra arbetet på att skapa kodkvalité. För min del inser jag att det är till fördel att tänka på exempelvis namngivning när jag programmerar på egen hand. I de fall då jag återvänder till ett projekt, efter en lång tids uppehåll, sparar jag mycket tid om jag tidigare har jobbat aktivt med kodkvalitén. Då blir det lättare att ta till sig kodens innehåll på nytt och fortsätta där jag slutade. Slutsatsen är därför att både programmeraren själv och andra som tar del av koden gynnas av arbetet för kodkvalité.   

