// import { IntroTitle } from "@/components/IntroTitle";
// import { LeadForm } from "@/components/common/lead-form";
// import { discoveryCallBookingSource } from "@/app/config";
import { AnimatedArrowButton } from "@/components/ui/animated-arrow-button";

export function CallToActionSection() {
  return (
    <section className="bg-primary py-24">
      {/* <div className="container">
        <IntroTitle
          heading="Book a Discovery Call Today"
          title="Ready to revolutionize your customer relationship management?"
          size="lg"
          className="mb-8 text-center text-white [&>h2]:text-white/60"
        />
        <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-white/70">
          Schedule a free discovery call with ClinicOfAI to explore how our GoHighLevel CRM setup services can be tailored to your business needs. Let us help you build stronger customer relationships and achieve your business goals.
        </p>
        <div className="flex justify-center">
          <LeadForm
            source={discoveryCallBookingSource.bookingUrl}
            id={discoveryCallBookingSource.bookingId}
          >
            <AnimatedArrowButton variant="secondary">
              Book Your Discovery Call Now
            </AnimatedArrowButton>
          </LeadForm>
        </div>
        <p className="mt-8 text-center text-sm text-white/50">
          Note: GoHighLevel is a robust platform that can be customized to fit various industries and business models. Our team ensures that the setup aligns perfectly with your specific requirements.
        </p>
      </div> */}
    </section>
  );
}
