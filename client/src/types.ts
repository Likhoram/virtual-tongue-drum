
export interface Note {
  key: string;
  time: number;
  note?: string; 
}

export interface Song {
  id: number;
  title: string;
  notes: Note[];
}