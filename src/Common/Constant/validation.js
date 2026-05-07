// FORM VALIDATION: It contains all the common fields validation for the form
import { COMMON_MESSAGES, REGEX } from './index'

const ONLY_NUMBER = {
    pattern: {
        value: REGEX.ONLY_NUMBER,
        message: COMMON_MESSAGES.ONLY_NUMBER
    }
}

const REQUIRED_FIELD = (field) => ({
    required: {
        value: true,
        message: `* ${ field } is required`
    }
})

export const FORM_VALIDATION = {
    sUserName: {
        ...REQUIRED_FIELD('User Name'),
        maxLength: {
            value: 20,
            message: '* Username must be at most 20 characters.'
        },
        minLength: {
            value: 3,
            message: '* Username must be at least 3 characters.'
        },
        pattern: {
            value: REGEX.ALPHANUMERIC_NO_SPECIAL,
            message: COMMON_MESSAGES.ALPHANUMERIC_NO_SPECIAL
        }
    },
    nPassword: {
        ...REQUIRED_FIELD('Password'),
        ...ONLY_NUMBER
    },
    sName: {
        ...REQUIRED_FIELD('Name'),
    },
    sDescription: {
        ...REQUIRED_FIELD('Notification Description'),
    },
    sTitle: {
        ...REQUIRED_FIELD('Notification Title'),
    },
    eUserType: {
        ...REQUIRED_FIELD('Notification Type'),
    },
    sEmail: {
        ...REQUIRED_FIELD('Email'),
        pattern: {
            value: REGEX.EMAIL,
            message: '* Enter a valid Email address'
        }
    },
    sMobile: {
        ...REQUIRED_FIELD('Mobile Number'),
        pattern: {
            value: REGEX.MOBILE_NUMBER,
            message: '* Enter a valid Mobile Number'
        }
    },
    sFullName: {
        ...REQUIRED_FIELD('Full Name'),
        maxLength: {
            value: 50,
            message: '* Full Name must be at most 50 characters.'
        },
        pattern: {
            value: REGEX.ONLY_ALPHABETS_WITH_SPACE,
            message: COMMON_MESSAGES.ONLY_ALPHABETS_WITH_SPACE
        }
    },
    eGender: {
        ...REQUIRED_FIELD('Gender'),
    },
    sBankName: {
        ...REQUIRED_FIELD('Bank Name'),
        maxLength: {
            value: 50,
            message: '* Bank Name must be at most 50 characters.'
        },
        pattern: {
            value: REGEX.ONLY_ALPHABETS_WITH_SPACE,
            message: '* Invalid Bank Name'
        }
    },
    sAccountNo: {
        ...REQUIRED_FIELD('Account Number'),
        pattern: {
            value: REGEX.BANK_ACCOUNT_NO,
            message: '* Invalid Account Number'
        }
    },
    sIFSC: {
        ...REQUIRED_FIELD('IFSC Code'),
        pattern: {
            value: REGEX.IFSC_CODE,
            message: '* Invalid IFSC Code'
        }
    },
    sAccountHolderName: {
        ...REQUIRED_FIELD('Account Holder Name'),
        maxLength: {
            value: 50,
            message: '* Account Holder Name must be at most 50 characters.'
        },
        pattern: {
            value: REGEX.ONLY_ALPHABETS_WITH_SPACE,
            message: '* Invalid Account Holder Name'
        }
    },
    sAddressLine1: {
        ...REQUIRED_FIELD('Address Line 1'),
        maxLength: {
            value: 100,
            message: '* Address Line 1 must be at most 100 characters.'
        },
        pattern: {
            value: REGEX.ADDRESS,
            message: '* Invalid Address Line 1'
        }
    },
    sAddressLine2: {
        ...REQUIRED_FIELD('Address Line 2'),
        maxLength: {
            value: 100,
            message: '* Address Line 2 must be at most 100 characters.'
        },
        pattern: {
            value: REGEX.ADDRESS,
            message: '* Invalid Address Line 2'
        }
    },
    sLandMark: {
        ...REQUIRED_FIELD('Landmark'),
        maxLength: {
            value: 50,
            message: '* Landmark must be at most 50 characters.'
        },
        pattern: {
            value: REGEX.ADDRESS,
            message: '* Invalid Landmark'
        }
    },
    sCity: {
        ...REQUIRED_FIELD('City'),
        maxLength: {
            value: 50,
            message: '* City must be at most 50 characters.'
        },
        pattern: {
            value: REGEX.ONLY_ALPHABETS_WITH_SPACE,
            message: '* Invalid City'
        }
    },
    sState: {
        ...REQUIRED_FIELD('State'),
        // maxLength: {
        //     value: 50,
        //     message: '* State must be at most 50 characters.'
        // },
        // pattern: {
        //     value: REGEX.ONLY_ALPHABETS_WITH_SPACE,
        //     message: '* Invalid State'
        // }
    },
    nPinCode: {
        ...REQUIRED_FIELD('Pincode'),
        pattern: {
            value: REGEX.PIN_CODE,
            message: '* Invalid Pincode'
        }
    },
    nSmallBlind: {
        ...REQUIRED_FIELD('Small Blind'),
        ...ONLY_NUMBER,
        min: {
            value: 1,
            message: '* Small Blind must be greater than 0'
        }
    },
    nBigBlind: {
        ...REQUIRED_FIELD('Big Blind'),
        ...ONLY_NUMBER,
        min: {
            value: 1,
            message: '* Big Blind must be greater than 0'
        }
    },
    nMinimumBuyIn: {
        ...REQUIRED_FIELD('Minimum Chips'),
        ...ONLY_NUMBER,
        min: {
            value: 1,
            message: '* Minimum Chips must be greater than 1'
        }
    },
    nMaximumBuyIn: {
        ...REQUIRED_FIELD('Maximum Chips'),
        ...ONLY_NUMBER,
        min: {
            value: 1,
            message: '* Maximum Chips must be greater than 1'
        }
    },
    nMaxBot: {
        ...REQUIRED_FIELD('Max System Agents'),
    },
    nPointsOnWin: {
        ...REQUIRED_FIELD('Winning Point'),
        ...ONLY_NUMBER,
        min: {
            value: 0,
            message: '* Winning Point must be greater than 0'
        }
    },
    nPointsOnLoss: {
        ...REQUIRED_FIELD('Losing Point'),
        ...ONLY_NUMBER,
        min: {
            value: 0,
            message: '* Losing Point must be greater than 0'
        }
    },
    sNormalTurnTimer: {
        ...REQUIRED_FIELD('Normal Turn Timer'),
        ...ONLY_NUMBER,
        min: {
            value: 1,
            message: '* Normal Turn Timer must be greater than 0'
        }
    },
    sFastTurnTimer: {
        ...REQUIRED_FIELD('Fast Turn Timer'),
        ...ONLY_NUMBER,
        min: {
            value: 1,
            message: '* Fast Turn Timer must be greater than 0'
        }
    },
    nVIPLevel: {
        ...REQUIRED_FIELD('VIP Level'),
    },
    nChips: {
        ...ONLY_NUMBER,
        min: {
            value: 0,
            message: '* Chips must be greater than 0'
        }
    },
    nGoldenChips: {
        ...ONLY_NUMBER,
        min: {
            value: 0,
            message: '* Gold Coins must be greater than 0'
        }
    },
    nRequiredPoints: {
        ...ONLY_NUMBER,
        min: {
            value: 0,
            message: '* Required Points must be greater than 0'
        }
    },
    nAdminRewardChips: {
        ...ONLY_NUMBER,
        min: {
            value: 0,
            message: '* Admin Reward Chips must be greater than 0'
        }
    },
    nNumber: {
        ...REQUIRED_FIELD('Number of Bot'),
        ...ONLY_NUMBER,
        max: {
            value: 10,
            message: '* Number of Bot must be less than 10'
        }
    },
    nWinningRatio: {
        ...REQUIRED_FIELD('Winning Ratio'),
        ...ONLY_NUMBER
    }
}
