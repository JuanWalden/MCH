export interface JournalEntry {
  id: string;
  date: string;
  trigger: string;
  symptoms: string;
  distressRating: string;
  strategies: string;
  effectiveness: string;
  learnings: string;
}

export interface ToolCardProps {
  title: string;
  description: string;
  imageUrl: string;
  toolId: string;
  onOpen: (id: string) => void;
}

export type ModalId = 
  | 'respiracion'
  | 'grounding'
  | 'dbt-opuesta'
  | 'dbt-distraccion'
  | 'dbt-autoconsuelo'
  | 'crisis-now'
  | 'journal';

export interface ModalContextType {
  activeModal: ModalId | null;
  openModal: (id: ModalId) => void;
  closeModal: () => void;
}

export interface JournalContextType {
  journalEntries: JournalEntry[];
  addEntry: (entry: Omit<JournalEntry, 'id'>) => void;
  deleteEntry: (id: string) => void;
}