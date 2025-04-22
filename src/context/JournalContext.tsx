import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { JournalEntry, JournalContextType } from '../types';
import { loadEntries, saveEntries, addSampleEntryIfEmpty } from '../utils/storage';

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export const JournalProvider = ({ children }: { children: ReactNode }) => {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);

  // Load entries from localStorage on mount
  useEffect(() => {
    addSampleEntryIfEmpty();
    setJournalEntries(loadEntries());
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    if (journalEntries.length > 0) {
      saveEntries(journalEntries);
    }
  }, [journalEntries]);

  const addEntry = (entry: Omit<JournalEntry, 'id'>) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: 'entry-' + Date.now().toString()
    };
    
    setJournalEntries(prevEntries => [newEntry, ...prevEntries]);
  };

  const deleteEntry = (id: string) => {
    setJournalEntries(prevEntries => 
      prevEntries.filter(entry => entry.id !== id)
    );
  };

  return (
    <JournalContext.Provider value={{ journalEntries, addEntry, deleteEntry }}>
      {children}
    </JournalContext.Provider>
  );
};

export const useJournal = (): JournalContextType => {
  const context = useContext(JournalContext);
  
  if (context === undefined) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  
  return context;
};