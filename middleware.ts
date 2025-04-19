import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Obter a resposta da próxima camada
  const response = NextResponse.next()
  
  // Adicionar headers para garantir a codificação UTF-8
  response.headers.set('Content-Type', 'text/html; charset=utf-8')
  
  // Adicionar headers de segurança e cache
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  
  return response
}

// Configurar quais rotas devem passar pelo middleware
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
} 