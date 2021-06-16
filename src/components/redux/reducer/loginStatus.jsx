const data = {
    loginStatus: false,
    userdata:null,
    role: null,
    user: null,
    // jobid: null,
  };
  
  const Status = (state = data, action) => {
    switch (action.type) {
      case 'STATUS':
        return { ...action.payload };
  
      default:
        return state;
    }
  };
  
  export default Status;