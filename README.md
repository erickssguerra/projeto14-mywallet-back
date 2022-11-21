# MyWallet project Details

## API address
----------------------------------------------
https://mywallet-api-srvi.onrender.com/
## Routes
----------------------------------------------
###  "/sign-up" object format
req.body: `{
    name" "...",
    email: "...",
    password: "..."
}`

###  "/sign-in" object format
req.body: `{
    email: "...",
    password: "..."
}`
res: `{
    token,
    name
}`
###  "/transaction" object format
req.headers: 
`{ 
    authorization: Bearer token 
}`
req.body:
`{
    email: "...",
    type: "...",
    price: "...",
    description: "...",
    day: "..." 
}`
