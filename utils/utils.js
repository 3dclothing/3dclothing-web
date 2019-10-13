
const showModal = (title, content) => {
  wx.showModal({
    title: title ? title : '网络异常',
    content: content ? content : '网络异常，请稍后再试',
  })
}

const cityReplace = (val) => {
  return val.replace(/市$/, '');
}

/** 校验字段不能为空 */
const validateEmpty = (value, desc) => {
  if (!value) {
    wx.showToast({
      title: desc,
      icon: 'none',
    });
    return false;
  } else {
    return true;
  }
}

/** 校验上传图片 */
const validateImages = (images, desc) => {
  if (images.length <= 0) {
    wx.showToast({
      title: desc,
      icon: 'none',
    });
    return false;
  } else {
    return true;
  }
}

/** 校验手机号码格式 */
const validatePhone = (phone, desc) => {
  const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (!myreg.test(phone)) {
    wx.showToast({
      title: desc,
      icon: 'none',
    });
    return false;
  } else {
    return true;
  }
}

const phoneCall = (e) => {
  const phone = e.currentTarget.dataset.phone
  wx.makePhoneCall({
    phoneNumber: phone,
  })
}

export {
  showModal,
  cityReplace,
  validateEmpty,
  validateImages,
  validatePhone,
  phoneCall
}