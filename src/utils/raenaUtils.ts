import RaenaResponse from "../dto/RaenaResponse";
import CrawlingExeption from "../exception/CrawlingException";

export const validResponse = (data: string): number => {
    const pattern = `{"data":[`
    const index = data.lastIndexOf(pattern);

    if (!index) {
        throw new CrawlingExeption(`Can't find pattern of ${pattern} at "${data.substring(0,50)}"`)
    }

    return index;
}

export const responseToJSONStringify = (data: string, startIndex: number): string => {
    return data.substring(startIndex);
}

export const toRaenaResponseObject = (data: string): RaenaResponse => {
    return toJson(data);
}

export const toJson = (data: string): any => {
    return JSON.parse(data);
} 