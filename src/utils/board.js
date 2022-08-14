export const getCellTextColor = (minesNeighbor) => {
  switch (minesNeighbor) {
    case 1:
      return "blue";
    case 2:
      return "green";
    case 3:
      return "red";
    case 4:
      return "darkblue";
    case 5:
      return "darkred";
    case 6:
      return "darkcyan";
    case 8:
      return "dimgray";
    default:
      return "black";
  }
};
