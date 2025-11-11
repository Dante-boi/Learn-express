import fs from 'fs/promises'
import path from 'path'

const DATA_FILE = 'data.json'

export const loadData = async () => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        // Om filen inte finns, returnera tom data
        return { users: [] }
    }
}

export const saveData = async (data) => {
    try {
        await fs.writeFile(
            DATA_FILE,
            JSON.stringify(data, null, 2)
        )
        return true
    } catch (error) {
        console.error('Kunde inte spara data:', error)
        return false
    }
}

// Exempel på använding i app.mjs:
// const data = await loadData()
// users = data.users || []
//
// Efter varje användning:
// await saveData({ users })