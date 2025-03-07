interface IAuthOptions {
    user: string;
    password: string;
}

interface IMtaConfig {
    host?: string;
    port?: number;
    credentials?: {
        username: string;
        password: string;
    };
    protocol?: "http" | "https";
}

export class MtaConnection<ResourceMap extends object = any> {
    private readonly config: IMtaConfig;
    public readonly api: ResourceMap;

    constructor(config: IMtaConfig = {}) {
        this.config = {
            host: config.host || "127.0.0.1",
            port: config.port || 22005,
            protocol: config.protocol || "http",
            credentials: config.credentials
        };
        
        this.api = this.initResourceProxy();
    }

    private async executeCall<ResponseType>(
        resource: keyof ResourceMap,
        procedure: string,
        params: unknown[]
    ): Promise<ResponseType> {
        const endpoint = this.getEndpoint(resource, procedure);
        const auth = this.getAuthConfig();
        
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                ...this.getRequestHeaders(),
                ...(auth && {
                    'Authorization': 'Basic ' + btoa(`${auth.user}:${auth.password}`)
                })
            },
            body: JSON.stringify(params)
        });

        const data = await response.json();
        return data[0];
    }

    private getEndpoint(resource: keyof ResourceMap, procedure: string): string {
        return `${this.config.protocol}://${this.config.host}:${this.config.port}/${String(resource)}/call/${procedure}`;
    }

    private getRequestHeaders() {
        return {
            "Content-type": "application/json",
            "User-Agent": `MTA:SA Node JS`
        };
    }

    private getAuthConfig(): IAuthOptions | undefined {
        return this.config.credentials 
            ? {
                user: this.config.credentials.username,
                password: this.config.credentials.password
              }
            : undefined;
    }

    private initResourceProxy(): ResourceMap {
        return new Proxy({} as ResourceMap, {
            get: (_, resourceName: string) => {
                return new Proxy({}, {
                    get: (_, procedureName: string) => {
                        return (...args: unknown[]) => 
                            this.executeCall(resourceName as keyof ResourceMap, procedureName, args);
                    }
                });
            }
        });
    }
}

export default MtaConnection;