import { ImageAnnotation, ImageAnnotator } from '@annotorious/annotorious';
import { Point } from './model';
export interface ConnectorPluginInstance {
    getMidpoint(id: string): Point | undefined;
    setEnabled(enabled: boolean): void;
    unmount(): void;
}
export declare const mountPlugin: (anno: ImageAnnotator<ImageAnnotation>) => ConnectorPluginInstance;
