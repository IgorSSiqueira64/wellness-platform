import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import React from "react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converte texto com possíveis problemas de codificação para UTF-8 correto
 * Útil para corrigir caracteres especiais em português
 */
export function fixEncoding(text: string): string {
  // Mapeamento de caracteres codificados incorretamente para seus equivalentes corretos
  const charMap: Record<string, string> = {
    'Ã£': 'ã',
    'Ã¢': 'â',
    'Ã©': 'é',
    'Ãª': 'ê',
    'Ã§': 'ç',
    'Ãµ': 'õ',
    'Ã´': 'ô',
    'Ã³': 'ó',
    'Ã­': 'í',
    'Ãº': 'ú',
    'Ã': 'Á',
    'Â©': '©',
    'SessÃµes': 'Sessões',
    'meditaÃ§Ã£o': 'meditação',
    'cogniÃ§Ã£o': 'cognição',
    'conteÃºdos': 'conteúdos',
    'GrÃ¡tis': 'Grátis',
    'mÃªs': 'mês',
    'cÃ©rebro': 'cérebro',
    'ilimitado': 'ilimitado',
    'sessÃµes': 'sessões',
    'exclusivas': 'exclusivas',
    'frequÃªncias': 'frequências',
    'avanÃ§adas': 'avançadas',
  }
  
  let fixedText = text
  
  // Aplicar substituições
  Object.entries(charMap).forEach(([incorrect, correct]) => {
    fixedText = fixedText.replace(new RegExp(incorrect, 'g'), correct)
  })
  
  return fixedText
}

/**
 * Componente HOC para corrigir automaticamente texto em props
 */
export function withFixedEncoding<P extends Record<string, any>>(Component: React.ComponentType<P>): React.FC<P> {
  return function EncodingFixedComponent(props: P) {
    // Processa todas as props que são strings
    const fixedProps = Object.entries(props).reduce((acc, [key, value]) => {
      if (typeof value === 'string') {
        acc[key] = fixEncoding(value)
      } else {
        acc[key] = value
      }
      return acc
    }, {} as Record<string, any>) as P
    
    return React.createElement(Component, fixedProps)
  }
}
