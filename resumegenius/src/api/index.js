import { onSnapshot } from "firebase/firestore"

export const getUserDetail = () => {
    return new Promise((resolve,reject) => {
        const unsubscribe = auth.onAuthStateChanged((userCred) => {
            if(userCred) {
                const userData = userCred.provideData[0]

                console.log(userData)
            }

            else{
                reject(new Error("User is not authencticated"))
            }
        })
    })
}