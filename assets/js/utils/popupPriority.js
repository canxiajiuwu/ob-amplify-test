const popupHierarchyObj = {
  saveInfo: 1,
  systemMaintenance: 2,
  languageSelectionBox: 3,
  publicPopUpBox: 4,
  giftCollection: 5,
  winningNotification: 6,
  giftOrFreeBetExpire: 7,
  orderSharing: 8,
  sportsPromos: 9,
  homePopUp: 10,
  webApp: 11
}
const sensingType = (type) => {
  if (!popupHierarchyObj[type]) {
    console.error('popupHierarchyObj no type')
  }
  return !popupHierarchyObj[type]
}
const popupsBeingDisplayedList = []
/**
 * 能否弹出，能那么在popupsBeingDisplayedList加入这个类型
 * @param {type} param0 检测的弹窗类型
 * @returns 能否弹出
 */
export const popUpWindowDetection = ({ type }) => {
  if (sensingType(type)) return false
  const item = popupsBeingDisplayedList[popupsBeingDisplayedList.length - 1]
  if (!item || popupHierarchyObj[item] >= popupHierarchyObj[type]) {
    popupsBeingDisplayedList.push(type)
    return true
  }
  return false
}
// 关闭弹窗时，移除正在弹出的弹窗列表
export const removesPopupsBeingDisplayedList = ({ type }) => {
  const index = popupsBeingDisplayedList.lastIndexOf(type)
  index > -1 && popupsBeingDisplayedList.splice(index, 1)
}
/**
 * 显示的层级，由弹窗的权重决定显示的层级，最高为21
 * @param {type} param0 获取的弹窗类型
 * @returns 层级
 */
export const getPopupHierarchy = ({ type }) => {
  if (sensingType(type)) return -1
  return Object.keys(popupHierarchyObj).length - popupHierarchyObj[type] + 13
}
