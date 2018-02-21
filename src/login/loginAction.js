import {
    isLogged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    createFirebaseCredential,
    signOut,
    passWordReset
} from '../firebaseActions'

export const user = () => {
    return new Promise((resolve, reject) => {
        isLogged().then((user) => {
            if (user) {
                resolve(user)
            } else { resolve() }
        })
    })
}

export const createUser = (email, password, name)  => {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(email, password, name).then((user) => {
            if (user) {
                resolve(user)
            } else { resolve() }
        })
    })
}
export const passwordResetMail = (email)  => {
    return new Promise((resolve, reject) => {
        passWordReset(email).then((action)=>{
            resolve(action)
        })
    })
}

export const signInUser = (email, password)  => {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(email, password).then((user) => {
            if (user) {
                resolve(user)
            } else { resolve() }
        })
    })
}

export const facebookLogin = (token)  => {
    return new Promise((resolve, reject) => {
        createFirebaseCredential(token).then(user => {
            if (user) {
                resolve(user)
            } else { resolve() }
        })
    })
}

export const signOutFromFirebase = (dispatch) => {
    return new Promise((resolve, reject) => {
        signOut().then(() => {
            resolve('ok')
        })
    })
}
