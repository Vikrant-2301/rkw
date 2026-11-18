import type { Metadata } from 'next';
import ContactExperience from '@/components/contact';

export const metadata: Metadata = {
  title: 'Contact Us & Visit Units | Ramesh Kolhu Wale',
  description: 'Visit our 4 live cold-press Units in Delhi NCR or contact us via WhatsApp (+91 9217744380) for fresh cold-pressed oils and pure Bilona Ghee.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return <ContactExperience />;
}
