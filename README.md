# CC_toDoList_backend

- możliwość odpalania aplikacji przez polecenie 'nodemon index.js'
- set cc4_jwtPrivateKey=klaudiakeyehh [klucz należy przypisać w cmd (następnie tam odpalić serwer) nie przez VS Code.]


### Zabezpieczenie router :
    - const auth = require('../middleware/auth'); - zaimportować middleware
    - router.post('/', **auth**, async (req, res) => {}) - następnie dodać auth do requesta który wymaga dostępu


### Wytyczne:
 1. Building RESTful API using Express
 2. Wykorzystanie MongoDB:
    - Użytkownik (login, hasło, lista rzeczy do zrobienia, status: zrobione/nie zrobione)
    - Prosta walidacja danych np. maila, itp.
    - Operacje CRUD 
 3. Dodawanie użytkowników
 4. Dodawanie/usuwanie rzeczy do zrobienia
 5. Modyfikacja rzeczy do zrobienia
 6. Pobieranie rzeczy do zrobienia dla danego użytkownika
 7. Autentykacja i autoryzacja (rejestracja i logowanie)
 8. Deploy na Heroku