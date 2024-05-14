export interface Repository {
    id:number,
    repoName:string;
    description:string|null;
    topics:Array<string>;
    url:string;
}
