import { notification } from 'antd';

export const typeNotification = {
  success: 'success',
  warning: 'warning',
  error: 'error',
};

const openNotification = (type, description) => {
  notification[type]({
    message:
      type === typeNotification.success
        ? 'Success'
        : type === typeNotification.warning
        ? 'Warning'
        : 'error',
    description,
    placement: 'bottomLeft',
  });
};
export default openNotification;
