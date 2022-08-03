
export type url = string;

export type Privat24 = {
    readonly ccy: string,
    base_ccy?: string,
    buy: number,
    sale?: number,
}

export type NBUStateService = {
    r030?: number,
    txt?: string,
    readonly cc: string,
    rate: number,
    exchangedate?: any, 
}

export type unifiedCurrencyData = {
    readonly rate: number,
    readonly ccy: string,
    sale?: number,
    exchangedate?: any,
    txt?: string,
}

export type conversionCurrency = {
    readonly rate: number,
    inputVal: number | ' ',
    ccy: string,
    gotFocused: boolean,
}