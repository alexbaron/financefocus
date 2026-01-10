import { NextResponse } from 'next/server';

interface BudgetItem {
  id: number;
  [key: string]: unknown;
}

const budgetItems: BudgetItem[] = [];

export async function GET() {
  return NextResponse.json(budgetItems);
}
