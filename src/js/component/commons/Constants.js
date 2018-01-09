export const STRINGS = {
    VIEW: 'view',
    FLAG: 'flag',
    EDIT: 'edit',
    ADD: 'add',
    UPDATE: 'create',
    DOWNLOAD: 'download',
    CUSTOMER: 'customer',
    REQUEST: 'request',
    REPORTS: 'reports',
    HOME: 'home'
};

export const MAPPING = {
    customer: 'CUSTOMER MANAGEMENT',
    request: 'REQUEST',
    reports: 'REPORTS',
    home: 'HOME'
};

export const BUTTON_MAPPING = {
    customer: {
        view: 'view',
        create: 'create',
        edit: 'edit'    
    },
    request: {
        edit: 'edit'    
    },
    reports: {
        view: 'view',
        download: 'download'
    },
    home: {
        view: 'view',
        flag: 'flag',
        edit: 'edit'    
    }
};

export const IMAGES = {
    add: 'ADD',
    view: 'VIEW',
    flag: 'FLAG',
    edit: 'EDIT',
    create: 'UPDATE',
    update: 'UPDATE',
    download: 'DOWNLOAD'
};

export const IMAGE_COLOR = {
    EDIT: {
        WHITE: 'edit_white.png',
        BLUE: 'edit.png',
    },
    VIEW: {
        WHITE: 'view.png',
        BLUE: 'view-blue.png',
    },
    FLAG: {
        DEFAULT: 'flag.png',
    },
    UPDATE: {
        DEFAULT: 'create-new.png',
    },
    DOWNLOAD: {
        DEFAULT: 'download.png',
    }
};

export const NAVIGATION = {
    'Request Integrity Test Limit Certificate': '/requestIntegrity',
    Requests: '/request',
    'Customer Management': '/customer',
    Reports: '/reports'
};
