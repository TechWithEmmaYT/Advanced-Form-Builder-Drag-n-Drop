import { fetchFormById } from "@/actions/form.action";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { formId } = await req.json();
    const data = await fetchFormById(formId);
    return NextResponse.json({
      data,
    });
  } catch (error: any) {
    console.error("Error in API route:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
