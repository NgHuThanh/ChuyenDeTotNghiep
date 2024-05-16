export interface grammar{
    title:string;
    id:string;
    contents:content[];
    questions:question[];
} 
export interface content{
    lesson:string[];
}
export interface question{
    questionWord:string;
    answer:string[];
    rightAnswer:number;
}