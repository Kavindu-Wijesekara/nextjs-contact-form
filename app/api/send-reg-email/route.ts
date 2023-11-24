import { cleanAndUppercase } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  console.time("registrationMail");

  try {
    const formData = await request.json()
    const modifiedRegistrationNumber = cleanAndUppercase(formData.companyRegistrationNumber)

    const resend = new Resend(process.env.RESEND_API_KEY);

    const attachments = [
      {
        filename: `${modifiedRegistrationNumber}_BRC.pdf`,
        path: formData.brc,
      },
      {
        filename: `${modifiedRegistrationNumber}_IDs.pdf`,
        path: formData.ids,
      },
    ];

    if (formData.form120) {
      attachments.push({
        filename: `${modifiedRegistrationNumber}_Form120.pdf`,
        path: formData.form120,
      });
    }

    const responseRegister = await resend.emails.send({
      from: `Partner Registration Submission <${process.env.EMAIL_USER}>`,
      to: 'kavindu@indexone.tech',
      subject: `New Partner Registration Submission - ${formData.companyName}`,
      // react: RegistrationDetailsEmail(formData),
      html: registartionMailTemplate(
        formData.companyName,
        formData.companyRegistrationNumber,
        formData.businessType,
        formData.address,
        formData.city,
        formData.state,
        formData.country,
        formData.postalCode,
        formData.brc,
        formData.ids,
        formData.form120,
        formData.tier,
        formData.forcusedProducts,
        formData.fullName,
        formData.email,
        formData.phone,
        formData.message,
        formData.salesName,
        formData.salesEmail,
        formData.salesPhone,
        formData.techName,
        formData.techEmail,
        formData.techPhone,
        formData.billingName,
        formData.billingEmail,
        formData.billingPhone,
      )
    });


    console.log('Registration email response:', responseRegister);
    if (responseRegister.data != null) {
      console.timeEnd("registrationMail");
      return NextResponse.json({ message: "Form submitted successfully." }, { status: 200 })
    } else {
      console.timeEnd("registrationMail");
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
<!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title></title><!--[if !mso]><!-- --><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style type="text/css">#outlook a { padding:0; }
          .ReadMsgBody { width:100%; }
          .ExternalClass { width:100%; }
          .ExternalClass * { line-height:100%; }
          body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
          table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
          img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
          p { display:block;margin:13px 0; }</style><!--[if !mso]><!--><style type="text/css">@media only screen and (max-width:480px) {
            @-ms-viewport { width:320px; }
            @viewport { width:320px; }
          }</style><!--<![endif]--><!--[if mso]>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]--><!--[if lte mso 11]>
        <style type="text/css">
          .outlook-group-fix { width:100% !important; }
        </style>
        <![endif]--><!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css"><style type="text/css">@import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);</style><!--<![endif]--><style type="text/css">@media only screen and (min-width:480px) {
        .mj-column-per-100 { width:100% !important; max-width: 100%; }
      }</style><style type="text/css"></style></head><body style="background-color:#ffffff;"><div style="background-color:#ffffff;"><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="Margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:helvetica;font-size:20px;line-height:1;text-align:center;color:#000000;">Partner Registration - ${companyName}</div></td></tr><!-- Company details --><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><table cellpadding="0" cellspacing="0" width="100%" border="0" style="cellspacing:0;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;table-layout:auto;width:100%;"><tr style="border-bottom:1px solid #666;text-align:left;padding:15px 0;"><th colspan="2" style="padding: 0 15px 0 0;font-size: 16px;" align="center">Company Details</th></tr><tr style="border-bottom:1px solid #666;"><td style="padding: 0 15px 0 0; font-weight:500;">Company Name</td><td style="padding: 0 15px;">${companyName}</td></tr><tr style="border-bottom:1px solid #666;"><td style="padding: 0 15px 0 0;font-weight:500;">Business Registration No</td><td style="padding: 0 15px;">${companyRegistrationNumber}</td></tr><tr style="border-bottom:1px solid #666;"><td style="padding: 0 15px 0 0;font-weight:500;">Business Type</td><td style="padding: 0 15px;">${businessType}</td></tr><tr style="border-bottom:1px solid #666;"><td style="padding: 0 15px 0 0;font-weight:500;">Address</td><td style="padding: 0 15px;">${address}</td></tr><tr style="border-bottom:1px solid #666;"><td style="padding: 0 15px 0 0;font-weight:500;">City</td><td style="padding: 0 15px;">${city}</td></tr><tr style="border-bottom:1px solid #666;"><td style="padding: 0 15px 0 0;font-weight:500;">State/Province</td><td style="padding: 0 15px;">${state}</td></tr><tr style="border-bottom:1px solid #666;"><td style="padding: 0 15px 0 0;font-weight:500;">Country</td><td style="padding: 0 15px;">${country}</td></tr><tr style="border-bottom:1px solid #666;"><td style="padding: 0 15px 0 0;font-weight:500;">Postal Code</td><td style="padding: 0 15px;">${postalCode}</td></tr><tr style="border-bottom:1px solid #666;"><td style="padding: 0 15px 0 0;font-weight:500;">Tier</td><td style="padding: 0 15px;">${tier}</td></tr><tr style="border-bottom:1px solid #666;"><td style="padding: 0 15px 0 0;font-weight:500;">Forcused Product/s</td><td style="padding: 0;"><ul>${forcusedProducts.map(product => `<li>${product}</li>`).join('')}</ul></td></tr><tr style="border-bottom:1px solid #666;"><td style="padding: 0 15px 0 0;font-weight:500;">Business Registration File</td><td style="padding: 0 15px;"><a href="${brc}" target="_blank">Download BR</a></td></tr><tr style="border-bottom:1px solid #666;"><td style="padding: 0 15px 0 0;font-weight:500;">Id Copies File</td><td style="padding: 0 15px;"><a href="${ids}" target="_blank">Download Ids</a></td></tr>${form120 !== "" ? `<tr style="border-bottom:1px solid #666;"><td style="padding: 0 15px 0 0;font-weight:500;">Form 1/20 File</td><td style="padding: 0 15px;"><a href="${form120}" target="_blank">Download Form1/20</a></td></tr>` : ''}</table></td></tr><!-- Applicant details --><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><table cellpadding="0" cellspacing="0" width="100%" border="0" style="cellspacing:0;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;table-layout:auto;width:100%;"><tr style="border-bottom:1px solid #666;text-align:left;padding:15px 0;"><th colspan="2" style="padding: 0 15px 0 0;font-size: 16px;" align="center">Applicant Contact Details</th></tr><tr style="border-bottom:1px solid #666;"><td style="padding: 0 15px 0 0; font-weight:500;">Full Name</td><td style="padding: 0 15px;">${fullName}</td></tr><tr style="border-bottom:1px solid #666;"><td style="padding: 0 15px 0 0;font-weight:500;">Email</td><td style="padding: 0 15px;">${email}</td></tr><tr style="border-bottom:1px solid #666;"><td style="padding: 0 15px 0 0;font-weight:500;">Phone</td><td style="padding: 0 15px;">${phone}</td></tr><tr style="border-bottom:1px solid #666;"><td style="padding: 0 15px 0 0;font-weight:500;">Remarks</td><td style="padding: 0 15px;">${message}</td></tr></table></td></tr><!-- Sales details --><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><table cellpadding="0" cellspacing="0" width="100%" border="0" style="cellspacing:0;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;table-layout:auto;width:100%;"><tr style="border-bottom:1px solid #666;text-align:left;padding:15px 0;"><th colspan="2" style="padding: 0 15px 0 0;font-size: 16px;" align="center">Sales/Marketing Contact Details</th></tr><tr style="border-bottom:1px solid #666;"><td style="padding: 0 15px 0 0; font-weight:500;">Full Name</td><td style="padding: 0 15px;">${salesName}</td></tr><tr style="border-bottom:1px solid #666;"><td style="padding: 0 15px 0 0;font-weight:500;">Email</td><td style="padding: 0 15px;">${salesEmail}</td></tr><tr style="border-bottom:1px solid #666;"><td style="padding: 0 15px 0 0;font-weight:500;">Phone</td><td style="padding: 0 15px;">${salesPhone}</td></tr></table></td></tr><!-- Technical details --><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><table cellpadding="0" cellspacing="0" width="100%" border="0" style="cellspacing:0;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;table-layout:auto;width:100%;"><tr style="border-bottom:1px solid #666;text-align:left;padding:15px 0;"><th colspan="2" style="padding: 0 15px 0 0;font-size: 16px;" align="center">Technical Contact Details</th></tr><tr style="border-bottom:1px solid #666;"><td style="padding: 0 15px 0 0; font-weight:500;">Full Name</td><td style="padding: 0 15px;">${techName}</td></tr><tr style="border-bottom:1px solid #666;"><td style="padding: 0 15px 0 0;font-weight:500;">Email</td><td style="padding: 0 15px;">${techEmail}</td></tr><tr style="border-bottom:1px solid #666;"><td style="padding: 0 15px 0 0;font-weight:500;">Phone</td><td style="padding: 0 15px;">${techPhone}</td></tr></table></td></tr><!-- Billing details --><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><table cellpadding="0" cellspacing="0" width="100%" border="0" style="cellspacing:0;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;table-layout:auto;width:100%;"><tr style="border-bottom:1px solid #666;text-align:left;padding:15px 0;"><th colspan="2" style="padding: 0 15px 0 0;font-size: 16px;" align="center">Billing Contact Details</th></tr><tr style="border-bottom:1px solid #666;"><td style="padding: 0 15px 0 0; font-weight:500;">Full Name</td><td style="padding: 0 15px;">${billingName}</td></tr><tr style="border-bottom:1px solid #666;"><td style="padding: 0 15px 0 0;font-weight:500;">Email</td><td style="padding: 0 15px;">${billingEmail}</td></tr><tr style="border-bottom:1px solid #666;"><td style="padding: 0 15px 0 0;font-weight:500;">Phone</td><td style="padding: 0 15px;">${billingPhone}</td></tr></table></td></tr></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></div></body></html>
`;