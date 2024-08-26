
export default interface RaenaResponse extends JSON {
    data: [Data];
    pageInfo: PageInfo;
}

interface DataMetafields {
    key: string;
    value: string;
}

interface DataOptions {
    id: string;
    name: string;
    values: [string | null];
}

interface Image {
    url: string,
    altText: string | null,
    width: number,
    height: number
}

interface Price {
    amount: string,
    currencyCode: "IDR" | "USD" | string 
}

interface Variant {
    id: string,
    title: String,
    availableForSale: false,
    selectedOptions: [DataMetafields],
    price: Price
}

interface Data {
    availableForSale: boolean,
    id: string,
    handle: string,
    productType: string,
    title: string,
    vendor: string,
    description: string,
    descriptionHtml: string,
    totalInventory: number,
    metafields: [DataMetafields | null],
    options: [DataOptions | null],
    featuredImage: Image,
    tags: [string],
    updatedAt: string,
    images: [Image?],
    variants: [Variant?]
}

interface PageInfo {
    endCursor: string;
    hasNextPage: boolean,
    hasPreviousPage: boolean,
    startCursor: string;
}