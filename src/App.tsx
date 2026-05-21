import { useState } from 'react';
import { Toaster } from 'sonner';
import { useProjectStore } from './hooks/useProjectStore';
import { Dashboard } from './components/dashboard/Dashboard';
import { StoryWizard } from './components/story/StoryWizard';
import { Editor } from './components/editor/Editor';
import { PreviewPlayer } from './components/preview/PreviewPlayer';
import { AppView, Project } from './types';

function App() {
  const [view, setView] = useState<AppView>('dashboard');
  const { 
    projects, 
    currentProject, 
    setCurrentProject, 
    addProject, 
    updateProject, 
    deleteProject 
  } = useProjectStore();

  const handleNewProject = () => {
    setView('create');
  };

  const handleStoryComplete = (project: Project) => {
    addProject(project);
    setView('editor');
  };

  const handleEditProject = (project: Project) => {
    setCurrentProject(project);
    setView('editor');
  };

  const handlePreviewProject = (project: Project) => {
    setCurrentProject(project);
    setView('preview');
  };

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-purple-200 selection:text-purple-900">
      <Toaster position="top-center" richColors closeButton />
      
      {view === 'dashboard' && (
        <Dashboard 
          projects={projects} 
          onNew={handleNewProject} 
          onEdit={handleEditProject}
          onDelete={deleteProject}
          onPreview={handlePreviewProject}
        />
      )}

      {view === 'create' && (
        <StoryWizard 
          onCancel={() => setView('dashboard')} 
          onComplete={handleStoryComplete}
        />
      )}

      {view === 'editor' && currentProject && (
        <Editor 
          project={currentProject} 
          onUpdate={updateProject} 
          onBack={() => setView('dashboard')}
          onPreview={(p) => {
            updateProject(p);
            setView('preview');
          }}
        />
      )}

      {view === 'preview' && currentProject && (
        <PreviewPlayer 
          project={currentProject} 
          onBack={() => setView('editor')}
        />
      )}
    </div>
  );
}

export default App;