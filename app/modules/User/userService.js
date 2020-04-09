const userService = {
  getSynthesizedUserDetails: (payload, addOnServiceListLength, packageListLength) => {
    const obj = {};

    payload.forEach((currentVal, index) => {
      let attr;

      if (index >= 0 && index <= addOnServiceListLength - 1) {
        attr = 'addOnServices';
      } else if (index >= addOnServiceListLength && index <= (packageListLength + addOnServiceListLength - 1)) {
        attr = 'packages';
      } else {
        attr = 'regions';
      }

      if (!obj[attr]) {
        obj[attr] = [...currentVal];
      } else {
        obj[attr] = [...obj[attr], ...currentVal];
      }
    });
  }
};

export default userService;
