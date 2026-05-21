import React, { useState } from 'react';
import { Project, Scene } from '@/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ChevronLeft, 
  Play, 
  Plus, 
  Trash2, 
  Volume2, 
  Image as ImageIcon,
  Type,
  ArrowRight,
  Sparkles,
  Download,
  Music
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface EditorProps {
  project: Project;
  onUpdate: (p: Project) => void;
  onBack: () => void;
  onPreview: (p: Project) => void;
}

const SOUND_FX = ['✨ Magic Sparkle', '🌈 Rainbow Swoosh', '🐶 Happy Bark', '🚗 Car Beep', '⭐ Star Twinkle'];

export const Editor: React.FC<EditorProps> = ({ project, onUpdate, onBack, onPreview }) => {
  const [activeSceneId, setActiveSceneId] = useState(project.scenes[0]?.id);

  const activeScene = project.scenes.find(s => s.id === activeSceneId) || project.scenes[0];

  const updateScene = (updates: Partial<Scene>) => {
    const updatedScenes = project.scenes.map(s => 
      s.id === activeSceneId ? { ...s, ...updates } : s
    );
    onUpdate({ ...project, scenes: updatedScenes, updatedAt: Date.now() });
  };

  const addScene = () => {
    const newScene: Scene = {
      id: Math.random().toString(36).substr(2, 9),
      text: 'New scene text...',
      imageUrl: project.scenes[project.scenes.length - 1]?.imageUrl || '',
      duration: 5,
      subtitle: 'Add subtitle...'
    };
    onUpdate({ ...project, scenes: [...project.scenes, newScene], updatedAt: Date.now() });
    setActiveSceneId(newScene.id);
  };

  const deleteScene = (id: string) => {
    if (project.scenes.length <= 1) {
      toast.error("You need at least one scene!");
      return;
    }
    const updatedScenes = project.scenes.filter(s => s.id !== id);
    onUpdate({ ...project, scenes: updatedScenes, updatedAt: Date.now() });
    if (activeSceneId === id) setActiveSceneId(updatedScenes[0].id);
  };

  const handleSpeak = () => {
    if (!activeScene.text) return;
    const utterance = new SpeechSynthesisUtterance(activeScene.text);
    utterance.rate = 1.2;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
    toast.success("Playing AI narration preview...");
  };

  const handleSoundFX = (fx: string) => {
    toast.info(`Sound effect "${fx}" added to scene!`, {
      icon: <Music className="w-4 h-4" />
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b-2 border-slate-100 p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ChevronLeft />
          </Button>
          <div>
            <h2 className="font-black text-lg text-slate-800 line-clamp-1">{project.title}</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Shorts Editor</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="font-bold hidden sm:flex" onClick={() => onPreview(project)}>
            <Play className="w-4 h-4 mr-1 fill-current" /> Preview
          </Button>
          <Button size="sm" className="bg-purple-600 hover:bg-purple-700 font-bold" onClick={() => onPreview(project)}>
            <Download className="w-4 h-4 mr-1" /> Export
          </Button>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Preview Area */}
        <div className="flex-1 p-4 flex flex-col gap-4">
          <div className="aspect-[9/16] max-h-[60vh] mx-auto bg-black rounded-3xl overflow-hidden shadow-2xl relative group">
            <img 
              src={activeScene.imageUrl} 
              className="w-full h-full object-cover" 
              alt="Scene visual" 
            />
            
            {/* Subtitle Overlay */}
            <div className="absolute bottom-12 left-0 right-0 px-6 text-center">
              <p className="bg-yellow-400 text-black font-black text-xl py-2 px-4 inline-block rounded-lg shadow-lg rotate-[-1deg]">
                {activeScene.subtitle}
              </p>
            </div>

            {/* AI Generation Overlay (Mock) */}
            <div className="absolute top-4 right-4">
              <Button size="sm" className="bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold hover:bg-white/40">
                <Sparkles className="w-4 h-4 mr-1" /> Re-gen Image
              </Button>
            </div>
          </div>

          <div className="max-w-md mx-auto w-full space-y-4">
            <div className="flex gap-2 overflow-x-auto pb-2 px-2">
              <AnimatePresence>
                {project.scenes.map((scene, idx) => (
                  <motion.div
                    key={scene.id}
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`flex-shrink-0 w-20 h-32 rounded-xl border-4 cursor-pointer overflow-hidden transition-all relative ${
                      activeSceneId === scene.id ? 'border-purple-500 scale-105 shadow-lg' : 'border-transparent'
                    }`}
                    onClick={() => setActiveSceneId(scene.id)}
                  >
                    <img src={scene.imageUrl} className="w-full h-full object-cover" alt={`Scene ${idx + 1}`} />
                    <div className="absolute top-1 left-1 bg-black/50 text-white text-[10px] px-1 rounded font-bold">
                      {idx + 1}
                    </div>
                  </motion.div>
                ))}
                <Button 
                  onClick={addScene}
                  variant="outline" 
                  className="flex-shrink-0 w-20 h-32 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-1 hover:border-purple-400 hover:bg-purple-50"
                >
                  <Plus className="w-6 h-6 text-slate-400" />
                  <span className="text-[10px] font-bold text-slate-400">Add Scene</span>
                </Button>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Controls Panel */}
        <div className="w-full md:w-96 bg-white border-l-2 border-slate-100 p-6 space-y-8 shadow-inner md:shadow-none overflow-y-auto pb-24 md:pb-6">
          <section className="space-y-3">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Type className="w-4 h-4" /> Narration Script
            </h3>
            <Textarea 
              value={activeScene.text}
              onChange={(e) => updateScene({ text: e.target.value })}
              className="min-h-[100px] text-lg font-medium rounded-xl border-2 border-slate-100 focus:border-purple-500"
              placeholder="What does the narrator say?"
            />
            <Button 
              onClick={handleSpeak}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold border-b-2 border-slate-300"
            >
              <Volume2 className="w-4 h-4 mr-2" /> Preview AI Voice
            </Button>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Subtitle Text
            </h3>
            <Input 
              value={activeScene.subtitle}
              onChange={(e) => updateScene({ subtitle: e.target.value })}
              className="h-12 font-black rounded-xl border-2 border-slate-100"
              placeholder="Appears on screen"
            />
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Music className="w-4 h-4" /> Sound Effects
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {SOUND_FX.map(fx => (
                <Button 
                  key={fx} 
                  variant="outline" 
                  size="sm" 
                  className="text-[10px] font-bold h-8 truncate px-2"
                  onClick={() => handleSoundFX(fx)}
                >
                  {fx}
                </Button>
              ))}
            </div>
          </section>

          <section className="space-y-3">
             <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <ImageIcon className="w-4 h-4" /> Scene Duration
            </h3>
            <div className="flex items-center gap-4">
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={activeScene.duration} 
                onChange={(e) => updateScene({ duration: parseInt(e.target.value) })}
                className="flex-1 accent-purple-600"
              />
              <span className="font-bold text-purple-600 w-12">{activeScene.duration}s</span>
            </div>
          </section>

          <Button 
            variant="ghost" 
            className="w-full text-red-500 font-bold hover:bg-red-50"
            onClick={() => deleteScene(activeScene.id)}
          >
            <Trash2 className="w-4 h-4 mr-2" /> Delete This Scene
          </Button>
        </div>
      </div>
    </div>
  );
};