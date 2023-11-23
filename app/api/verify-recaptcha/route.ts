import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge';

export async function POST(request: NextRequest) {
    const recaptcha = await request.json()

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;


    try {
        const recaptchaResponse = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptcha}`,
            {
                method: "POST",
            },
        );
        const recaptchaResponseJson = await recaptchaResponse.json();
        if (recaptchaResponse.ok) {
            return NextResponse.json({ message: "Captcha verification successful." }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Captcha verification failed. Please try again." }, { status: 500 });
        }
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: "Something went wrong. Please try again later." }, { status: 500 });
    }
}