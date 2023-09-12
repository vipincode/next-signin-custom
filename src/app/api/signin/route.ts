import { prisma } from '@/utils/db';
import { comparePasswords, createJWT } from '@/utils/auth';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    NextResponse.json({ error: 'Invalid login' }, { status: 401 });
    return;
  }

  const isUser = await comparePasswords(password, user.password);

  if (isUser) {
    const jwt = await createJWT(user);
    cookies().set({
      name: process.env.COOKIE_NAME!,
      value: jwt,
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ jwt }, { status: 201 });
  } else {
    return NextResponse.json({ error: 'Invalid login' }, { status: 402 });
  }
}
