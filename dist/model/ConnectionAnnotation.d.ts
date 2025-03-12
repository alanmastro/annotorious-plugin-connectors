import { Annotation, AnnotationTarget } from '@annotorious/annotorious';
export declare const isConnectionAnnotation: <T extends Annotation>(annotation: T | ConnectionAnnotation) => annotation is ConnectionAnnotation;
export interface ConnectionAnnotation extends Annotation {
    motivation: 'linking';
    target: ConnectionAnnotationTarget;
}
export interface ConnectionAnnotationTarget extends AnnotationTarget {
    selector: {
        from: string;
        to: string;
    };
}
