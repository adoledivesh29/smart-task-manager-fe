export const PROJECT_NAME = 'Smart Task Manager'

export const REGEX = {
    ONLY_NUMBER: /^[0-9]+$/, // example: 1234567890, invalid: 1234567890a
    // EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/, // example: test@gmail.com, invalid: test@gmail.com.
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // example: test@gmail.com, invalid: test@gmail.com.
    PASSWORD: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?+!@$%^&*-]).{8,15}$/, // example: Password@123, invalid: password@1234,
    ALPHANUMERIC_NO_SPECIAL: /^[a-zA-Z0-9]+$/, // example: test123, invalid: test@123,
    ALPHANUMERIC_WITH_SPACE: /^[a-zA-Z0-9\s]+$/, // example: test user123, invalid: test@user123
    ONLY_ALPHABETS: /^[a-zA-Z]+$/, // example: test, invalid: test123
    ONLY_ALPHABETS_WITH_SPACE: /^[a-zA-Z\s]+$/, // example: test user, invalid: test123
    BANK_ACCOUNT_NO: /^\d{9,18}$/, // example: 123456789, invalid: 1234567890a
    IFSC_CODE: /^[A-Z]{4}0[A-Z0-9]{6}$/, // example: ABCD0123456, invalid: ABCD01234
    MOBILE_NUMBER: /^[6-9]\d{9}$/, // example: 9876543210, invalid: 1234567890
    PIN_CODE: /^\d{6}$/, // example: 123456, invalid: 12345
    ADDRESS: /^[a-zA-Z0-9\s,.'-]{3,}$/, // example: 123 Main St, invalid: 12
    ALLOW_NEGATIVE_NUMBER: /^-?\d+$/, // example: -123, invalid: 123a
}

export const COMMON_MESSAGES = {
    REQUIRED: '* This field is required',
    INVALID_EMAIL: '* Invalid email address',
    INVALID_PASSWORD: '* Invalid password',
    ONLY_NUMBER: '* Only numbers are allowed',
    ONLY_ALPHABETS_WITH_SPACE: '* Only alphabets and spaces are allowed',
    ALPHANUMERIC_NO_SPECIAL: '* Only alphabets and numbers are allowed',
    ALPHANUMERIC_WITH_SPACE: '* Only alphabets, numbers and spaces are allowed',
    ONLY_ALPHABETS_AND_NUMBERS: '* Only alphabets and numbers are allowed'
}

/* ---- Select Options ---- */
export const eStatusOptions = [
    { label: 'Active', value: 'y' },
    { label: 'Inactive', value: 'n' },
    { label: 'Deleted', value: 'd' }
]

export const eGenderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'unspecified' }
]

export const eNotificationType = [
    { label: "Today's register", value: 'todayRegister' },
    { label: 'KYC verified', value: 'kycVerified' },
    { label: 'KYC not verified', value: 'kycNotVerified' },
]

export const eRegistrationSourceOptions = [
    { label: 'Account', value: 'email' },
    { label: 'Admin', value: 'admin' },
    { label: 'Apple', value: 'ios' },
    { label: 'Facebook', value: 'facebook' },
    { label: 'Guest', value: 'guest' },
]
