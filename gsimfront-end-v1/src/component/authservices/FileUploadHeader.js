export default function authFileHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    const header = {
    "Authorization": 'Bearer ' + user.accessToken,
     "Content-Type": 'multipart/form-data',
    }
    return { header };
  } else {
    return {};
  }
}