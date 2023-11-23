import {
    Body,
    Button,
    Container,
    Column,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Tailwind,
    Text,
} from '@react-email/components';
import * as React from 'react';

export const RegistrationDetailsEmail = (formData: ApplicationFormData) => {

    return (
        <Html>
            <Head />
            <Preview>New Partner Registration Submission</Preview>
            <Tailwind>
                <Body className="bg-white mx-auto font-sans">
                    <Container className="mx-auto p-[20px] w-full">
                        <Heading className="text-black text-[24px] font-normal text-center p-0 my-[10px] mx-0">
                            Partner Registration Submission - {formData.companyName}
                        </Heading>
                        <Section className='w-full'>
                            <Heading as='h2' className="text-black text-[18px] font-semibold text-start p-0 mx-0">
                                Company Details
                            </Heading>
                            <ul className='list-disc'>
                                <li className="text-[14px]">
                                    Company Name: <span className="font-semibold">{formData.companyName}</span>
                                </li>
                                <li className="text-[14px]">
                                    Company Registration Number: <span className="font-semibold">{formData.companyRegistrationNumber}</span>
                                </li>
                                <li className="text-[14px]">
                                    Company Business Type: <span className="font-semibold">{formData.businessType}</span>
                                </li>
                                <li className="text-[14px]">
                                    Company Address: <span className="font-semibold">{formData.address}, {formData.city}, {formData.state}, {formData.postalCode}, {formData.country}</span>
                                </li>
                                <li className="text-[14px]">
                                    Tier: <span className="font-semibold">{formData.tier}</span>
                                </li>
                                <li className="text-[14px]">
                                    Forcused Product/s: <br />
                                    <ul>
                                        {formData.forcusedProducts.map((product, index) => (
                                            <li key={index} className="font-semibold">
                                                {product}
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            </ul>
                            <Heading as='h2' className="text-black text-[18px] font-semibold text-start p-0 mx-0">
                                Documents
                            </Heading>
                            <ul className='list-disc'>
                                <li className="text-[14px]">
                                    Business Registration: <a href={formData.brc}>Download BR</a>
                                </li>
                                <li className="text-[14px]">
                                    ID Copies: <a href={formData.ids}>Download IDs</a>
                                </li>
                                {
                                    formData.form120 &&
                                    <li className="text-[14px]">
                                        Form 1/20: <a href={formData.form120}>Download Form 1/20</a>
                                    </li>
                                }
                            </ul>
                            <Heading as='h2' className="text-black text-[18px] font-semibold text-start p-0 mx-0">
                                Applicant Details
                            </Heading>
                            <ul className='list-disc'>
                                <li className="text-[14px]">
                                    Applicant Name: <span className="font-semibold">{formData.fullName}</span>
                                </li>
                                <li className="text-[14px]">
                                    Applicant Email: <span className="font-semibold">{formData.email}</span>
                                </li>
                                <li className="text-[14px]">
                                    Applicant Phone: <span className="font-semibold">{formData.phone}</span>
                                </li>
                                <li className="text-[14px]">
                                    Remarks: <span className="font-semibold">{formData.message}</span>
                                </li>
                            </ul>
                            {
                                formData.salesName &&
                                <>
                                    <Heading as='h2' className="text-black text-[18px] font-semibold text-start p-0 mx-0">
                                        Sales / Marketing Details
                                    </Heading>
                                    <ul className='list-disc'>
                                        <li className="text-[14px]">
                                            Name: <span className="font-semibold">{formData.salesName}</span>
                                        </li>
                                        <li className="text-[14px]">
                                            Email: <span className="font-semibold">{formData.salesEmail}</span>
                                        </li>
                                        <li className="text-[14px]">
                                            Phone: <span className="font-semibold">{formData.salesPhone}</span>
                                        </li>
                                    </ul>
                                </>
                            }
                            {
                                formData.techName &&
                                <>
                                    <Heading className="text-black text-[18px] font-semibold text-start p-0 mx-0">
                                        Technical Details
                                    </Heading>
                                    <ul className='list-disc'>
                                        <li className="text-[14px]">
                                            Name: <span className="font-semibold">{formData.techName}</span>
                                        </li>
                                        <li className="text-[14px]">
                                            Email: <span className="font-semibold">{formData.techEmail}</span>
                                        </li>
                                        <li className="text-[14px]">
                                            Phone: <span className="font-semibold">{formData.techPhone}</span>
                                        </li>
                                    </ul>
                                </>
                            }
                            {
                                formData.billingName &&
                                <>
                                    <Heading className="text-black text-[18px] font-semibold text-start p-0 mx-0">
                                        Billing Details
                                    </Heading>
                                    <ul className='list-disc'>
                                        <li className="text-[14px]">
                                            Name: <span className="font-semibold">{formData.billingName}</span>
                                        </li>
                                        <li className="text-[14px]">
                                            Email: <span className="font-semibold">{formData.billingEmail}</span>
                                        </li>
                                        <li className="text-[14px]">
                                            Phone: <span className="font-semibold">{formData.billingPhone}</span>
                                        </li>
                                    </ul>
                                </>
                            }
                        </Section>
                        <Hr className="border border-solid bg-[#AA1BAA] border-[#AA1BAA] m-0 w-full" />
                        <Text className="text-[#666666] text-[12px] text-center m-0">
                            © 2023 Auxano Worldwide, All Rights Reserved
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default RegistrationDetailsEmail;