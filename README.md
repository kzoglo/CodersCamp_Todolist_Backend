# CC_toDoList_backend

### set cc4_jwtPrivateKey=klaudiakeyehh -- serwer należy odpalić przez cmd (następnie tam odpalić serwer) nie przez VS Code.


### Zabezpieczenie router :
    - const auth = require('../middleware/auth'); - zaimportować middleware
    - router.post('/', **auth**, async (req, res) => {}) - następnie dodać auth do requesta który wymaga dostępu