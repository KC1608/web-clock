import { NextResponse } from "next/server";
import { addArticle, getAllArticles } from "@/lib/storage";
import { createClient } from "@/utils/supabase/client";

export async function GET() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      return NextResponse.json({ articles: data });
    }
  } catch (err) {
    console.warn("Supabase articles query note:", err);
  }

  const articles = getAllArticles();
  return NextResponse.json({ articles });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      summary,
      category,
      authorName,
      authorRole,
      introduction,
      howItWorks,
      technicalHighlights,
      tags,
    } = body;

    if (!title || !category || !authorName || !introduction || !howItWorks) {
      return NextResponse.json(
        { error: "Title, category, author name, introduction, and how-it-works steps are required." },
        { status: 400 }
      );
    }

    const slug =
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "") +
      "-" +
      Math.random().toString(36).substring(2, 6);

    const stepsArray = Array.isArray(howItWorks)
      ? howItWorks
      : String(howItWorks)
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean);

    const highlightsArray = Array.isArray(technicalHighlights)
      ? technicalHighlights
      : [{ label: "Component System", value: category }];

    const tagsArray = Array.isArray(tags)
      ? tags
      : String(tags || "")
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);

    const newArticle = addArticle({
      slug,
      title: title.trim(),
      summary: summary?.trim() || introduction.slice(0, 150) + "...",
      category,
      author: {
        name: authorName.trim(),
        role: authorRole?.trim() || "Automotive Enthusiast",
      },
      readingTime: "4 min read",
      tags: tagsArray.length > 0 ? tagsArray : [category],
      content: {
        introduction: introduction.trim(),
        howItWorks: stepsArray,
        technicalHighlights: highlightsArray,
      },
    });

    // Sync to Supabase
    try {
      const supabase = createClient();
      await supabase.from("articles").insert([
        {
          slug: newArticle.slug,
          title: newArticle.title,
          summary: newArticle.summary,
          category: newArticle.category,
          author_name: newArticle.author.name,
          author_role: newArticle.author.role,
          content: newArticle.content,
          tags: newArticle.tags,
          created_at: new Date().toISOString(),
        },
      ]);
    } catch (dbErr) {
      console.warn("Supabase articles insert note (table might not exist yet):", dbErr);
    }

    return NextResponse.json({ success: true, article: newArticle }, { status: 201 });
  } catch (error) {
    console.error("Failed to add article:", error);
    return NextResponse.json({ error: "Failed to process article submission." }, { status: 500 });
  }
}
