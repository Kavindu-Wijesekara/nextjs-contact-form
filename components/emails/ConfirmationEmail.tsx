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

export const ConfirmationEmail = (fullName: string) => {

    return (
        <Html>
            <Head />
            <Preview>Thank You for Registering with Us!</Preview>
            <Tailwind>
                <Body className="bg-[#AA1BAA] my-auto mx-auto font-sans">
                    <Container className="border border-solid bg-white border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
                        <Section className="mt-[32px] flex justify-center items-center">
                            <Img
                                src='https://i.ibb.co/S5XNMBv/aww-logo-clr.png'
                                width="80"
                                height="80"
                                alt="Auxano logo"
                            />
                        </Section>
                        <Heading className="text-[#AA1BAA] text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                            Thank You for Registering with Us!
                        </Heading>
                        <Text className="text-black text-[14px] leading-[24px]">
                            Hello {fullName},
                        </Text>
                        <Text className="text-black text-[14px] leading-[24px]">
                            Thank you for submitting your partner registration form. We have received
                            your information and will review it promptly. Your interest in partnering
                            with us is greatly appreciated.
                        </Text>
                        <Text className="text-black text-[14px] leading-[24px]">
                            If you have any questions or require further assistance, please feel free to contact us at{' '}
                            <Link
                                href="mailto:hello@auxanoww.com"
                                className="text-blue-600 no-underline"
                            >
                                hello@auxanoww.com
                            </Link>.{' '}
                            We will be in touch as soon as we&apos;ve reviewed your submission.
                        </Text>
                        <Text className="text-black text-[14px] leading-[24px]">
                            Thank you for considering a partnership with us. We look forward to the opportunity of working together.
                        </Text>
                        <Text className="text-black text-[14px] leading-[24px]">
                            Best regards,
                            <br />
                            Team Auxano
                        </Text>
                        <Hr className="border border-solid border-[#AA1BAA] my-[26px] mx-0 w-full" />
                        <Text className="text-[#666666] text-[12px] leading-[8px] text-center">
                            © 2023 Auxano Worldwide, All Rights Reserved
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default ConfirmationEmail;