'use client';

import { useState, useEffect } from 'react'
import { AudioPlayer } from '@/components/audio-player';

interface SessionProgress {
  id: number;
  progress: number;
  completed: boolean;
  lastPlayed: Date;
}

const motivationalSessions = [
  {
    id: 1,
    title: 'Meditação Matinal',
    description: 'Comece seu dia com energia e positividade',
    src: '/audio/morning-meditation.mp3',
    duration: '10 min',
    benefits: [
      'Aumenta a energia matinal',
      'Melhora o foco',
      'Reduz o estresse',
    ],
  },
  {
    id: 2,
    title: 'Frequência de Prosperidade',
    description: 'Sintonize-se com a abundância e sucesso',
    src: '/audio/prosperity-frequency.mp3',
    duration: '15 min',
    benefits: [
      'Atrai prosperidade',
      'Fortalece a confiança',
      'Expande a consciência',
    ],
  },
  {
    id: 3,
    title: 'Música Clássica para Foco',
    description: 'Melhore sua concentração com música clássica',
    src: '/audio/classical-focus.mp3',
    duration: '30 min',
    benefits: [
      'Aumenta a produtividade',
      'Melhora a concentração',
      'Reduz a ansiedade',
    ],
  },
];

export default function MotivacaoPage() {
  const [sessionProgress, setSessionProgress] = useState<SessionProgress[]>([])
  const [activeSession, setActiveSession] = useState<number | null>(null)

  useEffect(() => {
    // Carregar progresso salvo do localStorage
    const savedProgress = localStorage.getItem('sessionProgress')
    if (savedProgress) {
      setSessionProgress(JSON.parse(savedProgress))
    }
  }, [])

  const handleProgress = (sessionId: number, progress: number) => {
    const updatedProgress = [...sessionProgress]
    const sessionIndex = updatedProgress.findIndex(p => p.id === sessionId)
    
    if (sessionIndex === -1) {
      updatedProgress.push({
        id: sessionId,
        progress,
        completed: progress >= 100,
        lastPlayed: new Date(),
      })
    } else {
      updatedProgress[sessionIndex] = {
        ...updatedProgress[sessionIndex],
        progress,
        completed: progress >= 100,
        lastPlayed: new Date(),
      }
    }

    setSessionProgress(updatedProgress)
    localStorage.setItem('sessionProgress', JSON.stringify(updatedProgress))
  }

  const handleComplete = (sessionId: number) => {
    const session = motivationalSessions.find(s => s.id === sessionId)
    if (session) {
      // Mostrar mensagem de conclusão
      alert(`Parabéns! Você completou a sessão "${session.title}"`)
    }
  }

  const getSessionProgress = (sessionId: number) => {
    const progress = sessionProgress.find(p => p.id === sessionId)
    return progress ? progress.progress : 0
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Sessões Motivacionais e Frequências</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {motivationalSessions.map((session) => (
          <div 
            key={session.id} 
            className={`bg-white rounded-lg shadow-md p-6 transition-all duration-300 ${
              activeSession === session.id ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <div className="mb-4">
              <h2 className="text-xl font-semibold">{session.title}</h2>
              <p className="text-gray-600">{session.description}</p>
              <p className="text-sm text-gray-500 mt-2">Duração: {session.duration}</p>
              
              <div className="mt-4">
                <h3 className="font-medium mb-2">Benefícios:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {session.benefits.map((benefit, index) => (
                    <li key={index} className="text-sm text-gray-600">{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4">
              <div className="h-2 bg-gray-200 rounded-full mb-2">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${getSessionProgress(session.id)}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 text-right">
                {Math.round(getSessionProgress(session.id))}% concluído
              </p>
            </div>

            <AudioPlayer
              src={session.src}
              title={session.title}
              description={session.description}
              onProgress={(progress) => handleProgress(session.id, progress)}
              onComplete={() => handleComplete(session.id)}
            />
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Seu Progresso</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {motivationalSessions.map((session) => {
              const progress = sessionProgress.find(p => p.id === session.id)
              return (
                <div key={session.id} className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium">{session.title}</h3>
                  <div className="mt-2">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${getSessionProgress(session.id)}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {progress?.completed ? 'Concluído' : 'Em andamento'}
                    </p>
                    {progress?.lastPlayed && (
                      <p className="text-xs text-gray-500 mt-1">
                        Última sessão: {new Date(progress.lastPlayed).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
} 