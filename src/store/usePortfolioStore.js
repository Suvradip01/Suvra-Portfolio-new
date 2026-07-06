import { create } from "zustand";

export const usePortfolioStore = create((set, get) => ({
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

  // Helper to stagger renders over time to keep the main thread quiet
  renderAllStaggered: (delayStart = 0, gap = 80) => {
    setTimeout(() => set({ renderAbout: true }), delayStart);
    setTimeout(() => set({ renderProjects: true }), delayStart + gap);
    setTimeout(() => set({ renderExperiences: true }), delayStart + gap * 2);
    setTimeout(() => set({ renderContact: true }), delayStart + gap * 3);
  }
}));
