import { TitleBlock } from "@/components/common/title-block";
// import { LeadForm } from "@/components/common/lead-form";
// import { discoveryCallBookingSource } from "@/app/config";
import { AnimatedArrowButton } from "@/components/ui/animated-arrow-button";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative h-[740px] w-full bg-[#ccd7db]">
      <Image
        fill
        alt="CRM Setup Services"
        src="/image/thumbnail/futuristic-office.png"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/80">
        <div className="container mx-auto flex h-full flex-col items-center justify-center gap-8">
          <div className="">
            <TitleBlock
              heading="Transform Your Business"
              title="ClinicOfAI&apos;s GoHighLevel CRM Setup Services"
              size="lg"
              className="max-w-[740px] text-white [&>h2]:text-white/60"
            />
            <p className="mx-auto max-w-[665px] text-center text-lg leading-7 text-white/70">
              In today&apos;s competitive landscape, effective customer relationship management (CRM) is crucial for success. 
              Let us help you implement GoHighLevel—a comprehensive, all-in-one CRM platform—tailored to your business needs.
            </p>
          </div>
          {/* <LeadForm
            source={discoveryCallBookingSource.bookingUrl}
            id={discoveryCallBookingSource.bookingId}
          >
          </LeadForm> */}
            <AnimatedArrowButton variant="secondary">
              Book Your Discovery Call
            </AnimatedArrowButton>
        </div>
      </div>
    </section>
  );
}
