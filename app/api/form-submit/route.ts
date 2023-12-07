import FormSubmit from "@/defer/formSubmit";
import { getExecution } from "@defer/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const formData = await request.json()
    const resp = await FormSubmit(formData)
    return NextResponse.json(resp)
}

// export async function GET(request: NextRequest) {
//     const id = await request.json()
//     const ret = await getExecution(id)
//     console.log("GET:", ret);
//     return NextResponse.json(ret)
// }