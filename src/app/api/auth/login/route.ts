import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validação básica
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    // Faz a requisição para o backend NestJS
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { message: error.message || 'Credenciais inválidas' },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Cria a resposta com o token
    const nextResponse = NextResponse.json(
      { access_token: data.access_token },
      { status: 200 }
    );

    // Define o cookie no servidor para ser usado em Server Components
    nextResponse.cookies.set('access_token', data.access_token, {
      httpOnly: false, // Permite acesso do client-side também
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 horas
      path: '/',
    });

    return nextResponse;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Erro ao fazer login' },
      { status: 500 }
    );
  }
}
