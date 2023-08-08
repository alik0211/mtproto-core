import RPC from './rpc';
import { Error, Methods } from './tl/types/schema';

type MethodReturnMap<T extends Methods> = {
  [K in keyof T]: T[K] extends { return: infer R } ? R : never;
};

type MethodOptions = {
  syncAuth?: boolean;
  dcId?: number;
};

declare class CustomStorage {
  set(key: string, value: string): Promise<void>;
  get(key: string): Promise<string | null>;
}

declare class MTProto {
  constructor(options: {
    api_id: number;
    api_hash: string;
    test?: boolean;
    storageOptions?: {
      instance: CustomStorage;
    };
  });

  /**
   * @throws {MTProtoError}
   */
  call<T extends keyof Methods>(
    method: T,
    params: Methods[T]['params'],
    options?: MethodOptions,
  ): Promise<MethodReturnMap<Methods>[T]>;

  syncAuth(
    dcId: number,
  ): Promise<(MethodReturnMap<Methods>['auth.importAuthorization'] | undefined)[]>;

  setDefaultDc(dcId: number): ReturnType<InstanceType<typeof CustomStorage>['set']>;

  getRPC(dcId: number): InstanceType<typeof RPC>;

  updateInitConnectionParams(params: Record<string, string>): void;
}

export { CustomStorage, Methods, MethodReturnMap, MethodOptions, Error };
export default MTProto;
