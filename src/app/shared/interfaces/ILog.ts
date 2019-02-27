export interface ILog {
    key: string;
    paciente: string; // id
    fecha: Date;
    operacion: string;
    usuario: any;
    app: any;
    organizacion: any;
    data: {
        anterior: any,
        valor: any
    };
    cliente: {
        ip: string,
        userAgent: { // schema de plugin https://github.com/biggora/express-useragent
            isMobile: boolean,
            isDesktop: boolean,
            isBot: boolean,
            browser: string,
            version: string,
            os: string,
            platform: string,
            source: string
        }
    };
    servidor: {
        ip: string
    };
}
