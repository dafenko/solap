//https://github.com/typicode/lowdb

import { Low, JSONFile } from 'lowdb'

const adapter = new JSONFile("/home/dafe/.solap/db.json")
const db = new Low(adapter)

export async function getAccountsBaseDir () {
    // Use JSON file for storage
    await db.read()
    db.data ||= { baseAccountDir: "" }
    return db.data.baseAccountDir;
}; 

// Create and query items using plain JS
//db.data.posts.push('hello world')
//const firstPost = db.data.posts[0]

// Alternatively, you can also use this syntax if you prefer
//const { posts } = db.data
//posts.push('hello world')

// Finally write db.data content to file
//await db.write()