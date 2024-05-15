export interface imageGame{
    photos:photo[];
} 
export interface photo{
    title:string;
    id:string;
    src:link;
    alt:string;
    photographer: string;
} 
export interface link{
    original:string;
    medium:string;
} 