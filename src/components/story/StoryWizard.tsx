import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Wand2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { MOCK_TEMPLATES, generateMockStory } from '@/data/mockTemplates';
import { Project } from '@/types';
import { toast } from 'sonner';

interface StoryWizardProps {
  onCancel: () => void;
  onComplete: (project: Project) => void;
}

export const StoryWizard: React.FC<StoryWizardProps> = ({ onCancel, onComplete }) => {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [theme, setTheme] = useState(MOCK_TEMPLATES[0].id);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!title) {
      toast.error('Please give your story a name!');
      return;
    }
    setIsGenerating(true);
    // Simulate AI Generation
    setTimeout(() => {
      const project = generateMockStory(theme, title);
      setIsGenerating(false);
      onComplete(project);
      toast.success('AI magic finished! Your story is ready.');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-md mx-auto h-full flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <Button variant="ghost" onClick={onCancel} className="font-bold text-slate-500">
            <ChevronLeft className="mr-2" /> Cancel
          </Button>
          <div className="flex gap-1">
            {[1, 2].map((s) => (
              <div key={s} className={`h-2 w-8 rounded-full transition-colors ${step >= s ? 'bg-purple-500' : 'bg-slate-200'}`} />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-black text-slate-800">What's the name of your story?</h2>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Story Title</label>
                <Input 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. The Brave Little Toaster"
                  className="h-14 text-xl rounded-2xl border-2 focus:border-purple-500 transition-all"
                />
              </div>
              <Button 
                onClick={() => title ? setStep(2) : toast.error('Enter a title first!')}
                className="w-full h-14 text-lg font-bold bg-purple-600 rounded-2xl"
              >
                Next Step <ChevronRight className="ml-2" />
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-black text-slate-800">Choose a World</h2>
              <div className="grid grid-cols-1 gap-4">
                {MOCK_TEMPLATES.map((t) => (
                  <Card 
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`p-4 cursor-pointer border-4 transition-all overflow-hidden relative ${theme === t.id ? 'border-purple-500 bg-purple-50' : 'border-transparent'}`}
                  >
                    <div className="flex gap-4 items-center">
                      <img src={t.imageUrl} className="w-20 h-20 rounded-xl object-cover" alt={t.name} />
                      <div>
                        <h3 className="font-bold text-lg">{t.name}</h3>
                        <p className="text-sm text-slate-500">{t.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full h-16 text-xl font-black bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-slate-900 rounded-2xl shadow-xl disabled:opacity-50"
              >
                {isGenerating ? (
                  <div className="flex items-center gap-2">
                    <Sparkles className="animate-spin" /> Generating Magic...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Wand2 className="w-6 h-6" /> Make My Story!
                  </div>
                )}
              </Button>
              <Button variant="ghost" onClick={() => setStep(1)} className="w-full font-bold text-slate-400">
                Back to Title
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};