import { deleteDocumentAndFolder } from "@/firebase/firebaseClientFunctions";
import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge';

export async function DELETE(request: NextRequest) {
    const docId = await request.json();

    try {
        // Delete document from Firestore
        const deleteData = await deleteDocumentAndFolder(docId);
        return NextResponse.json({ message: "Document and folder deleted successfully" });
    } catch (error) {
        console.error("Error deleting document and folder:", error);
        return NextResponse.json({ error: "Error deleting document and folder" });
    }
}