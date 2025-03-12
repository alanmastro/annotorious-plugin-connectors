import { ImageAnnotation } from '@annotorious/annotorious';
import { Connection, FloatingConnectionHandle, Path } from './model';
export declare const getConnection: (source: ImageAnnotation, target: FloatingConnectionHandle | ImageAnnotation) => Connection;
export declare const computePath: (connection: Connection, r?: number) => Path;
