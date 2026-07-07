import { setIcon } from "obsidian";
import { SlateIconInput, resolveSlateIcon } from "../icons/slateIcons";

interface SlateIconOptions {
  ariaLabel?: string;
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export function createSlateIcon(
  parent: HTMLElement,
  icon: SlateIconInput,
  options: SlateIconOptions = {}
): HTMLElement {
  const iconEl = parent.createSpan({
    cls: classNames("slate-icon", options.className),
    attr: options.ariaLabel
      ? { "aria-label": options.ariaLabel, role: "img" }
      : { "aria-hidden": "true" }
  });

  setIcon(iconEl, resolveSlateIcon(icon));
  applyIconOptions(iconEl, options);
  return iconEl;
}

export function setSlateIcon(
  el: HTMLElement,
  icon: SlateIconInput,
  options: SlateIconOptions = {}
): void {
  el.empty();
  createSlateIcon(el, icon, options);
}

function applyIconOptions(el: HTMLElement, options: SlateIconOptions): void {
  const props: Record<string, string> = {};
  if (options.size) {
    props["--slate-icon-size"] = `${options.size}px`;
  }
  if (options.strokeWidth) {
    props["--slate-icon-stroke-width"] = String(options.strokeWidth);
  }
  if (Object.keys(props).length > 0) {
    el.setCssProps(props);
  }
}

function classNames(...parts: Array<string | undefined | false>): string {
  return parts.filter(Boolean).join(" ");
}
