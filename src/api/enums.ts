const frequencyLabels: Record<number, string> = {
  1: "dnevno",
  7: "nedeljno",
  14: "dvonedeljno",
  30: "mesečno"
}

export const naturalizeFrequency = (frequency: number | null) => {
  if (!frequency || !frequencyLabels[frequency]) {
    return "";
  }

  return frequencyLabels[frequency];
}
