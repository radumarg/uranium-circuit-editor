/* tslint:disable */
/* eslint-disable */
/**
* @param {string} serialized_circuit
* @param {number} shots
* @param {number | undefined} qubit_count
* @returns {Uint32Array}
*/
export function simulate(serialized_circuit: string, shots: number, qubit_count?: number): Uint32Array;
/**
* @param {string} serialized_circuit
* @param {number | undefined} qubit_count
* @returns {Float32Array}
*/
export function get_probabilities(serialized_circuit: string, qubit_count?: number): Float32Array;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly simulate: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly get_probabilities: (a: number, b: number, c: number, d: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
