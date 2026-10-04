import EnhancedClockComponent from "@/components/enhanced-clock";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Clock - Analog & Digital Time Display",
  description:
    "A versatile web clock with customizable themes, analog and digital displays, and precision time controls.",
};

export default function ClockPage() {
  return (
    <main className="min-h-screen">
      <EnhancedClockComponent />
    </main>
  );
}
