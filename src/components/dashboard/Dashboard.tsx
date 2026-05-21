import React from 'react';
import { Sparkles, Plus, Play, Trash2, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Project } from '@/types';
import { APP_LOGO } from '@/data/mockTemplates';
import { motion } from 'framer-motion';

interface DashboardProps {
  projects: Project[];
  onNew: () => void;
  onEdit: (p: Project) => void;
  onDelete: (id: string) => void;
  onPreview: (p: Project) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ projects, onNew, onEdit, onDelete, onPreview }) => {
  return (
    <div className="p-4 max-w-2xl mx-auto space-y-6 pb-20">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center space-y-2 pt-4"
      >
        <div className="flex justify-center mb-4">
          <img src={APP_LOGO} alt="Logo" className="w-24 h-24 rounded-full border-4 border-yellow-400 shadow-xl" />
        </div>
        <h1 className="text-4xl font-black text-purple-600 tracking-tight flex items-center justify-center gap-2">
          MagicToon AI <Sparkles className="text-yellow-400 fill-yellow-400" />
        </h1>
        <p className="text-slate-500 font-medium">Create viral kids' Shorts in seconds!</p>
      </motion.div>

      <Button 
        onClick={onNew}
        className="w-full h-20 text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-2xl shadow-lg border-b-4 border-purple-700 active:border-b-0 active:translate-y-1 transition-all"
      >
        <Plus className="w-8 h-8 mr-2" /> Start New Story
      </Button>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          Your Masterpieces <Wand2 className="w-5 h-5 text-purple-500" />
        </h2>
        
        {projects.length === 0 ? (
          <div className="text-center py-12 bg-white/50 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400">No stories yet. Click the big button to start!</p>
          </div>
        ) : (
          projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="overflow-hidden border-2 border-slate-100 hover:border-purple-200 transition-colors">
                <div className="flex h-32">
                  <div className="w-32 h-full bg-slate-100 flex-shrink-0 relative">
                    <img 
                      src={project.scenes[0]?.imageUrl} 
                      className="w-full h-full object-cover" 
                      alt="Thumbnail"
                    />
                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                       <Play className="text-white fill-white w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <CardTitle className="text-lg line-clamp-1">{project.title}</CardTitle>
                      <CardDescription className="line-clamp-1">{project.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" className="flex-1 font-bold" onClick={() => onEdit(project)}>
                        Edit
                      </Button>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700 font-bold" onClick={() => onPreview(project)}>
                        Play
                      </Button>
                      <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-600" onClick={() => onDelete(project.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};