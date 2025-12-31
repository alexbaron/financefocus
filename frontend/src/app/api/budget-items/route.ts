import { NextResponse } from 'next/server';

let budgetItems: any[] = [];

export async function GET() {
  return NextResponse.json(budgetItems);
}
