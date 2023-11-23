import { addData } from "@/firebase/firebaseClientFunctions";
import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge';

export async function POST(request: NextRequest) {
    const {
        companyName,
        companyRegistrationNumber,
        businessType,
        address,
        city,
        state,
        country,
        postalCode,
        brc,
        ids,
        form120,
        tier,
        forcusedProducts,
        fullName,
        email,
        phone,
        message,
        salesName,
        salesEmail,
        salesPhone,
        techName,
        techEmail,
        techPhone,
        billingName,
        billingEmail,
        billingPhone,
    } = await request.json()

    const formData = {
        companyName,
        companyRegistrationNumber,
        businessType,
        address,
        city,
        state,
        country,
        postalCode,
        brc,
        ids,
        form120,
        tier,
        forcusedProducts,
        fullName,
        email,
        phone,
        message,
        salesName,
        salesEmail,
        salesPhone,
        techName,
        techEmail,
        techPhone,
        billingName,
        billingEmail,
        billingPhone,
    };

    const docId = await addData(formData);
    if (docId) {
        return NextResponse.json({ message: "Data uploaded successfully", docId: docId }, { status: 200 });
    }
    else
        return NextResponse.json({ message: "Something went wrong. Please try again later." }, { status: 500 });
}