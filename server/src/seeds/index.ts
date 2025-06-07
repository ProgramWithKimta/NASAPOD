import db from '../config/connection.js'
import { User } from '../models/index.js'

console.log("-----DELETING USERS-----")
await User.deleteMany();
console.log("-----USERS DELETED-----")

console.log("-----INSERTING USERS-----")
const alice = new User({
    username: "alice",
    password: "AliceBob!25"
})
const bob = new User({
    username: "bob",
    password: "BobAlice!25"
})
await alice.save()
await bob.save()
console.log("-----USERS INSERTED-----")

db.close();