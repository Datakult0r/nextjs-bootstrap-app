import Image from "next/image";
import { Button } from "@/components/ui/button";
// import { InteractWithAssistant } from "@/components/InteractWithAssistant";

export function JoinLiveVideoChat() {
  return (
    <section className="px-4">
      <div className="relative mx-auto grid max-w-[1300px] grid-cols-1 grid-rows-1 overflow-hidden rounded-xl lg:grid-cols-12">
        <div className="z-10 space-y-3 px-4 py-[72px] sm:px-[40px] lg:col-span-7 lg:py-[100px] lg:pl-[56px]">
          <div className="relative w-fit rounded-full border-[4px] border-[#0691A6] p-3">
            <div className="relative h-[100px] w-[100px] overflow-hidden rounded-full">
              <Image
                fill
                src="/image/avatar/ava_realistic_photo.png"
                alt=""
                className="object-cover"
              />
            </div>
          </div>
          <h2 className="text-4xl leading-[48px] tracking-[-2px] text-white lg:text-[#0691A6]">
            Join AVA for a video chat to learn more about her capabilities and
            benefits.
          </h2>
          <p className="leading-6 text-black/50">
            Let her assist you with personalized recommendations, answer your
            questions in real-time, and provide insights into our services.
          </p>
        </div>

        <div className="z-10 w-full px-4 pb-[72px] sm:px-[40px] lg:col-span-5">
          <div className="relative hidden h-full w-full lg:block">
            <Image
              src="/image/facetime-background-mockup.png"
              alt=""
              width={450}
              height={919}
              className="absolute inset-0 -top-[350px] xl:-top-[470px]"
            />
            <div className="relative bottom-[-20rem] z-10 flex justify-center">
              {/* <InteractWithAssistant>
              </InteractWithAssistant> */}
                <Button className="w-fit rounded-full text-black">
                  Join Video Call
                </Button>
            </div>
          </div>

          {/* Only display on small screen */}
          <div className="lg:hidden">
              <Button className="w-fit rounded-full text-black">
                Join Video Call
              </Button>
            {/* <InteractWithAssistant>
            </InteractWithAssistant> */}
          </div>
        </div>

        <Image
          fill
          src="/image/background/spacial-background.png"
          alt=""
          className="object-fill"
        />
      </div>
    </section>
  );
}
