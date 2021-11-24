export declare class Debug {
    static maxLogs: number;
    static logs: Log[];
    private static _onAddLogCallbacks;
    private static _onClearLogsCallbacks;
    static clear(): void;
    static log(message: string): void;
    static logError(message: string): void;
    static logWarning(message: string): void;
    private static addLog;
    static onAddLog(callback: (log: Log) => void): {
        stop: () => void;
    };
    static onClearLogs(callback: () => void): {
        stop: () => void;
    };
    private static flushOnAddLogCallbacks;
    private static flushOnClearLogsCallbacks;
}
export declare class Log {
    message: string;
    protected _type: 'Log' | 'Error' | 'Warning';
    get type(): "Log" | "Error" | "Warning";
    constructor(message: string);
}
export declare class Error extends Log {
    constructor(message: string);
}
export declare class Warning extends Log {
    constructor(message: string);
}
