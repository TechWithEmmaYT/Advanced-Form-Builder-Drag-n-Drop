import { fetchFormById } from "@/actions/form.action";
import { prisma } from "@/lib/prismadb";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // try {
  //   const { formId } = await req.json();
  //   const data = await fetchFormById(formId);
  //   return NextResponse.json({
  //     data,
  //   });
  // } catch (error: any) {
  //   console.error("Error in API route:", error);
  //   return NextResponse.json({ error: error.message }, { status: 500 });
  // }

  try {
    const session = getKindeServerSession();
    const user = await session.getUser();
    const { formId } = await req.json();

    if (!user) {
      throw new Error("Unauthorized to use this resource");
    }

    const form = await prisma.form.findFirst({
      where: {
        userId: user.id,
        formId: formId,
      },
      include: {
        settings: true,
      },
    });

    if (!form) {
      throw new Error("Form not found");
    }

    return NextResponse.json({
      data: {
        success: true,
        message: "Form fetched successfully",
        form,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
