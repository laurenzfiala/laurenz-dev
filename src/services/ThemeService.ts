import { type Ref, ref } from 'vue';

type ThemeContrast = 'high' | 'low';
type ThemeFontScale = 'normal' | 'lg' | 'xl';
type ThemeAppearance = 'system' | 'dark' | 'light';
export class ThemeService {
  private static readonly KEY_CONTRAST = 'theme-contrast';
  private static readonly KEY_FONT_SCALE = 'theme-font-scale';
  private static readonly KEY_APPEARANCE = 'theme-appearance';

  contrast: Ref<ThemeContrast> = ref('low');
  fontScale: Ref<ThemeFontScale> = ref('normal');
  appearance: Ref<ThemeAppearance> = ref('dark');

  constructor() {
    this.setContrast((localStorage.getItem(ThemeService.KEY_CONTRAST) as ThemeContrast) ?? 'low');
    this.setFontScale(
      (localStorage.getItem(ThemeService.KEY_FONT_SCALE) as ThemeFontScale) ?? 'normal'
    );
    this.setAppearance(
      (localStorage.getItem(ThemeService.KEY_APPEARANCE) as ThemeAppearance) ?? 'dark'
    );

    this.listenSystemColorSchemeChanges();
  }

  setContrast(value: ThemeContrast) {
    this.switchClass(ThemeService.KEY_CONTRAST, this.contrast.value, value);
    this.contrast.value = value;
    localStorage.setItem(ThemeService.KEY_CONTRAST, value);
  }

  setFontScale(value: ThemeFontScale) {
    this.switchClass(ThemeService.KEY_FONT_SCALE, this.fontScale.value, value);
    this.fontScale.value = value;
    localStorage.setItem(ThemeService.KEY_FONT_SCALE, value);
  }

  setAppearance(value: ThemeAppearance) {
    const systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const systemAppearance: ThemeAppearance = systemIsDark ? 'dark' : 'light';
    this.switchClass(
      ThemeService.KEY_APPEARANCE,
      this.appearance.value,
      value === 'system' ? systemAppearance : value
    );
    this.appearance.value = value;
    localStorage.setItem(ThemeService.KEY_APPEARANCE, value);
  }

  private switchClass(key: string, oldClass: string, newClass: string) {
    const bodyClassList = document.documentElement.classList;
    const removeClasses: string[] = [];
    bodyClassList.forEach((clazz) => {
      if (clazz.startsWith(key)) {
        removeClasses.push(clazz);
      }
    });
    bodyClassList.remove(...removeClasses);
    bodyClassList.add(`${key}-${newClass}`);
  }

  private listenSystemColorSchemeChanges() {
    const checkColorScheme = (e: MediaQueryList | MediaQueryListEvent) => {
      if (this.appearance.value === 'system') {
        this.switchClass(
          ThemeService.KEY_APPEARANCE,
          this.appearance.value,
          e.matches ? 'dark' : 'light'
        );
      }
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    checkColorScheme(mediaQuery);
    mediaQuery.addEventListener('change', (e) => checkColorScheme(e));
  }
}
