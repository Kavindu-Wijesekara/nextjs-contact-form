import { getExecution } from "@defer/client"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    console.log(params.id);
    const ret = await getExecution(params.id)
    console.log("getExecution:", ret);
    return NextResponse.json(ret)
}