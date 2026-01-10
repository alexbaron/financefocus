import { NextResponse } from 'next/server';

interface BudgetItem {
  id: number;
  [key: string]: unknown;
}

const budgetItems: BudgetItem[] = [];

export async function POST(request: Request) {
  const body = await request.json();
  const newItem = {
    id: budgetItems.length + 1,
    ...body
  };
  budgetItems.push(newItem);
  return NextResponse.json(newItem);
}
