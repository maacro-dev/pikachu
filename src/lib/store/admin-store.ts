import { map } from "nanostores";

interface AdminStore {
  data: {
    districts: any[];
    municipalities: any[];
    attractions: any[];
    foods: any[];
    festivals: any[];
    events: any[];
  },
  path: string,
  drawerOpen: boolean;
  editingItem: any | null;
  hydrated: boolean;
}

export const $adminData = map<AdminStore>({
  data: {
    districts: [],
    municipalities: [],
    attractions: [],
    foods: [],
    festivals: [],
    events: [],
  },
  path: '',
  drawerOpen: false,
  editingItem: null,
  hydrated: false
});


export const openDrawer = (item: any | null = null) => {
  $adminData.setKey("drawerOpen", true);
  $adminData.setKey("editingItem", item);
};

export const closeDrawer = () => {
  $adminData.setKey("drawerOpen", false);
  $adminData.setKey("editingItem", null);
};
