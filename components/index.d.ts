export class SlangType extends HTMLElement {}
export class SlangFlow extends HTMLElement {}
export function registerSlangElements(): void;
export interface SlangNodeSelectDetail {
  id: 'input' | 'source' | 'transform' | 'format' | 'output';
}
declare global {
  interface HTMLElementTagNameMap {
    'slang-type': SlangType;
    'slang-flow': SlangFlow;
  }
  interface GlobalEventHandlersEventMap {
    'slang-node-select': CustomEvent<SlangNodeSelectDetail>;
  }
}
