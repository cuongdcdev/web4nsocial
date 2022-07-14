import {context, util, u128, logging, storage } from 'near-sdk-as'

// web4 

@nearBindgen
export class Web4Request {
    accountId: string | null;
    path: string;
    params: Map<string, string>;
    query: Map<string, Array<string>>;
    preloads: Map<string, Web4Response>;
}

@nearBindgen
export class Web4Response {
    contentType: string;
    status: u32;
    body: Uint8Array;
    bodyUrl: string;
    preloadUrls: string[] = [];
}

export class HtmlAttributes {
    id: string | null;
    name: string | null;
    class: string | null;
    style: string | null;

    toString(): string {
        let result = "";
        if (this.id) {
            result += "id=";
            result += this.id!;
        }
        if (this.name) {
            result += "name=";
            result += this.name!;
        }
        if (this.class) {
            result += "class=";
            result += this.class!;
        }
        if (this.style) {
            result += "style=";
            result += this.style!;
        }
        return result;
    }
}

export class HtmlFormAttributes extends HtmlAttributes {
    action: string | null;
    method: string = "POST";

    toString(): string {
        let result = super.toString();
        if (this.action) {
            result += "action=";
            result += this.action!;
        }
        if (this.method) {
            result += "method=";
            result += this.method;
        }
        return result;
    }
}

export function htmlResponse(text: string): Web4Response {
    return { contentType: 'text/html; charset=UTF-8', body: util.stringToBytes(text) };
}

export function preloadUrls(urls: string[]): Web4Response {
    return { preloadUrls: urls };
}

export function bodyUrl(url: string): Web4Response {
    return { bodyUrl: url };
}

export function status(status: u32): Web4Response {
    return { status };
}

export function assertOwner(): void {
    // NOTE: Can change this check to alow different owners
    assert(context.sender == context.contractName);
}

export const WEB4_STATIC_URL_KEY = 'web4:staticUrl';

