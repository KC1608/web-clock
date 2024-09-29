import EnhancedClockComponent from "@/components/enhanced-clock";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Clock - Analog and Digital Time Display",
  description:
    "A versatile web clock that lets you switch seamlessly between analog and digital displays. Customize and adjust the time according to your preference, providing a user-friendly experience for any purpose.",
};

export default function Page() {
  return <EnhancedClockComponent />;
}
