import { create } from "zustand";

export const usePortfolioStore = create((set) => ({
  renderAbout: false,
  renderProjects: false,
  renderExperiences: false,
  renderContact: false,

  setRenderAbout: (val) => set({ renderAbout: val }),
  setRenderProjects: (val) => set({ renderProjects: val }),
  setRenderExperiences: (val) => set({ renderExperiences: val }),
  setRenderContact: (val) => set({ renderContact: val }),

  // Helper to trigger all renders immediately (e.g. if page is loaded scrolled down)
  renderAllImmediately: () => set({
    renderAbout: true,
    renderProjects: true,
    renderExperiences: true,
    renderContact: true,
  }),
}));

