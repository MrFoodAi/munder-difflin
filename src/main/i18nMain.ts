/**
 * Main-process strings (native menu, dialogs, desktop notifications).
 *
 * The renderer owns the language choice (i18next + localStorage). It mirrors the
 * picked code into config.uiLanguage after onboarding, and the main process reads
 * it from there. Unset = English, so a fresh install and every existing test
 * behave exactly as before until the renderer has reported a language.
 *
 * Only Italian is carried here; any other language falls back to the English
 * source string passed at the call site.
 */

type Vars = Record<string, string | number>;

const IT: Record<string, string> = {
  // menu
  'menu.file': 'File',
  'menu.edit': 'Modifica',
  'menu.view': 'Vista',
  'menu.window': 'Finestra',
  'menu.newFloor': 'Nuovo piano',
  'menu.close': 'Chiudi finestra',
  'menu.quit': 'Esci',
  'menu.undo': 'Annulla',
  'menu.redo': 'Ripeti',
  'menu.cut': 'Taglia',
  'menu.copy': 'Copia',
  'menu.paste': 'Incolla',
  'menu.selectAll': 'Seleziona tutto',
  'menu.reload': 'Ricarica',
  'menu.forceReload': 'Forza ricarica',
  'menu.devTools': 'Strumenti per sviluppatori',
  'menu.resetZoom': 'Dimensione reale',
  'menu.zoomIn': 'Ingrandisci',
  'menu.zoomOut': 'Riduci',
  'menu.fullscreen': 'Schermo intero',
  'menu.minimize': 'Riduci a icona',
  'menu.zoom': 'Zoom',
  'menu.front': 'Porta tutto in primo piano',
  'menu.about': 'Informazioni su {{app}}',
  'menu.services': 'Servizi',
  'menu.hide': 'Nascondi {{app}}',
  'menu.hideOthers': 'Nascondi altre',
  'menu.unhide': 'Mostra tutte',
  'menu.quitApp': 'Esci da {{app}}',
  // dialogs
  'dialog.importHires': 'Importa manifest di assunzione',
  'dialog.hireManifest': 'Manifest di assunzione',
  'dialog.pickFolder': 'Scegli una cartella',
  'dialog.addKgDocs': 'Aggiungi documenti al Knowledge Graph',
  'dialog.attachFiles': 'Allega immagini o file',
  'dialog.images': 'Immagini',
  'dialog.allFiles': 'Tutti i file',
  'dialog.closeFloor': 'Chiudi piano',
  'dialog.cancel': 'Annulla',
  'dialog.closeFloorOne': 'Chiudere questo piano? {{count}} terminale in esecuzione verrà fermato.',
  'dialog.closeFloorMany': 'Chiudere questo piano? {{count}} terminali in esecuzione verranno fermati.',
  'dialog.otherFloors': 'Gli altri piani continuano a funzionare.',
  // notifications
  'notify.constrained': '{{name}} limitato',
  'notify.stopped': '{{name}} fermato dall\'interruttore di sicurezza',
  'notify.degraded': 'Agente in modalità ridotta',
  'notify.needRestart': 'Gli agenti devono essere riavviati',
  'notify.deadAfterSleep': '{{count}} terminali degli agenti non sono sopravvissuti allo stop — riaprili per riprendere.',
  'notify.agent': 'Agente',
  'notify.finished': 'finito — inattivo',
  'notify.attention': 'ha bisogno della tua attenzione',
  'notify.hooksDown': 'Gli hook dell\'hive non funzionano',
  'notify.hooksDownBody': 'Nessuno è in ascolto su {{sock}} ({{code}}). Ogni hook degli agenti viene consentito e nessun costo viene registrato finché il problema non si risolve.'
};

const TABLES: Record<string, Record<string, string>> = { it: IT };

/** Translate `key` into `lang`, falling back to the English source `en`. */
export function tm(lang: string | undefined | null, key: string, en: string, vars?: Vars): string {
  const s = (lang && TABLES[lang]?.[key]) || en;
  if (!vars) return s;
  return s.replace(/\{\{(\w+)\}\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
}
