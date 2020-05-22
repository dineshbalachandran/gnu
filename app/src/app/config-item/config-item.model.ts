export class ConfigItem {
    constructor (
        public entity: string,
        public entityKey : string,
        public version: string,
        public change: string
    ) {}
}