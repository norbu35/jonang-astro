export interface BankAccountDetails {
  accountName: string;
  bankName: string;
  accountNumber: string;
  swiftCode: string;
  ifscCode: string;
  branchCode: string;
  branchName: string;
}

export const DONATION_BANK_DETAILS: BankAccountDetails = {
  accountName: "Jonang Takten Phuntsok Choeling Cultural Society",
  bankName: "State Bank of India",
  accountNumber: "4008 4616 933",
  swiftCode: "SBININBB104",
  ifscCode: "SBIN 0000 691",
  branchCode: "00691 (The Mall, Shimla)",
  branchName: "The Mall, Shimla, Himachal Pradesh, India",
};

export const POSTAL_DONATION_DETAILS = {
  payableTo: "Jonang Takten Phuntsok Choeling Cultural Society",
  addressLines: [
    "Jonang Takten Phuntsok Choeling Tibetan Buddhist Monastery",
    "Sanjauli, Shimla, Himachal Pradesh",
    "PIN: 171006, India",
  ],
  officeEmail: "office@jonangmonastery.com",
  telephones: [
    { label: "Office Line", number: "+91 177 2841410" },
    { label: "Direct Line", number: "+91 177 2645280" },
  ],
};
