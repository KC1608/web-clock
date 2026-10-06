import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { isAdmin } from "@/lib/admin-auth";
import { deleteConnectMessage } from "@/lib/storage";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !isAdmin(user.email)) {
      return NextResponse.json(
        { error: "Unauthorized: Administrator privileges required." },
        { status: 403 }
      );
    }

    // Delete from Supabase if table exists
    try {
      await supabase.from("connect_messages").delete().eq("id", id);
    } catch (dbErr) {
      console.warn("Supabase delete note:", dbErr);
    }

    // Delete from memory store
    deleteConnectMessage(id);

    return NextResponse.json({ success: true, deletedId: id });
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json(
      { error: "Failed to delete message." },
      { status: 500 }
    );
  }
}
