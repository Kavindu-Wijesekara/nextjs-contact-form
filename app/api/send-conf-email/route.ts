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
      // react: ConfirmationEmail(formData.fullName),
      html: ConfirmationMailTemplate(formData.fullName),
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

const ConfirmationMailTemplate = (
  fullName: string,
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
        <![endif]--><style type="text/css">@media only screen and (min-width:480px) {
        .mj-column-per-100 { width:100% !important; max-width: 100%; }
      }</style><style type="text/css">@media only screen and (max-width:480px) {
      table.full-width-mobile { width: 100% !important; }
      td.full-width-mobile { width: auto !important; }
    }</style></head><body style="background-color:#AA1BAA;"><div style="background-color:#AA1BAA;"><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="Margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"><tbody><tr><td style="background-color:#ffffff;border-radius:5px;vertical-align:top;padding:5px;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"><tbody><tr><td style="width:80px;"><img height="auto" src="https://i.ibb.co/S5XNMBv/aww-logo-clr.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;" width="80"></td></tr></tbody></table></td></tr><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:helvetica;font-size:20px;line-height:1;text-align:center;color:#AA1BAA;">Thank You for Registering with Us!</div></td></tr><tr><td style="font-size:0px;padding:10px 25px;word-break:break-word;"><p style="border-top:solid 1px #AA1BAA;font-size:1;margin:0px auto;width:100%;"></p><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #AA1BAA;font-size:1;margin:0px auto;width:540px;" role="presentation" width="540px" ><tr><td style="height:0;line-height:0;"> &nbsp;
</td></tr></table><![endif]--></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:helvetica;font-size:14px;line-height:1;text-align:left;color:#000000;">Hello ${fullName},</div></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:helvetica;font-size:14px;line-height:16px;text-align:left;color:#000000;">Thank you for submitting your partner registration form. We have received your information and will review it promptly. Your interest in partnering with us is greatly appreciated.</div></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:helvetica;font-size:14px;line-height:16px;text-align:left;color:#000000;">If you have any questions or require further assistance, please feel free to contact us at <a href="mailto:hello@auxanoww.com" color="#AA1BAA">hello@auxanoww.com</a>. We will be in touch as soon as we&apos;ve reviewed your submission.</div></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:helvetica;font-size:14px;line-height:16px;text-align:left;color:#000000;">Thank you for considering a partnership with us. We look forward to the opportunity of working together.<br><br>Best regards,<br><i>Team Auxano</i></div></td></tr><tr><td style="font-size:0px;padding:10px 25px;word-break:break-word;"><p style="border-top:solid 1px #AA1BAA;font-size:1;margin:0px auto;width:100%;"></p><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #AA1BAA;font-size:1;margin:0px auto;width:540px;" role="presentation" width="540px" ><tr><td style="height:0;line-height:0;"> &nbsp;
</td></tr></table><![endif]--></td></tr><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:helvetica;font-size:12px;line-height:1;text-align:center;color:#666666;">© 2023 Auxano Worldwide Ltd. 262 Kaduwela Rd, Koswatta, Battaramulla, SL 10120</div></td></tr></table></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></div></body></html>
`;