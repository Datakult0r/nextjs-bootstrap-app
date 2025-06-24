import { TestimonialSection } from "../_components/testimonial-section";
import { SolutionOverviewSection } from "../_components/solution-overview-section";
import { BenefitsSection } from "../_components/benefits-section";
import { HeroSection } from "../_components/hero-section/variant-c";
import { FeaturesSection } from "../_components/features-section";
import { HowItWorksSection } from "../_components/how-it-works-section";
import { CTASection } from "../_components/cta/variant-a";

import content from "./_data";

export default function CRMPage() {
  return (
    <>
      <HeroSection
        {...content.hero}
        connections={{
          base: <Icons.base />,
          nodes: [
            "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/67a5385385dd55e6ac6613d1.png",

            "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/67a538519769a790bf5a2bdc.png",
            "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/67a5383e5f27ac55cfd94c5e.png",
            "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/67a5383a9769a7af9c5a2bd0.png",
            "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/67a538389769a73dc65a2bce.png",
            <Icons.logoFive key="node-6" />,
            <Icons.logoOne key="node-7" />,
            <Icons.logoTwo key="node-8" />,
            <Icons.logoThre key="node-9" />,
            <Icons.logoFour key="node-10" />,
          ],
        }}
      />
      <SolutionOverviewSection {...content.solutionOverview} />
      <FeaturesSection />
      <HowItWorksSection {...content.howItWorks} />
      <BenefitsSection {...content.benefits} />
      <TestimonialSection {...content.testimonials} />
      <CTASection {...content.cta} />
    </>
  );
}

