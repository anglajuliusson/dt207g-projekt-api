# Webbtjänst – SAVOR

## Beskrivning
Detta är webbtjänsten (backend) för projektet SAVOR.  
Tjänsten är skapad som ett **REST API** med stöd för **CRUD** (Create, Read, Update, Delete) och **JWT**-baserad autentisering.  
Webbtjänsten hanterar företagets data, som menyer, och levererar data i **JSON-format** till den publika webbplatsen.

---

## Funktioner
- CRUD-operationer för menyer, rätter och användare.  
- Autentisering med **JSON Web Tokens (JWT)**.  
- Datavalidering innan lagring i databasen.  
- Åtkomstskyddade endpoints för administratörer.  
- Returnerar data i **JSON-format** för konsumtion av frontend-applikationen.

---

## Använda tekniker
- **Node.js** med **Express**
- **Databas:** MongoDB
- **JWT (JSON Web Tokens)** för autentisering
- **dotenv** för miljövariabler
- **bcrypt** för lösenordshantering
- **cors** för kommunikation mellan frontend och backend

## Säkerhet
- Endast inloggade användare med giltig JWT-token får åtkomst till skyddade delar av API:et.
