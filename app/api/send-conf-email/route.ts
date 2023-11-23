import { ConfirmationEmail } from "../../../components/emails/ConfirmationEmail";
import { RegistrationDetailsEmail } from "../../../components/emails/RegistrationDetailsEmail";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
    console.time("confirmationMail");

    try {
        const formData = await request.json()

        const resend = new Resend(process.env.RESEND_API_KEY);

        const responseConfirmation = await resend.emails.send({
            from: `Auxano Worldwide <${process.env.EMAIL_USER}>`,
            reply_to: 'hello@auxanoww.com',
            to: formData.email, // Send the confirmation email to the user who submitted the form
            subject: `Partner Registration Submission Confirmation`,
            react: ConfirmationEmail(formData.fullName),
        })

        console.log('Confirmation email response:', responseConfirmation);
        if (responseConfirmation.data != null) {
            console.timeEnd("confirmationMail");
            return NextResponse.json({ message: "Form submitted successfully." }, { status: 200 })
        } else {
            console.timeEnd("confirmationMail");
            return NextResponse.json({ message: "Somthing went wrong. Please try again later." }, { status: 500 })
        }
    } catch (error) {
        return NextResponse.json({ error: "Error sending email" }, { status: 500 })
    }

}

const registartionMailTemplate = (
    companyName: string,
    companyRegistrationNumber: string,
    businessType: string,
    address: string,
    city: string,
    state: string,
    country: string,
    postalCode: string,
    brc: any,
    ids: any,
    form120: any,
    tier: string,
    forcusedProducts: string[],
    fullName: string,
    email: string,
    phone: string,
    message: string,
    salesName: string | '',
    salesEmail: string | '',
    salesPhone: string | '',
    techName: string | '',
    techEmail: string | '',
    techPhone: string | '',
    billingName: string | '',
    billingEmail: string | '',
    billingPhone: string | ''
) => `
<html lang="en">
  <body style="width:100%">
    <h1 style="font-size: 18px;">
      Partner Registration - ${companyName}
    </h1>
    <table border="1" cellpadding="5" style="border-collapse: collapse; width: 100%;">
      <tr style="background-color: #6666;">
        <th colspan="2">Company Info</th>
      </tr>
      <tr>
        <th style="text-align: left; ">
          Company Name
        </th>
        <td style="">${companyName}</td>
      </tr>
      <tr>
        <th style="text-align: left; ">
          Business Registration No
        </th>
        <td style="">${companyRegistrationNumber}</td>
      </tr>
      <tr>
        <th style="text-align: left; ">
          Business Type
        </th>
        <td style="">${businessType}</td>
      </tr>
      <tr>
        <th style="text-align: left; ">Address</th>
        <td style="">${address}</td>
      </tr>
      <tr>
        <th style="text-align: left; ">City</th>
        <td style="">${city}</td>
      </tr>
      <tr>
        <th style="text-align: left; ">
          State/Province
        </th>
        <td style="">${state}</td>
      </tr>
      <tr>
        <th style="text-align: left; ">Country</th>
        <td style="">${country}</td>
      </tr>
      <tr>
        <th style="text-align: left; ">
          Postal Code
        </th>
        <td style="">${postalCode}</td>
      </tr>
      <tr>
        <th style="text-align: left; ">Tier</th>
        <td style="">${tier}</td>
      </tr>
      <tr>
        <th style="text-align: left; ">
          Forcused Product/s
        </th>
        <td style="">
          <ul style="list-style: none; padding: 0; padding: 0;">
            ${forcusedProducts.map(product => `
            <li style="padding-bottom: 5px;">${product}</li>
            `).join('')}
          </ul>
        </td>
      </tr>
      <tr>
        <th style="text-align: left; ">Business Registration File</th>
        <td style=""><a href="${brc}" target="_blank">Download</a></td>
      </tr>
      <tr>
        <th style="text-align: left; ">Id Copies File</th>
        <td style=""><a href="${ids}" target="_blank">Download</a></td>
      </tr>
      ${form120 !== "" ?
        `
        <tr>
        <th style="text-align: left; ">Form 1/20 File</th>
        <td style=""><a href="${form120}" target="_blank">Download</a></td>
      </tr>` : ''
    }
      <tr style="background-color: #6666;">
        <th colspan="2">
          Applicant Information
        </th>
      </tr>
      <tr>
        <th style="text-align: left; ">Full Name</th>
        <td style="">${fullName}</td>
      </tr>
      <tr>
        <th style="text-align: left; ">Email</th>
        <td style="">${email}</td>
      </tr>
      <tr>
        <th style="text-align: left; ">Phone</th>
        <td style="">${phone}</td>
      </tr>
      <tr>
        <th style="text-align: left; ">Remarks</th>
        <td style="">${message}</td>
      </tr>
      ${(salesName || salesEmail || salesPhone) &&
    `
        <tr style="background-color: #6666;">
        <th colspan="2">
          Sales/Marketing Contact Information
        </th>
      </tr>
      <tr>
            <th style="text-align: left; ">Name</th>
            <td style="">${salesName}</td>
        </tr>
        <tr>
            <th style="text-align: left; ">Email</th>
            <td style="">${salesEmail}</td>
        </tr>
        <tr>
            <th style="text-align: left; ">Phone</th>
            <td style="">${salesPhone}</td>
        </tr>
        `
    }
    ${(techName || techEmail || techPhone) &&
    `
        <tr style="background-color: #6666;">
        <th colspan="2">
          Technical Contact Information
        </th>
      </tr>
      <tr>
            <th style="text-align: left; ">Name</th>
            <td style="">${techName}</td>
        </tr>
        <tr>
            <th style="text-align: left; ">Email</th>
            <td style="">${techEmail}</td>
        </tr>
        <tr>
            <th style="text-align: left; ">Phone</th>
            <td style="">${techPhone}</td>
        </tr>
        `
    }
      ${(billingName || billingEmail || billingPhone) &&
    `
        <tr style="background-color: #6666;">
        <th colspan="2">
          Billing Contact Information
        </th>
      </tr>
      <tr>
            <th style="text-align: left; ">Name</th>
            <td style="">${billingName}</td>
        </tr>
        <tr>
            <th style="text-align: left; ">Email</th>
            <td style="">${billingEmail}</td>
        </tr>
        <tr>
            <th style="text-align: left; ">Phone</th>
            <td style="">${billingPhone}</td>
        </tr>
        `
    }
    </table>
  </body>
</html>

`;