interface IMtaConfig {
    host?: string;
    port?: number;
    credentials?: {
        username: string;
        password: string;
    };
    protocol?: "http" | "https";
}
export declare class MtaConnection<ResourceMap extends object = any> {
    private readonly config;
    readonly api: ResourceMap;
    constructor(config?: IMtaConfig);
    private executeCall;
    private getEndpoint;
    private getRequestHeaders;
    private getAuthConfig;
    private initResourceProxy;
}
export default MtaConnection;
