export interface grammar{
    title:string;
    id:string;
    contentAndQuestions:contentAndQuestion[];
} 
export interface contentAndQuestion{
    contents:content[];
    questions:question[];
    main:string;
    id:string;
}
export interface content{
    content:string;
    example:string;
}
export interface question{
    question:string;
    answers:string[];
    rightAnswer:number;
}