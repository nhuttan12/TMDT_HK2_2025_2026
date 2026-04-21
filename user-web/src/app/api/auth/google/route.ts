
import { NextResponse } from 'next/server';

export async function GET() {
  const backendUrl = `https://localhost:7087/api/Auth/Login-google`;
  return NextResponse.redirect(backendUrl);
}
