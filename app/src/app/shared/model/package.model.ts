

export enum PackageStatus {
    OPEN = 'Open',
    COMMITTED = 'Committed',
    IMPORTING = 'Importing'
}

export const unpackedPackageNo = '0.0.0';

export class Package {
    constructor(
        public id: number, 
        public no: string, 
        public description: string,
        public createdOn: Date,
        public createdBy: string,
        public committedOn: Date,
        public committedBy: string, 
        public source: string, 
        public status: string) {}
}

export function isPackageMutable(p: Package) {
    return p.status === 'Open';
}