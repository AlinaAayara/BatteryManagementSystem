export class CurrentUser {
    public userID = "";
    public groupID = "";
    public groupName = "";
    public name = "";
    public userName = "";
    public todaysDate = "";
    public menu = Array<Menu>();
    public firmID = "";
    public FirmID = "";
    public firmName ="";
    public contactPerson ="";
    public firmContactNo ="";
    public firmAddress ="";
    public gSTNo ="";
    public sateCode ="";
    public stateName="";
    public userType="";
    public UserID = "";
    public setting = Array<Setting>();

    constructor(currentUserInfo: any = {}) {
        this.userID = currentUserInfo?.userID || "";
        this.groupID = currentUserInfo?.groupID || "";
        this.groupName = currentUserInfo?.groupName || "";
        this.todaysDate = currentUserInfo?.todaysDate || "";
        this.name = currentUserInfo?.name || "";
        this.firmID = currentUserInfo?.firmID || "";
        this.FirmID = currentUserInfo?.firmID || "";
        this.firmName = currentUserInfo?.firmName || "";
        this.contactPerson = currentUserInfo?.contactPerson || "";
        this.firmContactNo = currentUserInfo?.firmContactNo || "";
        this.firmAddress = currentUserInfo?.firmAddress || "";
        this.gSTNo = currentUserInfo?.gSTNo || "";
        this.sateCode = currentUserInfo?.sateCode || "";
        this.stateName = currentUserInfo?.stateName || "";
        this.userType = currentUserInfo?.userType || "";
        this.UserID = currentUserInfo?.userID || "";
        if (currentUserInfo && currentUserInfo?.menu && currentUserInfo?.menu?.length) {
            currentUserInfo?.menu?.forEach((menuInfo: any) => {
                this.menu.push(new Menu(menuInfo));
            });
        }
        if (currentUserInfo && currentUserInfo?.setting && currentUserInfo?.setting?.length) {
            currentUserInfo?.setting?.forEach((menuInfo: any) => {
                this.setting.push(new Setting(menuInfo));
            });
        }
        
    }
}

export class Menu {
    public menuID = "";
    public menuName = "";
    public isShowOnMenuBar = "";
    public subMenu = Array<SubMenu>();
    constructor(menuInfo: any = {}) {
        this.menuID = menuInfo.menuID || "";
        this.menuName = menuInfo.menuName || "";
        this.isShowOnMenuBar = menuInfo.isShowOnMenuBar || "";
        
        if (menuInfo?.subMenu && menuInfo?.subMenu?.length) {
            menuInfo?.subMenu?.forEach((subMenuInfo: any) => {
                this.subMenu.push(new SubMenu(subMenuInfo));
            });
        }
    }
}

export class Setting {
    public settingID = "";
    public settingName = "";
    public settingValue = "";
    constructor(menuInfo: any = {}) {
        this.settingID = menuInfo?.settingID || "";
        this.settingName = menuInfo?.settingName || "";
        this.settingValue = menuInfo?.settingValue || "";
    }
}

export class SubMenu {
    public subMenuID = "";
    public subMenuName = "";
    public subMenuURL = "";
    public sequenceNo = "";
    public isWrite = "";
    public isDelete = "";
    public isShowOnMenuBar = "";
    public filterCriteria = "";
    public reportID = "";
    public reportName = "";
    public storedProcedureName = "";
    constructor(subMenuInfo: any = {}) {
        this.subMenuID = subMenuInfo?.subMenuID || "";
        this.subMenuName = subMenuInfo?.subMenuName || "";
        this.subMenuURL = subMenuInfo?.subMenuURL || "";
        this.sequenceNo = subMenuInfo?.sequenceNo || "";
        this.isWrite = subMenuInfo?.isWrite || "";
        this.isDelete = subMenuInfo?.isDelete || "";
        this.isShowOnMenuBar = subMenuInfo?.isShowOnMenuBar || "";
        this.filterCriteria = subMenuInfo?.filterCriteria || "";
        this.reportID = subMenuInfo?.reportID || "";
        this.reportName = subMenuInfo?.reportName || "";
        this.storedProcedureName = subMenuInfo?.storedProcedureName || "";
    }
}