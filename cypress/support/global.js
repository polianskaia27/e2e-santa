// cypress/support/global.js
let globalInviteLink = "";
let globalBoxId = "";

export const setGlobalInviteLink = (link) => {
  globalInviteLink = link;
};

export const setGlobalBoxId = (boxId) => {
  globalBoxId = boxId;
};

export const getGlobalInviteLink = () => globalInviteLink;
export const getGlobalBoxId = () => globalBoxId;
