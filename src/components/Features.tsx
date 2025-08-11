import { ShieldCheck, Lightbulb, CheckCircle } from "lucide-react";

const features = [
  {
    icon: <span className="text-[28px] text-[#142A51]"><strong>0</strong></span>,
    title: "Zero Brokerage",
    isIconText: true,
  },
  {
    icon: <CheckCircle className="w-7 h-7 text-[#142A51]" />,
    title: "Verified Listings",
    isIconText: false,
  },
  {
    icon: <Lightbulb className="w-7 h-7 text-[#142A51]" />,
    title: "Instant Contact",
    isIconText: false,
  },
];

export default function Features() {
  return (
    <div className="w-full justify-around flex  space-x-16 py-2 text-[#142A51]">
      {features.map(({ icon, title, isIconText }, i) => (
        <div key={i} className="flex items-center gap-4">
          {isIconText ? (
            <div className="flex flex-col items-center">
              {icon}
              <span className="text-lg font-semibold">{title}</span>
            </div>
          ) : (
            <>
              {icon}
              <div className="flex flex-col text-left">
                <span className="text-lg font-semibold">{title}</span>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
