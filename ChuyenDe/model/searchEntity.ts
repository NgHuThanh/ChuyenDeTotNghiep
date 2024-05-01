export interface Word {
    word: string;
    phonetic:string;
    phonetics:Phonetic[];
    meanings:Meaning[];
  }
export interface Meaning{
  partOfSpeech:string;
  definitions:Definition[];
}
export interface Phonetic{
  audio:string;
}
export interface Definition{
  definition:string;
  example:string;
}