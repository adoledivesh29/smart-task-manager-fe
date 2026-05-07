const paths = {
  public: {
    auth: {
      login: '/login',
      signup: '/signup',
      resetPassword: (token) => `/reset-password/${ token }`
    }
  },
  private: {
    changePassword: '/change-password',
    dashboard: '/dashboard',
  }
}

export default paths
