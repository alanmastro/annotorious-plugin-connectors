import { ConnectionAnnotation } from '../ConnectionAnnotation';
import { W3CRelationLinkAnnotation, W3CRelationMetaAnnotation } from './W3CRelationAnnotation';
import { FormatAdapter, ImageAnnotation, ParseResult, W3CImageAnnotation, W3CImageFormatAdapter, W3CImageFormatAdapterOpts } from '@annotorious/openseadragon';
type W3CAnnotationOrRelation = W3CImageAnnotation | W3CRelationLinkAnnotation | [W3CRelationLinkAnnotation, W3CRelationMetaAnnotation];
export type W3CRelationFormatAdapter = FormatAdapter<ImageAnnotation | ConnectionAnnotation, W3CAnnotationOrRelation>;
export declare const W3CImageRelationFormat: (source: string, opts?: W3CImageFormatAdapterOpts) => W3CRelationFormatAdapter;
export declare const parseW3C: (arg: W3CAnnotationOrRelation, imageAdapter: W3CImageFormatAdapter) => ParseResult<ImageAnnotation | ConnectionAnnotation>;
export declare const serializeW3C: (annotation: ImageAnnotation | ConnectionAnnotation, imageAdapter: W3CImageFormatAdapter) => W3CImageAnnotation | W3CRelationLinkAnnotation | [W3CRelationLinkAnnotation, W3CRelationMetaAnnotation];
export {};
