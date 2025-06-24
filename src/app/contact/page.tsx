import { ContactForm } from "./_components/contact-form";
import { ContactFormSection } from "./_components/contact-form-section";
import data from "./_data";

export default function Contact() {
  return (
    <>
      <ContactFormSection {...data.contactForm} form={<ContactForm />} />
    </>
  );
}
