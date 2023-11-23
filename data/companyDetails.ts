import { BsFacebook, BsWhatsapp, BsInstagram, BsLinkedin, BsYoutube, BsTiktok } from 'react-icons/bs'
import { FaXTwitter } from 'react-icons/fa6';

export const socialMediaLinks = [
    {
        _id: 1,
        title: 'Facebook',
        url: 'https://www.facebook.com/auxanoww',
        ariaLabel: "Visit our Facebook page",
        icon: BsFacebook,
    },
    {
        _id: 2,
        title: 'Twitter',
        url: 'https://twitter.com/',
        ariaLabel: "Visit our Twitter page",
        icon: FaXTwitter,
    },
    {
        _id: 3,
        title: 'Instagram',
        url: 'https://instagram.com/auxanoww',
        ariaLabel: "Visit our Instagram page",
        icon: BsInstagram,
    },
    {
        _id: 4,
        title: 'Linkedin',
        url: 'https://www.linkedin.com/company/auxanoww/',
        ariaLabel: "Visit our Linkedin profile",
        icon: BsLinkedin,
    },
    {
        _id: 5,
        title: 'Youtube',
        url: 'https://www.youtube.com/',
        ariaLabel: "Visit our Youtube channel",
        icon: BsYoutube,
    },
    {
        _id: 6,
        title: 'Whatsapp',
        url: 'https://api.whatsapp.com/send?phone=',
        ariaLabel: "Contact us on Whatsapp",
        icon: BsWhatsapp,
    },
    {
        _id: 7,
        title: 'Tiktok',
        url: 'https://www.tiktok.com/@auxanoww',
        ariaLabel: "Visit our Tiktok page",
        icon: BsTiktok,
    }
]