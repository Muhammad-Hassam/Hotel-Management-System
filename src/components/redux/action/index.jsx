const userStatus = (data) => {
    return {
      type: 'STATUS',
      payload: data,
    };
  };
  
  export default userStatus;