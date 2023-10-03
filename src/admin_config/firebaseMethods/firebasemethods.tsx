import { app } from "./firebaseconfig"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, onValue, push, ref, set } from "firebase/database";

const auth = getAuth(app)
const db = getDatabase(app)

export const FbSignup = (body: any) => {
    return new Promise<any>((resolve, reject) => {
        if (!body.email || !body.password) {
            reject('Your email and password is required')
        }
        else {
            createUserWithEmailAndPassword(auth, body.email, body.password)
                .then((res) => {
                    const id = res.user.uid
                    body.id = id
                    resolve(res)
                    const reference = ref(db, `users/${id}`)
                    set(reference, body)
                        .then(user => {
                            resolve('user created successfully')
                        })
                        .catch(error => {
                            reject(error)
                        })
                })
                .catch((err) => {
                    reject(err)
                })

        }
    })
}
export const FbLogin = (body: any) => {
    return new Promise<any>((resolve, reject) => {
        if (!body.email || !body.password) {
            reject('Your email and password is required')
        }
        else {
            signInWithEmailAndPassword(auth, body.email, body.password)
                .then((res) => {
                    const id = res.user.uid
                    body.id = id
                    const reference = ref(db, `users/${id}`)
                    onValue(reference, (data) => {
                        if (data.exists()) {
                            resolve(data.val())
                            console.log(data.val)
                        }
                        else {
                            reject('Your Email or Password is Incorrect')
                        }
                    })
                })
                .catch((err) => {
                    reject('Your Email or Password is invalid')
                })

        }
    })
}
export const FbAuth = () => {
    return new Promise<any>((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                resolve(uid)
                // ...
            } else {
                // User is signed out
                // ...
                reject('No User is Logged in')
            }
        });
    })
}
export const FBLogout = () => {
    return new Promise<any>((resolve, reject) => {   
        signOut(auth)
        .then(res => resolve('user deleted'))
        .catch(err => reject(err))
    })
}
export const FBAdd = (nodeNames: string, body: any, id?: string) => {
    return new Promise<any>((resolve, reject) => {
        const TaskId = push(ref(db, `${nodeNames}/`)).key
        body.id = TaskId
        const reference = ref(db, `${nodeNames}/ ${body.id}`)
        set(reference, body)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export const FBGet = (nodeNames:string , id?:any ) => {
    return new Promise<any>((resolve, reject) => {
        const reference = ref(db,`${nodeNames}/${id?id:''}`)
        onValue(reference , (data) => {
            if(data.exists()){
                resolve(Object.values(data.val()))
            }
            else{
                reject('Data Not Found')
            }
        })
    })
}