//https://github.com/typicode/lowdb

import { Low, JSONFile } from 'lowdb'

const adapter = new JSONFile("/home/dafe/.solap/db.json")
const db = new Low(adapter)

export async function getAccountsBaseDir () {
    await db.read()
    db.data ||= { baseAccountDir: "" }
    return db.data.baseAccountDir;
}; 

export async function getActiveConnection () {
    await db.read()
    db.data ||= { activeConnection: -1 }
    return db.data.activeConnection;
}

// input: 
// index of the element in connections array (string)
// value to check (string)
export async function setActiveConnection (index, value) {
    await db.read()
    db.data.activeConnection = parseInt(index);
    db.write();
}

export async function getAvailableConnections () {
    await db.read()
    db.data ||= { availableConnections: [] }
    return db.data.availableConnections;
}

// Create and query items using plain JS
//db.data.posts.push('hello world')
//const firstPost = db.data.posts[0]

// Alternatively, you can also use this syntax if you prefer
//const { posts } = db.data
//posts.push('hello world')

// Finally write db.data content to file
//await db.write()