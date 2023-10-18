import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { firstName, lastName, company, email, phone, subject, message, recaptcha } = await request.json();
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;


  // Regular expressions for email and phone number formats
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phoneRegex = /^(\+\d{1,3})?(\d{10})$/; // Adjust the regex pattern as needed

  // Validate the input data
  if (!firstName || !lastName || !email || !subject || !message) {
    return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
  }

  if (!emailRegex.test(email)) {
    return NextResponse.json({ message: "Invalid email format." }, { status: 400 });
  }

  if (phone && !phoneRegex.test(phone)) {
    return NextResponse.json({ message: "Invalid phone number format." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL_USER,
      pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
    },
  });

  // Send the notification email to the US
  const inquiryMail = {
    from: `Inquiry Submission <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
    //TODO: Change the receiver
    to: "kavindu@indexone.tech",
    subject: `New Inquiry from ${firstName} ${lastName}`,
    html: `
                <p>Name: ${firstName} ${lastName}</p>
                <p>Company: ${company || "N/A"}</p>
                <p>Email: ${email}</p>
                <p>Phone: ${phone || "N/A"}</p>
                <p>Subject: ${subject}</p>
                <p>Message: ${message}</p>
            `
  }

  // Send a confirmation email to the user
  const confirmationMail = {
    from: `IndexOne Technologies <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
    to: email, // Send the confirmation email to the user who submitted the form
    subject: `Thank You for Contacting Us`,
    html: confirmationMailTemplate,
  };

  const recaptchaResponse = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptcha}`,
    {
      method: "POST",
    },
  );

  try {
    // Check if the recaptcha response is valid
    const recaptchaResponseJson = await recaptchaResponse.json();
    if (recaptchaResponseJson.success) {
      // Send the notification email to the US
      await transporter.sendMail(inquiryMail);
      await transporter.sendMail(confirmationMail);
      return NextResponse.json(
        { message: "Message sent successfully." },
        { status: 200 },
      );
    } else {
      console.log(recaptchaResponseJson);
      return NextResponse.json({ message: "Invalid reCAPTCHA." }, { status: 400 });
    }

  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}

const confirmationMailTemplate = `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Thank You for Contacting Us</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
        text-align: center;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        text-align: center;
      }
      header {
        border: #fb7009 solid 2px;
        color: #fff;
        padding: 10px;
        border-radius: 5px 5px 0 0;
      }
      main {
        padding: 20px;
        color: #333;
      }
      main a {
          text-decoration: none;
      }
      footer {
        background-color: #e9e9e9;
        color: #666666;
        padding: 10px;
        border-radius: 0 0 5px 5px;
        line-height: 5px;
        font-size: 0.7rem;
      }
      footer a {
        color: #fb7009;
        text-decoration: none;
        font-weight: bold;
      }
      footer a:hover {
        color: #666666;
        text-decoration: underline;
      }
      h1 {
        color: #fb7009;
      }
      .btn {
        display: inline-block;
        padding: 10px 20px;
        background-color: #fb7009;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
        margin-bottom: 20px;
      }
      .btn:hover {
        background-color: #ff8900;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <header>
        <h1>Thank You for Contacting Us!</h1>
      </header>
      <main>
        <p>
          We have received your message and will get back to you as soon as
          possible.
        </p>
        <p>In the meantime, feel free to explore more about our services:</p>
        <a href="https://indexone.tech/services" class="btn" target="_blank"
          >Discover More</a
        >
      </main>
      <footer>
        <p>IndexOne Technologies</p>
        <p>
          Contact us at:
          <a href="mailto:sales@indexone.tech">sales@indexone.tech</a>
        </p>
        <p>
          Call us at: <a href="tel:+94777177197">+94 77 7 177 197</a> or
          <a href="tel:+94117380480">+94 11 7 380 480</a>
        </p>
        <p>
          Your details are safe with us.
          <a href="https://indexone.tech/privacy-policy" target="_blank"
            >Learn More</a
          >
        </p>
      </footer>
    </div>
  </body>
</html>

`