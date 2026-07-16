export type DataPoint = {
  label: string;
  value: number;
  group: "Growth" | "Reach" | "Retention";
};

export const sampleData: DataPoint[] = [
  { label: "Jan", value: 34, group: "Growth" },
  { label: "Feb", value: 55, group: "Growth" },
  { label: "Mar", value: 47, group: "Reach" },
  { label: "Apr", value: 72, group: "Reach" },
  { label: "May", value: 64, group: "Retention" },
  { label: "Jun", value: 91, group: "Retention" },
  { label: "Jul", value: 83, group: "Growth" },
  { label: "Aug", value: 106, group: "Reach" },
];
