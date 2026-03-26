import { NextRequest, NextResponse } from "next/server";
import { getUserV2ByRegistrationId } from "@/lib/db";
import { verifyUserCookie } from "../../../lib/auth";

export async function GET(req: NextRequest) {
  const userId = verifyUserCookie(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getUserV2ByRegistrationId(userId);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user });
}