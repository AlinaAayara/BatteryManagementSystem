export class AppUrl {
    public static URL = {};
    public static baseURL = "https://localhost:7147/api/";
    //public static baseURL = "http://RanzunzarWebApi.betech.in/api/";
    public static firmInfoURL = "FirmInfo/";
    public static basicUserURL = "BasicUser/"
    public static API = {
        Login: AppUrl.baseURL + AppUrl.basicUserURL + "authentication",
        get_current_user: AppUrl.baseURL + AppUrl.basicUserURL + "GetCurrentUser",
        AddGroup: AppUrl.baseURL + "BasicGroupAndFeature/AddGroup",
        GetGroupList: AppUrl.baseURL + "BasicGroupAndFeature/GetGroupList",
        add_member: AppUrl.baseURL + "MemberInfo/AddMember",
        get_member_list: AppUrl.baseURL + "MemberInfo/GetMemberList",
        get_next_member_code: AppUrl.baseURL + "MemberInfo/GetNextMemberCode",
        add_member_emi: AppUrl.baseURL + "EMI/AddMemberEMI",
        add_saving_info: AppUrl.baseURL + "Saving/AddSavingInfo",
        add_member_loan: AppUrl.baseURL + "Loan/AddMemberLoan",
        add_loan_info: AppUrl.baseURL + "Loan/AddLoan",
        add_member_fd: AppUrl.baseURL + "FD/AddMemberFD",
        add_fd_info: AppUrl.baseURL + "FD/AddFd",
        get_dashboard_all_details: AppUrl.baseURL + "Dashboard/AllDetails",
        get_dashboard_all_member_details: AppUrl.baseURL + "Dashboard/DashboardMemberDetails",
        get_emi_member_list: AppUrl.baseURL + "MemberInfo/GetEMIMemberList",
        get_emi_remaining_member_list: AppUrl.baseURL + "MemberInfo/GetEMIRemainingMemberList",
        get_loan_member_list: AppUrl.baseURL + "MemberInfo/GetLaonMemberList",
        add_firm_info: AppUrl.baseURL + AppUrl.firmInfoURL + "AddFirm",
        get_firm_info: AppUrl.baseURL + AppUrl.firmInfoURL + "GetFirm"
    };
}