const Icons = {
  base: () => (
    <svg
      fill="none"
      height="48"
      viewBox="0 0 32 48"
      width="32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m18.6667 30.6667c7.3638 0 13.3333-5.9696 13.3333-13.3334 0-7.36376-5.9695-13.3333-13.3333-13.3333h-18.6667v26.6667z"
        fill="#ff692e"
      />
      <path d="m0 4 32 40h-21.3333l-10.6667-13.3333z" fill="#2e90fa" />
      <path
        d="m21.1488 30.436c-.8042.1515-1.6339.2307-2.4821.2307h-18.6667v-26.6667z"
        fill="#53b1fd"
      />
    </svg>
  ),
  logoOne: () => (
    <svg
      fill="none"
      height="48"
      viewBox="0 0 48 48"
      width="48"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <filter
        id="a"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
        height="54"
        width="48"
        x="0"
        y="-3"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend
          in="SourceGraphic"
          in2="BackgroundImageFix"
          mode="normal"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="-3" />
        <feGaussianBlur stdDeviation="1.5" />
        <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
        />
        <feBlend
          in2="shape"
          mode="normal"
          result="effect1_innerShadow_3051_46847"
        />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="3" />
        <feGaussianBlur stdDeviation="1.5" />
        <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0"
        />
        <feBlend
          in2="effect1_innerShadow_3051_46847"
          mode="normal"
          result="effect2_innerShadow_3051_46847"
        />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feMorphology
          in="SourceAlpha"
          operator="erode"
          radius="1"
          result="effect3_innerShadow_3051_46847"
        />
        <feOffset />
        <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.24 0"
        />
        <feBlend
          in2="effect2_innerShadow_3051_46847"
          mode="normal"
          result="effect3_innerShadow_3051_46847"
        />
      </filter>
      <filter
        id="b"
        color-interpolation-filters="sRGB"
        filterUnits="userSpaceOnUse"
        height="42"
        width="36"
        x="6"
        y="5.25"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feMorphology
          in="SourceAlpha"
          operator="erode"
          radius="1.5"
          result="effect1_dropShadow_3051_46847"
        />
        <feOffset dy="2.25" />
        <feGaussianBlur stdDeviation="2.25" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0.1 0"
        />
        <feBlend
          in2="BackgroundImageFix"
          mode="normal"
          result="effect1_dropShadow_3051_46847"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_3051_46847"
          mode="normal"
          result="shape"
        />
      </filter>
      <linearGradient
        id="c"
        gradientUnits="userSpaceOnUse"
        x1="24"
        x2="26"
        y1=".000001"
        y2="48"
      >
        <stop offset="0" stop-color="#fff" stop-opacity="0" />
        <stop offset="1" stop-color="#fff" stop-opacity=".12" />
      </linearGradient>
      <linearGradient id="d">
        <stop offset="0" stop-color="#fff" stop-opacity=".8" />
        <stop offset="1" stop-color="#fff" stop-opacity=".5" />
      </linearGradient>
      <linearGradient
        id="e"
        gradientUnits="userSpaceOnUse"
        x1="31.3081"
        x2="27.5474"
        xlinkHref="#d"
        y1="8.50673"
        y2="22.5418"
      />
      <linearGradient
        id="f"
        gradientUnits="userSpaceOnUse"
        x1="24.6947"
        x2="20.4639"
        xlinkHref="#d"
        y1="14.3909"
        y2="30.1804"
      />
      <linearGradient
        id="g"
        gradientUnits="userSpaceOnUse"
        x1="18.0814"
        x2="13.3805"
        xlinkHref="#d"
        y1="20.2751"
        y2="37.819"
      />
      <linearGradient
        id="h"
        gradientUnits="userSpaceOnUse"
        x1="24"
        x2="24"
        y1="0"
        y2="48"
      >
        <stop offset="0" stop-color="#fff" stop-opacity=".12" />
        <stop offset="1" stop-color="#fff" stop-opacity="0" />
      </linearGradient>
      <clipPath id="i">
        <rect height="48" rx="12" width="48" />
      </clipPath>
      <g filter="url(#a)">
        <g clip-path="url(#i)">
          <rect fill="#444ce7" height="48" rx="12" width="48" />
          <path d="m0 0h48v48h-48z" fill="url(#c)" />
          <g clip-rule="evenodd" fill-rule="evenodd" filter="url(#b)">
            <path
              d="m34.9406 12.3006-7.2651-1.9467c-.5015-.1344-.9081.1776-.9081.6968v7.5214c0 .5193.4066 1.0491.9081 1.1835l7.2651 1.9467c.5015.1344.9081-.1776.9081-.6968v-7.5214c0-.5193-.4066-1.0491-.9081-1.1835zm-7.2651-4.7672c-2.0062-.53756-3.6325.71037-3.6325 2.7873v7.5214c0 2.077 1.6263 4.1965 3.6325 4.734l7.2651 1.9467c2.0062.5376 3.6325-.7104 3.6325-2.7873v-7.5214c0-2.077-1.6263-4.1965-3.6325-4.73403z"
              fill="url(#e)"
              opacity=".5"
            />
            <path
              d="m29.2354 18.4281-9.0814-2.4333c-.5015-.1344-.9081.1776-.9081.6968v9.4017c0 .5193.4066 1.0491.9081 1.1835l9.0814 2.4334c.5015.1344.9081-.1776.9081-.6969v-9.4017c0-.5192-.4066-1.0491-.9081-1.1835zm-9.0814-5.2538c-2.0062-.5376-3.6325.7103-3.6325 2.7873v9.4017c0 2.077 1.6263 4.1965 3.6325 4.734l9.0814 2.4334c2.0062.5375 3.6325-.7104 3.6325-2.7874v-9.4017c0-2.0769-1.6263-4.1964-3.6325-4.734z"
              fill="url(#f)"
              opacity=".7"
            />
            <path
              d="m23.5302 24.5557-10.8977-2.9201c-.5015-.1343-.9081.1776-.9081.6969v11.282c0 .5193.4066 1.0491.9081 1.1835l10.8977 2.92c.5015.1344.9081-.1775.9081-.6968v-11.282c0-.5193-.4066-1.0492-.9081-1.1835zm-10.8977-5.7406c-2.0062-.5375-3.6325.7104-3.6325 2.7874v11.282c0 2.077 1.6263 4.1965 3.6325 4.7341l10.8977 2.92c2.0062.5375 3.6325-.7104 3.6325-2.7874v-11.282c0-2.077-1.6263-4.1965-3.6325-4.7341z"
              fill="url(#g)"
            />
          </g>
        </g>
        <rect
          height="46"
          rx="11"
          stroke="url(#h)"
          stroke-width="2"
          width="46"
          x="1"
          y="1"
        />
      </g>
    </svg>
  ),
  logoTwo: () => (
    <svg
      fill="none"
      height="48"
      viewBox="0 0 47 48"
      width="47"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m24.9706 7.03309c-3.1242-3.1242-8.1896-3.1242-11.3137 0l-11.31375 11.31371c-3.124199 3.1242-3.124199 8.1895 0 11.3137l11.31375 11.3137c3.1241 3.1242 8.1895 3.1242 11.3137 0l5.3982-5.3983c-4.4939-1.7337-7.682-6.0944-7.682-11.1997 0-5.3087 3.4472-9.8123 8.2254-11.3943-.0935-.0982-.1884-.1955-.2848-.292z"
        fill="#875bf7"
      />
      <path
        d="m30.3691 35.5798c1.3398.5168 2.7955.8001 4.3174.8001 6.6274 0 12-5.3726 12-12s-5.3726-12-12-12c-1.3185 0-2.5873.2126-3.774.6055 5.9623 6.2681 5.8675 16.1836-.2846 22.3356z"
        fill="#ee46bc"
      />
    </svg>
  ),
  logoThre: () => (
    <svg
      fill="none"
      height="48"
      viewBox="0 0 40 48"
      width="40"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-rule="evenodd" fill-rule="evenodd">
        <path
          d="m4.29111 28.6025c.90712.9019.9071 2.3641-.00003 3.266l-.04646.0462c-.90713.9019-2.37788.9018-3.284994-.0001-.9071177-.9019-.9071038-2.3641.000031-3.266l.046453-.0462c.90714-.9019 2.37788-.9018 3.285.0001z"
          fill="#a4bcfd"
        />
        <path
          d="m15.2112 29.298c.9055.9035.9028 2.3658-.006 3.266l-6.43424 6.3741c-.90876.9002-2.3795.8976-3.28499-.0059-.90548-.9035-.90282-2.3658.00594-3.266l6.43429-6.3741c.9088-.9002 2.3795-.8976 3.285.0059z"
          fill="#6172f3"
        />
        <path
          d="m23.9431 40.2706c.7116-1.0613 2.1538-1.348 3.2212-.6405l.1394.0923c1.0674.7075 1.3558 2.1414.6442 3.2026-.7116 1.0613-2.1538 1.3481-3.2212.6406l-.1394-.0924c-1.0674-.7075-1.3558-2.1414-.6442-3.2026z"
          fill="#a4bcfd"
        />
        <path
          d="m39.2728 28.4638c.9072.9019.9072 2.3641 0 3.266l-3.159 3.1408c-.9072.9019-2.3779.9019-3.285 0s-.9071-2.3641 0-3.266l3.1591-3.1408c.9071-.9019 2.3778-.9019 3.2849 0z"
          fill="#6172f3"
        />
        <g fill="#444ce7">
          <path d="m39.3197 16.8473c.9071.9019.9071 2.3642 0 3.266l-23.3446 23.2098c-.9071.9019-2.3779.9019-3.285 0s-.9071-2.3641 0-3.266l23.3446-23.2098c.9071-.9019 2.3778-.9019 3.285 0z" />
          <path d="m34.905 9.71133c.9072.90187.9072 2.36417 0 3.26607l-13.426 13.3485c-.9071.9019-2.3779.9019-3.285 0s-.9071-2.3642 0-3.2661l13.4261-13.34847c.9071-.90189 2.3778-.90189 3.2849 0z" />
          <path d="m27.8187 5.18362c.9077.90128.9087 2.36353.0022 3.26603l-17.2588 17.18215c-.90647.9025-2.37721.9035-3.28495.0022-.90773-.9013-.90872-2.3635-.00221-3.266l17.25876-17.18218c.9065-.9025 2.3772-.90348 3.285-.0022z" />
        </g>
        <path
          d="m10.7276 10.6841c.9056.9035.9031 2.3657-.0056 3.266l-6.75949 6.6974c-.90869.9003-2.37943.8978-3.28499-.0056-.905563-.9035-.903032-2.3657.005654-3.2661l6.759476-6.6973c.90868-.90034 2.37942-.89783 3.28495.0056z"
          fill="#6172f3"
        />
        <path
          d="m14.8678 4.00024c1.2828 0 2.3228 1.03397 2.3228 2.30944v.23094c0 1.27546-1.04 2.30943-2.3228 2.30943-1.2829 0-2.3229-1.03397-2.3229-2.30943v-.23094c0-1.27547 1.04-2.30944 2.3229-2.30944z"
          fill="#a4bcfd"
        />
      </g>
    </svg>
  ),
  logoFour: () => (
    <svg
      fill="none"
      height="48"
      viewBox="0 0 40 48"
      width="40"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clip-rule="evenodd"
        d="m20 44c11.0457 0 20-8.9543 20-20s-8.9543-20-20-20c-11.04572 0-20 8.9543-20 20s8.95428 20 20 20zm6.2393-30.6832c.3037-1.0787-.7432-1.7167-1.6993-1.0355l-13.3469 9.5083c-1.0369.7387-.8738 2.2104.245 2.2104h3.5146v-.0272h6.8498l-5.5813 1.9693-2.4605 8.7411c-.3037 1.0788.7431 1.7167 1.6993 1.0355l13.3469-9.5082c1.0369-.7387.8737-2.2105-.245-2.2105h-5.3298z"
        fill="#155eef"
        fill-rule="evenodd"
      />
    </svg>
  ),
  logoFive: () => (
    <svg
      fill="none"
      height="48"
      viewBox="0 0 38 48"
      width="38"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m14.25 5c0 7.8701-6.37994 14.25-14.25 14.25v9.5h14.25v14.25h9.5c0-7.8701 6.3799-14.25 14.25-14.25v-9.5h-14.25v-14.25z"
        fill="#16b364"
      />
    </svg>
  ),
};
