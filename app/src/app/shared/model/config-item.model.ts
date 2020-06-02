export class ConfigItem {
    constructor (
        public id: number,
        public entity: string,
        public entityKey : string,
        public version: string,
        public change: string
    ) {}
}