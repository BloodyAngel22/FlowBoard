import { create } from "zustand/react"

interface ProjectIdStore {
  projectId: string
  setProjectId: (projectId: string) => void
}

export const useProjectId = create<ProjectIdStore>((set) => ({
  projectId: "",
  setProjectId: (projectId: string) => set({ projectId }),
}))