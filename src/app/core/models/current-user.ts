export class CurrentUser {
    public userID = "";
    public groupID = "";
    public groupName = "";
    public name = "";
    public userName = "";
    public todaysDate = "";
    public menu = Array<Menu>();

    constructor(currentUserInfo: any = {}) {
        this.userID = currentUserInfo?.userID || "";
        this.groupID = currentUserInfo?.groupID || "";
        this.groupName = currentUserInfo?.groupName || "";
        this.todaysDate = currentUserInfo?.todaysDate || "";
        this.name = currentUserInfo?.name || "";

        if (currentUserInfo && currentUserInfo?.menu && currentUserInfo?.menu?.length) {
            currentUserInfo?.menu?.forEach((menuInfo: any) => {
                this.menu.push(new Menu(menuInfo));
            });
        }
    }
}

export class Menu {
    public menuID = "";
    public menuName = "";
    public subMenu = Array<SubMenu>();
    constructor(menuInfo: any = {}) {
        this.menuID = menuInfo.menuID || "";
        this.menuName = menuInfo.menuName || "";

        if (menuInfo?.subMenu && menuInfo?.subMenu?.length) {
            menuInfo?.subMenu?.forEach((subMenuInfo: any) => {
                this.subMenu.push(new SubMenu(subMenuInfo));
            });
        }
    }
}

export class SubMenu {
    public subMenuID = "";
    public subMenuName = "";
    public subMenuURL = "";
    public sequenceNo = "";
    public isWrite = "";
    public isDelete = "";
    constructor(subMenuInfo: any = {}) {
        this.subMenuID = subMenuInfo?.subMenuID || "";
        this.subMenuName = subMenuInfo?.subMenuName || "";
        this.subMenuURL = subMenuInfo?.subMenuURL || "";
        this.sequenceNo = subMenuInfo?.sequenceNo || "";
        this.isWrite = subMenuInfo?.isWrite || "";
        this.isDelete = subMenuInfo?.isDelete || "";
    }
}
