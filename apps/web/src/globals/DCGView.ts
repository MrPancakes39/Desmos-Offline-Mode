// Original File: https://github.com/DesModder/DesModder/blob/main/src/DCGView.ts
import { Desmos } from "./window";

export const { DCGView } = Desmos.Private.Fragile;

type OrConst<T> = {
  [K in keyof T]: T[K] extends (...args: unknown[]) => unknown ? T[K] : T[K] | (() => T[K]);
};

type ToFunc<T> = {
  [K in keyof T]: T[K] extends (...args: unknown[]) => unknown ? T[K] : () => T[K];
};

export abstract class ClassComponent<PropsType extends GenericProps = Record<string, unknown>> {
  props!: ToFunc<PropsType> & { children: unknown };
  // oxlint-disable-next-line typescript/no-useless-constructor, typescript/no-empty-function -- Used by DCGView
  constructor(_props: OrConst<PropsType>) {}
  // oxlint-disable-next-line typescript/no-empty-function -- Used by DCGView
  init(): void {}
  abstract template(): unknown;
  _element!:
    | {
        _domNode: HTMLElement;
      }
    | {
        _domNode: undefined;
        _element: {
          _domNode: HTMLElement;
        };
      };
}

export interface MountedComponent {
  update: () => void;
}

abstract class IfComponent extends ClassComponent<{
  predicate: () => boolean;
}> {}

abstract class ForComponent<T> extends ClassComponent<{
  each: () => Array<T>;
  key: (t: T) => string | number;
}> {}

export interface IfElseSecondParam {
  true: () => ComponentChild;
  false: () => ComponentChild;
}

abstract class InputComponent extends ClassComponent<{
  value: () => string;
  onInput: (s: string) => void;
  required: boolean;
  placeholder: string;
  spellcheck: boolean;
}> {}

/** Switch expects one child which is a function returning a component */
abstract class SwitchComponent extends ClassComponent<{
  key: () => unknown;
}> {}

export interface DCGViewModule {
  Components: {
    For: typeof ForComponent;
    If: typeof IfComponent;
    Input: typeof InputComponent;
    Switch: typeof SwitchComponent;
    SwitchUnion: <Key extends string>(
      discriminant: () => Key,
      branches: Record<Key, () => ComponentChild>
    ) => ComponentTemplate;
    IfElse: (p: () => boolean, v: IfElseSecondParam) => ComponentTemplate;
  };
  Class: typeof ClassComponent;
  const: <T>(v: T) => () => T;
  createElement: <Props extends GenericProps>(
    comp: ComponentConstructor<Props>,
    props: WithCommonProps<ToFunc<Props>>,
    ...children: ComponentChild[]
  ) => ComponentTemplate;
  // couldn't figure out type for `comp`, so I just put | any
  mountToNode: <Props extends GenericProps>(
    comp: ComponentConstructor<Props>,
    el: HTMLElement,
    props: WithCommonProps<ToFunc<Props>>
  ) => MountedComponent;
  unmountFromNode: (el: HTMLElement) => void;
}

export type ComponentConstructor<Props extends GenericProps> = string | typeof ClassComponent<Props>;
// export type GenericProps = Record<string, (...args: any[]) => any>;
type GenericProps = unknown;
interface CommonProps {
  class?: () => string;
  didMount?: (elem: HTMLElement) => void;
  willUnmount?: () => void;
  children?: ComponentChild[];
}
type WithCommonProps<T> = Omit<T, keyof CommonProps> & CommonProps;
export interface ComponentTemplate {
  __nominallyComponentTemplate: undefined;
  children?: ComponentChild;
}
export type ComponentChild = ComponentTemplate | null | string | (() => string);

export const { Class: Component, mountToNode, unmountFromNode } = DCGView;

declare global {
  // oxlint-disable-next-line typescript/no-namespace -- For JSX
  namespace JSX {
    interface IntrinsicAttributes {
      class?: string | Record<string, boolean>;
    }
    interface IntrinsicElements {
      div: unknown;
      i: unknown;
      span: unknown;
      img: unknown;
      p: unknown;
      a: unknown;
      input: unknown;
      label: unknown;
      strong: unknown;
      ul: unknown;
      ol: unknown;
      li: unknown;
      table: unknown;
      thead: unknown;
      tbody: unknown;
      tr: unknown;
      th: unknown;
      td: unknown;
      button: unknown;
      br: unknown;
      h1: unknown;
      h2: unknown;
      hr: unknown;
    }
  }
}

/**
 * If you know React, then you know DCGView.
 * Some exceptions:
 *  - DCGView was forked sometime in 2016, before React Fragments and some other features
 *  - use class instead of className
 *  - there's some function name changes, like React.Component → DCGView.Class,
 *    rerender → template.
 *    However, there are functional differences:
 *    template is only called once with the prop values, see the next point.
 *  - You don't want to write (<div color={this.props.color()}>...) because the prop value is
 *    executed only once and gives a fixed value. If that is what you want,
 *    it is more semantic to do (<div color={DCGView.const(this.props.color())}>...),
 *    but if you want the prop to change on component update, use
 *    (<div color={() => this.props.color()}>...</div>)
 *  - This wrapper automatically calls DCGView.const over bare non-function values,
 *    so be careful. Anything that needs to change should be wrapped in a function
 *  - DCGView or its components impose some requirements, like aria-label being required
 * I have not yet figured out how to set state, but most components should be
 * stateless anyway (state control in Model.js)
 */

export function jsx<Props extends GenericProps>(
  el: ComponentConstructor<Props>,
  props: OrConst<Props>,
  ...children: ComponentChild[]
) {
  /* Handle differences between typescript's expectation and DCGView */
  if (!Array.isArray(children)) {
    children = [children];
  }
  // "Text should be a const or a getter:"
  children = children.map((e) => (typeof e === "string" ? DCGView.const(e) : e));
  const fnProps: Record<string, unknown> = {};
  for (const k in props) {
    // DCGView.createElement also expects 0-argument functions
    if (typeof props[k] !== "function") {
      fnProps[k] = DCGView.const(props[k]);
    } else {
      fnProps[k] = props[k];
    }
  }
  fnProps.children = children.length === 1 ? children[0] : children;
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- DCGView expects function-wrapped props
  return createElementWrapped(el, fnProps as OrConst<Props>);
}

export function createElementWrapped<Props>(
  el: ComponentConstructor<Props>,
  props: OrConst<Props> & { children?: ComponentChild[] }
) {
  const { DCGView } = Desmos.Private.Fragile;
  const isChildrenOutsideProps = DCGView.createElement("div", {}, "third-arg").children === "third-arg";
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- Support both DCGView prop interfaces
  const eltProps = props as WithCommonProps<ToFunc<Props>>;
  if (isChildrenOutsideProps) {
    const { children } = props;
    const childrenArr = children === undefined ? [] : Array.isArray(children) ? children : [children];
    // Old interface
    // TODO-remove-children-props
    return DCGView.createElement(el, eltProps, ...childrenArr);
  }
  return DCGView.createElement(el, eltProps);
}
