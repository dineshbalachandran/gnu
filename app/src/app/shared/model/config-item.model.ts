export class ConfigItem {
    constructor (
        public no: string,
        public entity: string,
        public entityKey : string,
        public version: string,
        public change: string
    ) {}
}