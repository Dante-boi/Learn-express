import express from 'express'

const app = express()

//Middleware för att hantera JSON
app.use(express.json())

//Enkel route för att testa servern
app.get('/', (req, res) => {
    res.json({ message: 'Välkommen till vår API!' })
})

export default app

//Simulerad databas
let users = [
    { id: 1, name: 'Anna', email: 'anna@example.com' },
    { id: 2, name: 'Erik', email: 'erik@example.com' },
    { id: 3, name: 'Maria', email: 'maria@example.com' }
]

//GET alla användare
app.get('/users', (req, res) => {
    res.json(users)
})

//GET en specifik användare med id
app.get('/users/:id', (req, res) => {
    const id = parseInt (req.params.id)
    const user = users.find(u => u.id === id)

    if (user) {
        res.json(user)
    } else {
        res.status(404).json({ error: 'Användare hittades inte' })
    }
})

//GET med query parameters
app.get('/search', (req, res) => {
    const { name } = req.query

    if (!name)  {
        return res.status(400).json({ error: 'Name parameter krävs' })
    }

    const filteredUsers = users.filter(u => 
        u.name.toLowerCase().includes(name.toLowerCase())
    )

    res.json(filteredUsers)
})

//POST - Skapa ny användare
app.post('/users', (req, res) => {
    const { name, email } = req.body

    // Validering
    if (!name || !email) {
        return res.status(400).json({
            error: 'Name och email krävs'
        })
    }

    // Kontrollera om email redan finns
    if (users.some(u => u.email === email)) {
        return res.status(409).json({
            error: 'Email finns redan'
        })
    }

    // Skapa ny användare
    const newUser = {
        id: users.length + 1,
        name,
        email
    }

    users.push(newUser)

    // Returnera skapad användare med status 201
    res.status(201).json(newUser)
})

// DELETE - Ta bort användare
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const userIndex = users.findIndex(u => u.id === id)

    if (userIndex === -1) {
        return res.status(404).json({
            error: 'Användare hittades inte'
        })
    }

    // Ta bort användaren
    const deletedUser = users.splice(userIndex, 1)[0]

    res.json({
        message: 'Användaren borttagen',
        user: deletedUser
    })
})

// DELETE alla användare (farlig operation!)
app.delete('/users', (req, res) => {
    // Kräv bekräftelse via query parameter
    const { confirm } = req.query
    
    if (confirm !== 'yes') {
        return res.status(400).json({
            error: 'Bekräftelse krävs. Lägg till ?confirm=yes'
        })
    }

    const count = users.length
    users = []

    res.json({
        message: `${count} användare borttagna`
    })
})

// PATCH - Delvis uppdatering
app.patch('/users/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const user = users.find(u => u.id === id)

    if (!user) {
        return res.status(404).json({
            error: 'Användare hittades inte'
        })
    }

    // Uppdatera endastde fält som skickats
    const updates = req.body
    
    // Validera att minst ett fält skickas
    if (Object.keys(updates).length === 0) {
        return res.status(400).json({
            error: 'Ingen data att uppdatera'
        })
    }

    // Uppdatera användaren
    if (updates.name !== undefined) user.name = updates.name
    if (updates.email !== undefined) {
        // Kontrollera unik email
        const emailExists = users.some(u =>
            u.id !== id && u.email === updates.email
        )
        if (emailExists) {
            return res.status(409).json({
                error: 'Email används redan'
            })
        }
    }

    res.json(user)
})

// PUT - Komplett ersättning
app.put('/users/:id', (req, res) => {
    const id = parseInt (req.params.id)
    const userIndex = users.findIndex(u => u.id === id)

    if (userIndex === -1) {
        return res.status(404).json({
            error: 'Användaren hittades inte'
        })
    }

    const { name, email } = req.body
    
    // Validering - alla fält krävs för PUT
    if (!name || !email ) {
        return res.status(400).json({
            error: 'Name och email krävs för PUT'
        })
    }

    // Ersätt användaren helt
    users[userIndex] = { id, name, email }

    res.json(uders[userIndex])
})