import { createSlateIcon } from "./ui/components/SlateIcon";

export type SlateButtonVariant = "default" | "primary" | "danger" | "destructive" | "ghost";
export type SlateButtonSize = "sm" | "md";
export type SlateChipVariant = "default" | "outline" | "muted";

type SlateAttrs = Record<string, string>;

interface SlateButtonOptions {
  text?: string;
  icon?: string;
  variant?: SlateButtonVariant;
  size?: SlateButtonSize;
  className?: string;
  attr?: SlateAttrs;
  disabled?: boolean;
}

interface SlateIconButtonOptions extends Omit<SlateButtonOptions, "text"> {
  ariaLabel: string;
}

interface SlateChipOptions {
  text?: string;
  icon?: string;
  variant?: SlateChipVariant;
  className?: string;
  attr?: SlateAttrs;
}

interface SlateTextInputOptions {
  type?: string;
  value?: string;
  placeholder?: string;
  className?: string;
  attr?: SlateAttrs;
}

interface SlateActionRowOptions {
  className?: string;
}

const BUTTON_VARIANTS: Record<SlateButtonVariant, string> = {
  default: "",
  primary: "slate-ui-button-primary slate-button-primary",
  danger: "slate-ui-button-danger slate-button-danger",
  destructive: "slate-ui-button-destructive slate-button-destructive",
  ghost: "slate-ui-button-ghost"
};

const BUTTON_SIZES: Record<SlateButtonSize, string> = {
  sm: "slate-ui-button-sm",
  md: "slate-ui-button-md"
};

const CHIP_VARIANTS: Record<SlateChipVariant, string> = {
  default: "",
  outline: "slate-ui-chip-outline",
  muted: "slate-ui-chip-muted"
};

export function createSlateButton(
  parent: HTMLElement,
  options: SlateButtonOptions = {}
): HTMLButtonElement {
  const button = parent.createEl("button", {
    cls: classNames(
      "slate-ui-button",
      "slate-button",
      BUTTON_VARIANTS[options.variant || "default"],
      BUTTON_SIZES[options.size || "md"],
      options.className
    ),
    attr: {
      type: "button",
      ...(options.attr || {})
    }
  });

  if (options.icon) {
    createSlateIcon(button, options.icon, { className: "slate-ui-icon" });
  }
  if (options.text) {
    button.createSpan({ cls: "slate-ui-button-label", text: options.text });
  }
  if (options.disabled) {
    button.setAttr("disabled", "true");
  }

  return button;
}

export function createSlateIconButton(
  parent: HTMLElement,
  options: SlateIconButtonOptions
): HTMLButtonElement {
  return createSlateButton(parent, {
    ...options,
    className: classNames("slate-ui-icon-button", options.className),
    attr: {
      "aria-label": options.ariaLabel,
      ...(options.attr || {})
    }
  });
}

export function createSlateChip(parent: HTMLElement, options: SlateChipOptions): HTMLElement {
  const chip = parent.createSpan({
    cls: classNames(
      "slate-ui-chip",
      CHIP_VARIANTS[options.variant || "default"],
      options.className
    ),
    attr: options.attr
  });

  if (options.icon) {
    createSlateIcon(chip, options.icon, { className: "slate-ui-icon" });
  }
  if (options.text) {
    chip.createSpan({ cls: "slate-ui-chip-label", text: options.text });
  }

  return chip;
}

export function createSlateTextInput(
  parent: HTMLElement,
  options: SlateTextInputOptions = {}
): HTMLInputElement {
  return parent.createEl("input", {
    cls: classNames("slate-ui-input", options.className),
    attr: {
      type: options.type || "text",
      ...(options.placeholder ? { placeholder: options.placeholder } : {}),
      ...(options.value ? { value: options.value } : {}),
      ...(options.attr || {})
    }
  });
}

export function createSlateActionRow(
  parent: HTMLElement,
  options: SlateActionRowOptions = {}
): HTMLElement {
  return parent.createDiv({
    cls: classNames("slate-ui-actions", options.className)
  });
}

export function createSlateBottomBar(
  parent: HTMLElement,
  options: SlateActionRowOptions = {}
): HTMLElement {
  return parent.createDiv({
    cls: classNames("slate-ui-bottom-bar", options.className)
  });
}

function classNames(...parts: Array<string | undefined | false>): string {
  return parts.filter(Boolean).join(" ");
}
