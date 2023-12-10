import { Component } from "#DCGView";
export abstract class Modal<Props = Record<string, unknown>> extends Component<Props & { close: () => void }> {}

export const validModals = ["none", "new-graph"] as const;
export type ModalType = (typeof validModals)[number];
