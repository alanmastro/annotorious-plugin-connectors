import { default as OpenSeadragon } from 'openseadragon';
import { ImageAnnotation, ImageAnnotator } from '@annotorious/annotorious';
import { ConnectorPluginInstance } from './connectorsPlugin';
export declare const mountOSDPlugin: (anno: ImageAnnotator<ImageAnnotation>, viewer: OpenSeadragon.Viewer) => ConnectorPluginInstance;
