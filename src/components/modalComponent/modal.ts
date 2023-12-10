import { Component } from "#DCGView";
export abstract class Modal extends Component<{ title: string; close: () => void }> {}

export const validModals = ["none", "show"] as const;
export type ModalType = (typeof validModals)[number];
