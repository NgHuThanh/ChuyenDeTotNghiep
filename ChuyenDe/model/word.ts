export interface set{
    vocabs:vocab[];
    create:Date;
    name:string;
}
export interface vocab{
    word:string;
    definition:string;
    lastPractice:Date;
    difficult:string;
    favorite:boolean;
} 