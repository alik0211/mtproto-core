// Type definitions for @mtproto/core
// Project: https://github.com/alik0211/mtproto-core
// Definitions by: Ali Gasymov <https://www.gasymov.com/>

export class MTProto {
  constructor(options: {
    api_id: number,
    api_hash: string,
    test?: boolean
  });

  call(method: string, params: object, options?: {
    g: number,
    p: Uint8Array,
    salt1: Uint8Array,
    salt2: Uint8Array,
    gB: Uint8Array,
    password: string,
  }): Promise<object>;

  setDefaultDc(dcId: number): void;

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
