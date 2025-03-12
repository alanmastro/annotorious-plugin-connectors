import { W3CAnnotation } from '@annotorious/annotorious';
export declare const isW3CRelationLinkAnnotation: (arg: any) => arg is W3CRelationLinkAnnotation;
export declare const isW3CRelationMetaAnnotation: (arg: any) => arg is W3CRelationMetaAnnotation;
export interface W3CRelationLinkAnnotation extends Omit<W3CAnnotation, 'body'> {
    motivation: 'linking';
    body: string;
    target: string;
}
export interface W3CRelationMetaAnnotation extends Omit<W3CAnnotation, 'target'> {
    motivation?: 'tagging';
    target: string;
}
