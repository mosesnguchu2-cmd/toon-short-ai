import { useState, useEffect } from 'react';
import { Project } from '../types';

const STORAGE_KEY = 'magictoon_projects';

export const useProjectStore = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setProjects(JSON.parse(saved));
    }
  }, []);

  const saveProjects = (updatedProjects: Project[]) => {
    setProjects(updatedProjects);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects));
  };

  const addProject = (project: Project) => {
    const updated = [project, ...projects];
    saveProjects(updated);
    setCurrentProject(project);
  };

  const updateProject = (project: Project) => {
    const updated = projects.map(p => p.id === project.id ? project : p);
    saveProjects(updated);
    setCurrentProject(project);
  };

  const deleteProject = (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    saveProjects(updated);
    if (currentProject?.id === id) setCurrentProject(null);
  };

  return {
    projects,
    currentProject,
    setCurrentProject,
    addProject,
    updateProject,
    deleteProject
  };
};