import { Component } from "~/globals/DCGView";
export abstract class Modal<Props = Record<string, unknown>> extends Component<Props & { close: () => void }> {}

export const validModals = ["none", "hotkeys", "switcher"] as const;
export type ModalType = (typeof validModals)[number];
