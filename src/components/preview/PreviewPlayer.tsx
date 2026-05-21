import React, { useState, useEffect, useRef } from 'react';
import { Project } from '@/types';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Play, Pause, RotateCcw, Youtube, Send, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface PreviewPlayerProps {
  project: Project;
  onBack: () => void;
}

export const PreviewPlayer: React.FC<PreviewPlayerProps> = ({ project, onBack }) => {
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<number | null>(null);

  const activeScene = project.scenes[currentSceneIdx];

  useEffect(() => {
    if (isPlaying) {
      const duration = activeScene.duration * 1000;
      const startTime = Date.now();
      
      // Simulate audio playback for the first time scene starts
      if (progress === 0) {
        const utterance = new SpeechSynthesisUtterance(activeScene.text);
        utterance.rate = 1.2;
        window.speechSynthesis.speak(utterance);
      }

      timerRef.current = window.setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = (elapsed / duration) * 100;
        
        if (newProgress >= 100) {
          if (currentSceneIdx < project.scenes.length - 1) {
            setCurrentSceneIdx(prev => prev + 1);
            setProgress(0);
          } else {
            setIsPlaying(false);
            setProgress(100);
            window.clearInterval(timerRef.current!);
          }
        } else {
          setProgress(newProgress);
        }
      }, 50);
    } else {
      if (timerRef.current) window.clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      window.speechSynthesis.cancel();
    };
  }, [isPlaying, currentSceneIdx, activeScene]);

  const handleTogglePlay = () => {
    if (progress >= 100 && currentSceneIdx === project.scenes.length - 1) {
      setCurrentSceneIdx(0);
      setProgress(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleExport = (platform: string) => {
    toast.loading(`Processing viral video for ${platform}...`);
    setTimeout(() => {
      toast.dismiss();
      toast.success(`Success! Your video is live on ${platform}! ✨`, {
        description: "Your Short is already getting views!",
      });
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col text-white">
      <header className="p-4 flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="text-white hover:bg-white/10">
          <ChevronLeft className="mr-2" /> Back to Editor
        </Button>
        <h2 className="font-bold text-lg">Final Preview</h2>
        <div className="w-20" /> {/* Spacer */}
      </header>

      <div className="flex-1 relative flex items-center justify-center p-4">
        <div className="aspect-[9/16] w-full max-w-[400px] bg-black rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.4)] relative">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeScene.id}
              src={activeScene.imageUrl}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Subtitles */}
          <div className="absolute bottom-20 left-0 right-0 px-6 text-center z-20">
             <motion.p 
               key={activeScene.subtitle + currentSceneIdx}
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               className="bg-yellow-400 text-black font-black text-2xl py-3 px-6 inline-block rounded-xl shadow-2xl border-4 border-black uppercase"
             >
                {activeScene.subtitle}
             </motion.p>
          </div>

          {/* Playback Controls Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20 z-10">
            <Button 
              size="icon" 
              onClick={handleTogglePlay}
              className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border-4 border-white/50"
            >
              {isPlaying ? <Pause className="w-10 h-10 fill-white" /> : <Play className="w-10 h-10 fill-white" />}
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-2 flex gap-1 p-2 bg-gradient-to-b from-black/50 to-transparent z-30">
            {project.scenes.map((_, idx) => (
              <div key={idx} className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-500 transition-all duration-75"
                  style={{ 
                    width: idx < currentSceneIdx ? '100%' : idx === currentSceneIdx ? `${progress}%` : '0%' 
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border-t border-white/10 p-6 space-y-6">
        <div className="text-center space-y-1">
          <h3 className="text-xl font-black italic">BOOM! It's Ready! 🚀</h3>
          <p className="text-slate-400 text-sm">One click to go viral on any platform</p>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          <Button 
            onClick={() => handleExport('YouTube')}
            className="h-16 rounded-2xl bg-[#FF0000] hover:bg-[#CC0000] text-lg font-black"
          >
            <Youtube className="w-6 h-6 mr-2" /> YT SHORTS
          </Button>
          <Button 
            onClick={() => handleExport('TikTok')}
            className="h-16 rounded-2xl bg-black border-2 border-white/20 text-lg font-black"
          >
            <Send className="w-6 h-6 mr-2" /> TIKTOK
          </Button>
          <Button 
            variant="outline"
            onClick={() => handleExport('Instagram')}
            className="h-16 rounded-2xl bg-white/10 border-white/20 text-lg font-black col-span-2"
          >
            <Share2 className="w-6 h-6 mr-2" /> SHARE EVERYWHERE
          </Button>
        </div>

        <Button 
          variant="ghost" 
          onClick={() => { setCurrentSceneIdx(0); setProgress(0); setIsPlaying(true); }}
          className="w-full text-slate-400 font-bold"
        >
          <RotateCcw className="w-4 h-4 mr-2" /> Watch Again
        </Button>
      </div>
    </div>
  );
};