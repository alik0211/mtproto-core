// Type definitions for @mtproto/core
// Project: https://github.com/alik0211/mtproto-core
// Definitions by: Ali Gasymov <https://www.gasymov.com/>

declare class MyAsyncLocalStorage {
  setItem(key: string, value: string): Promise<void>;
  getItem(key: string): Promise<string|null>;
}

export class MTProto {
  constructor(options: {
    api_id: number,
    api_hash: string,
    test?: boolean,
    customLocalStorage?: MyAsyncLocalStorage
  });

  call(method: string, params: object, options?: {
    dcId?: number,
    syncAuth?: boolean,
  }): Promise<object>;

  setDefaultDc(dcId: number): Promise<string>;

  updates: {
    on(updateName: string, handler: Function): void;
    off(updateName: string): void;
    removeAllListeners(): void;
  }
}

export function getSRPParams(params: {
  g: number,
  p: Uint8Array,
  salt1: Uint8Array,
  salt2: Uint8Array,
  gB: Uint8Array,
  password: string,
}): Promise<{
  A: Uint8Array,
  M1: Uint8Array
}>
