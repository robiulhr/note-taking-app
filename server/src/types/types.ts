export interface noteType {
  id: string;
  noteTitle: string;
  noteDescription: string;
  noteTags: string[];
}

export interface tagType {
  id: string;
  name: string;
  color: string;
  description: string;
  icon: string;
}
