export type Colors = 'sky' | 'yellow' | 'green' | 'red' | 'violet' | 'gray' | 'success' | 'primary' | 'danger' | 'light'

export type ObjColors = Record<string, Record<string, boolean>>

export const COLORS: ObjColors = {
    success: {
        'bg-success-700': true,
        'hover:bg-success-800': true,
        'focus:ring-success-300': true,
        'text-white': true,
    },
    primary: {
      'bg-primary-700': true,
      'hover:bg-primary-800': true,
      'focus:ring-primary-300': true,
      'text-white': true,
    },
    danger: {
      'bg-danger-700': true,
      'hover:bg-danger-800': true,
      'focus:ring-danger-300': true,
      'text-white': true,
    },
    light: {
      'bg-gray-100': true,
      'hover:bg-gray-300': true,
      'focus:ring-gray-50': true,
      'text-gray-700': true,
    },
    sky: {
      'bg-sky-700': true,
      'hover:bg-sky-800': true,
      'focus:ring-sky-300': true,
      'text-white': true,
    },
    yellow: {
      'bg-orange-400' : true,
      'hover:bg-orange-500': true,
      'text-white': true
    },
    green: {
      'bg-emerald-600' : true,
      'hover:bg-emerald-600': true,
      'text-white': true
    },
    red: {
      'bg-red-700' : true,
      'hover:bg-red-800': true,
      'text-white': true
    },
    violet: {
      'bg-indigo-700' : true,
      'hover:bg-indigo-800': true,
      'text-white': true
    },
    gray: {
      'bg-gray-700' : true,
      'hover:bg-gray-800': true,
      'text-white': true
    }
}

export const BACKGROUNDS: ObjColors = {
  success: {
    'bg-success-600': true
  },
  primary: {
    'bg-primary-600': true
  },
  danger: {
    'bg-danger-600': true
  },
  light: {
    'bg-gray-200': true
  },
  sky: {
    'bg-sky-600': true
  },
  yellow: {
    'bg-orange-200' : true
  },
  green: {
    'bg-emerald-400' : true
  },
  red: {
    'bg-red-200' : true
  },
  violet: {
    'bg-indigo-300' : true
  },
  gray: {
    'bg-gray-300' : true
  }
}

export const NAV_BACKGROUNDS: ObjColors = {
  success: {
    'bg-success-700': true
  },
  primary: {
    'bg-primary-700': true
  },
  danger: {
    'bg-danger-700': true
  },
  light: {
    'bg-gray-300': true
  },
  sky: {
    'bg-sky-700': true
  },
  yellow: {
    'bg-orange-400' : true
  },
  green: {
    'bg-emerald-600' : true
  },
  red: {
    'bg-red-700' : true
  },
  violet: {
    'bg-indigo-700' : true
  },
  gray: {
    'bg-gray-700' : true
  }
}