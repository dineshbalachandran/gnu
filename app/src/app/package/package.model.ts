

export class Package {
    constructor(
        public no: number, 
        public description: string,
        public committedOn: Date,
        public committedBy: string, 
        public source:string, 
        public status:string) {}
}