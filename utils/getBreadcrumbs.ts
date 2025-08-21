import { menuConfig, MenuId } from "../src/types/menuConfig";

export function getBreadcrumbs(pathname: string): string[] {
  function findPath(
    menu: typeof menuConfig[MenuId],
    targetPath: string,
    trail: string[] = []
  ): string[] | null {
    const newTrail = [...trail, menu.label];

    // if exact parent match, stop here
    if (menu.parenthref && targetPath === menu.parenthref) {
      return newTrail;
    }

    // otherwise, search inside links
    for (const link of menu.links) {
      // exact or deeper match
      if (link.href === targetPath) {
        return [...newTrail, link.label];
      }
      if (targetPath.startsWith(link.href + "/")) {
        return [...newTrail, link.label];
      }

      if ((link as any).links) {
        const nested = findPath(link as any, targetPath, [...newTrail, link.label]);
        if (nested) return nested;
      }
    }

    // if path starts with parent but no exact match, keep parent only
    if (menu.parenthref && targetPath.startsWith(menu.parenthref + "/")) {
      return newTrail;
    }

    return null;
  }

  for (const key in menuConfig) {
    const menu = menuConfig[key as MenuId];
    const result = findPath(menu, pathname, []);
    if (result) return result;
  }

  return ["Dashboard"]; // fallback
}
