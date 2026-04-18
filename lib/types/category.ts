export type Category = {
  id?: string;
  name: string;
  parentId: string | null;
  icon: string | null;
  homepageVisible: boolean;
  createdBy?: string | null;
  createdDate?: string;
};
