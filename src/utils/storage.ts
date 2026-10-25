import { AppStorage, ProfileKey, UserStats } from '../types';

const STORAGE_KEY = 'tjsp_estudos_gabriel_esposa_v1';

const defaultUserStats = (name: string): UserStats => ({
  profileName: name,
  totalStudyMinutes: 0,
  completedTopicIds: [],
  topicMetrics: {},
  savedEssays: [],
  studyLogs: [],
});

const defaultStorage: AppStorage = {
  profiles: {
    gabriel: defaultUserStats('Gabriel'),
    esposa: defaultUserStats('Esposa'),
  },
  activeProfile: 'gabriel',
};

export const getStorageData = (): AppStorage => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultStorage;
    const parsed = JSON.parse(raw);
    return {
      ...defaultStorage,
      ...parsed,
      profiles: {
        gabriel: { ...defaultStorage.profiles.gabriel, ...(parsed.profiles?.gabriel || {}) },
        esposa: { ...defaultStorage.profiles.esposa, ...(parsed.profiles?.esposa || {}) },
      },
    };
  } catch (e) {
    console.error('Erro ao ler localStorage', e);
    return defaultStorage;
  }
};

export const saveStorageData = (data: AppStorage) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Erro ao salvar no localStorage', e);
  }
};

export const exportDataAsJSON = () => {
  const data = getStorageData();
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `tjsp_estudos_backup_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};

export const importDataFromJSON = (jsonString: string): boolean => {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.profiles && parsed.activeProfile) {
      saveStorageData(parsed);
      return true;
    }
    return false;
  } catch (e) {
    console.error('JSON inválido para importação', e);
    return false;
  }
};
