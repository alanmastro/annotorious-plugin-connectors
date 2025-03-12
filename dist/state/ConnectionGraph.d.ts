import { Annotation, Store } from '@annotorious/annotorious';
export type ConnectionGraph = ReturnType<typeof createConnectionGraph>;
export declare const createConnectionGraph: <T extends Annotation>(store: Store<T>) => {
    destroy: () => void;
    isConnected: (fromId: string, toId: string) => boolean;
};
