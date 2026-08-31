/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { executeMockDbAction } from "@/lib/mockDbServer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { table, action, payload, filters, orderBy, options } = body;

    const result = await executeMockDbAction({
      table,
      action,
      payload,
      filters,
      orderBy,
      options,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { data: null, error: { message: error.message } },
      { status: 500 }
    );
  }
}
