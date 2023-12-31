import admin from 'firebase-admin'

interface FirebaseAdminAppParams {
    projectId: string,
    privateKey: string,
    clientEmail: string,
    storageBucket: string,
}

function formatPrivateKey(key: string) {
    return key.replace(/\\n/g, '\n')
}

export function createFirebaseAdminApp(params: FirebaseAdminAppParams) {
    const privateKey = formatPrivateKey(params.privateKey)

    if (admin.apps.length > 0) {
        return admin.app()
    }

    const cert = admin.credential.cert({
        projectId: params.projectId,
        clientEmail: params.clientEmail,
        privateKey
    })

    return admin.initializeApp({
        credential: cert,
        storageBucket: params.storageBucket,
        projectId: params.projectId
    })
}

export async function initAdmin() {
    const params = {
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
        privateKey: process.env.FIREBASE_PRIVATE_KEY as string,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
    }

    return createFirebaseAdminApp(params)
}