import { JournalEntry } from '../types';

const STORAGE_KEY = 'crisis-toolbox-entries';

export const saveEntries = (entries: JournalEntry[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadEntries = (): JournalEntry[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return [];
  }
};

export const addSampleEntryIfEmpty = (): void => {
  const entries = loadEntries();
  
  if (entries.length === 0) {
    const sampleEntry: JournalEntry = {
      id: 'sample-' + Date.now().toString(),
      date: new Date().toISOString(),
      trigger: "Ejemplo: Discusión acalorada con un compañero de trabajo",
      symptoms: "Ejemplo: Aumento del ritmo cardíaco, sensación de ahogo, pensamientos acelerados",
      distressRating: "4",
      strategies: "Ejemplo: Ejercicio de respiración 4-7-8 durante 2 minutos, seguido de técnica de grounding",
      effectiveness: "3",
      learnings: "Ejemplo: La respiración ayudó a reducir la intensidad inicial. Necesito practicar más las técnicas cuando estoy en calma."
    };
    
    saveEntries([sampleEntry]);
  }
};