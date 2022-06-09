export interface Ward {
  id: string;
  name: string;
}

export interface SubCounty {
  id: string;
  name: string;
  wards: Array<Ward>;
}

export interface County {
  id: string;
  name: string;
  subCounties: Array<SubCounty>;
}

export interface DropdownSelectedItem {
  selectedItem: { id: string; label: string };
}
