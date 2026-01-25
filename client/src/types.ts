export interface Note {
  key: string;
  time: number;
}

export interface Song {
  id: number;
  title: string;
  notes: Note[];
}