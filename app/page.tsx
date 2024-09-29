import EnhancedClockComponent from "@/components/enhanced-clock";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web clock - ANALOG / DIGITAL",
  description:
    "Adjust time according to your requirement between analog and digital",
};

export default function Page() {
  return <EnhancedClockComponent />;
}
