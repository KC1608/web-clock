import { NextResponse } from "next/server";
import { addConnectMessage, getAllConnectMessages } from "@/lib/storage";
import { createClient } from "@/utils/supabase/client";

export async function GET() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("connect_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      return NextResponse.json({
        messages: data.map((d) => ({
          id: d.id?.toString() || Math.random().toString(),
          name: d.name,
          email: d.email,
          favoriteCar: d.favorite_car || d.favoriteCar || "",
          interestArea: d.interest_area || d.interestArea || "General Car Tech",
          message: d.message,
          createdAt: d.created_at || d.createdAt || new Date().toISOString(),
        })),
      });
    }
  } catch (err) {
    console.warn("Supabase query fallback to local store:", err);
  }

  const messages = getAllConnectMessages();
  return NextResponse.json({ messages });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, favoriteCar, interestArea, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const newMessage = addConnectMessage({
      name: name.trim(),
      email: email.trim(),
      favoriteCar: favoriteCar?.trim() || "Automotive Enthusiast",
      interestArea: interestArea?.trim() || "General Car Tech",
      message: message.trim(),
    });

    // Sync to Supabase
    try {
      const supabase = createClient();
      await supabase.from("connect_messages").insert([
        {
          name: newMessage.name,
          email: newMessage.email,
          favorite_car: newMessage.favoriteCar,
          interest_area: newMessage.interestArea,
          message: newMessage.message,
          created_at: newMessage.createdAt,
        },
      ]);
    } catch (dbErr) {
      console.warn("Supabase insert note (table might not exist yet):", dbErr);
    }

    return NextResponse.json({ success: true, message: newMessage }, { status: 201 });
  } catch (error) {
    console.error("Failed to add connect message:", error);
    return NextResponse.json({ error: "Failed to submit message." }, { status: 500 });
  }
}
