import ContactForm from '@/components/ContactForm'
import { JobApplication } from '@/components/JobApplication'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 lg:p-24">
      <JobApplication />
      {/* <ContactForm /> */}
    </main>

  )
}
