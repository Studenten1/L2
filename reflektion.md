# Kapitel 2

| Name and explanation                                                            | Reflection and rules from Clean Code |
| ------------------------------------------------------------------------------- | ------------------------------------ |
| Statistics (Class name for the main class in the module)                               | **Class names** Till en början kallade jag den här klassen för Data, men efter att ha läst om namngivning av klasser i boken så insåg jag att det inte var ett bra val. Jag har därför döpt om klassen till Statistics och hoppas att det ska ge en tydligare beskrivning av vad för slags data som klassen hanterar.                                |
| Statistics.inputData(originalData) (void, a method that inputs the data set as an array)          | Text                                 |
| Statistics.getSortedData() (array, a method that sorts the data and then returns it)  | **Use intention-revealing names** En metods namn bör förklara vad den gör och hur den används, uttrycks det i boken. Det här metodnamnet kommunicerar vad metoden gör: den sorterar datan och returnerar (get) den sorterade datan. På så sätt bör det vara tydligt för användaren hur metoden används.      **Avoid encodings** I boken nämns det att programmerare i Java inte ska blanda in värdetypen i namngivningen. I Javascript är det frågan om den regeln gäller på samma sätt. Jag har dock valt att hålla mig till den här regeln också i Javascript. Den här metoden kallas därför getSortedData() och inte getSortedDataArray(). Eftersom man ofta använder sig av JSDOC-kommentarer i javascript skulle den typen av namn bara förvirra användaren. Dessutom är många metodnamn tillräckligt långa ändå.                           |
| Statistics.getStatistics() (object, a method that returns descriptive statistics)     | Text                                 |
| Statistics.getTableImgPath() (promise, a method that returns a promise for a URL)     | **Make meaningful distinctions** getTableImgPath() skiljer sig från metoderna getBoxPlotImgPath() och getBarChartImgPath(). Det bör därför inte gå att blanda ihop dem och användaren kan förstå skillnaden i funktionalitet.                                     |



# Kapitel 3

| Method name and link         | Number of rows       | Reflection and rules from Clean Code | 
| -----------------------------| -------------------- | ------------------------------------ |
| Statistics.inputData()  [inputData](./src/js/components/lm-data/lm-data.js)      | 18         |                                      |
| Statistics.setModeValue()  [setModeValue](./src/js/components/lm-data/lm-data.js)          | 20          |                                      |
| Diagram.drawTable() [drawTable](./src/js/components/lm-diagram/lm-diagram.js)      | 30         |                                      |
| Diagram.drawBox()  [drawBox](./src/js/components/lm-diagram/lm-diagram.js)              | 68           |                                      |
| Diagram.drawBarchart() [drawBarchart](./src/js/components/lm-diagram/lm-diagram.js)            | 45           |                                      |



# Reflektion

I workshop 1 fick jag förståelse för svårigheterna som kan finnas när man ska förstå någon annans kod. Namngivningen av klasser, metoder och variabler spelar stor roll för att kommunicera kodens innehåll. I boken ”Clean Code” nämns betydelsen av meningsfulla namn för kodkvalitén. Ett misstag som är vanligt, och som ett exempel i boken tydliggör, är att man skapar kod som implicit förklarar för användaren vad den gör. Många gånger är det lätt att tro att bara för att man själv är insatt i koden och dess kontext, så kommer andra automatiskt att förstå vad man menar. I stället bör man tänka på att skapa kod som explicit förklarar för användaren hur den är tänkt att användas. Där kommer namngivning av exempelvis metoder och variabler in i bilden. Namnen bör vara såpass tydliga att vi inte behöver lägga till ytterligare kommentarer för att förklara vad vi menar. Det kan handla om att inte skapa missvisande namn, som att inte använda sig av ”get” i början på metodnamnet om metoden inte returnerar något. Man kan också visa på vilken värdetyp som metoden returnerar genom att exempelvis skriva ”is” i början för att indikera att metoden returnerar ”a boolean value”.

Det jag har lärt mig om kodkvalité från boken är också betydelsen av att låta arbetet få ta sin tid. Planering och namngivning är tidskrävande, men man har igen arbetet i längden. En bra idé är också att lämna kod efter sig i bättre skick än vad man fann den. Det är lätt att kodkvalitén annars hamnar i en nedåtgående spiral vilket kan vara negativt för ett företag. Effektiviteten blir alltså bättre i längden om man lägger ner det extra arbetet på att skapa kodkvalité. För min del inser jag att det är till fördel att tänka på exempelvis namngivning när jag programmerar på egen hand. I de fall då jag återvänder till ett projekt, efter en lång tids uppehåll, sparar jag mycket tid om jag tidigare har jobbat aktivt med kodkvalitén. Då blir det lättare att ta till sig kodens innehåll på nytt och fortsätta där jag slutade. Slutsatsen är därför att både programmeraren själv och andra som tar del av koden gynnas av arbetet för kodkvalité.   

