import { collection, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db, storage } from "./firebaseConfig";
import { deleteObject, getDownloadURL, listAll, ref, uploadBytesResumable } from "firebase/storage";

export async function checkDocumentExists(companyRegistrationNumber: string) {
    const docRef = doc(collection(db, "partners"), companyRegistrationNumber)

    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        return true
    } else {
        return false
    }
}

export async function addData(formData: any) {
    const { companyRegistrationNumber } = formData
    const modifiedCompanyRegistrationNumber = companyRegistrationNumber.replace("/", "_")

    try {
        const docRef = doc(collection(db, "partners"), modifiedCompanyRegistrationNumber)
        await setDoc(docRef, formData)
        console.log("Document written with ID: ", docRef.id)
        return docRef.id
    } catch (e) {
        console.error("Error adding document: ", e)
        return false
    }
}

export async function uploadFile(file: any, fileName: string, companyRegistrationNumber: string) {
    const storageRef = ref(storage, `partners/${companyRegistrationNumber}/${fileName}`)

    try {
        const uploadTask = await uploadBytesResumable(storageRef, file)
        return getDownloadURL(uploadTask.ref)
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function deleteDocumentAndFolder(docId: string) {
    try {
        // Delete document from Firestore
        await deleteDoc(doc(db, "partners", docId));

        // Delete folder from Storage
        const storageRef = ref(storage, `partners/${docId}`);
        const filesInFolder = await listAll(storageRef);

        const deleteFilePromises = filesInFolder.items.map((fileRef) => deleteObject(fileRef));

        await Promise.all(deleteFilePromises);

        console.log("Document and folder deleted successfully");
        return true;
    } catch (error) {
        console.error("Error deleting document and folder:", error);
        return false;
    }
}