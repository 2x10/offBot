declare module 'whois-json' {
    interface WhoisResult {
        domain?: string;
        registrar?: string;
        creationDate?: string;
        expirationDate?: string;
        nameServers?: string[];
        [key: string]: any;
    }
    
    const whois: (query: string, options?: any) => Promise<WhoisResult>;
    export default whois;
}