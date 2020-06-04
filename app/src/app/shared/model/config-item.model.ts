export class ConfigItem {
    constructor (
        public id: number,
        public entity: string,
        public entityKey : string,
        public versionNo: string,
        public change: string
    ) {}
}