"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface AudioPlayerProps {
  src: string
  title: string
  description?: string
  autoPlay?: boolean
  onProgress?: (progress: number) => void
  onComplete?: () => void
}

export function AudioPlayer({ 
  src, 
  title, 
  description, 
  autoPlay = false,
  onProgress,
  onComplete 
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }, [autoPlay])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const newTime = audioRef.current.currentTime
      setCurrentTime(newTime)
      const progress = (newTime / duration) * 100
      onProgress?.(progress)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleEnded = () => {
    setIsPlaying(false)
    onComplete?.()
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div 
      className="w-full max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-lg"
      role="region"
      aria-label="Player de áudio"
    >
      <div className="flex flex-col space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-semibold" aria-label={`Título: ${title}`}>{title}</h3>
          {description && (
            <p className="text-gray-600" aria-label={`Descrição: ${description}`}>
              {description}
            </p>
          )}
        </div>
        
        <audio
          ref={audioRef}
          src={src}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          aria-label={`Áudio: ${title}`}
        />

        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={togglePlay}
            className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            aria-label={isPlaying ? "Pausar" : "Reproduzir"}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button
            onClick={toggleMute}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
            aria-label={isMuted ? "Ativar som" : "Desativar som"}
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600" aria-label={`Tempo atual: ${formatTime(currentTime)}`}>
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
              aria-label="Barra de progresso"
            />
            <span className="text-sm text-gray-600" aria-label={`Duração total: ${formatTime(duration)}`}>
              {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Volume2 size={16} className="text-gray-600" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
              aria-label="Controle de volume"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
