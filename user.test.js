 const user = {
  name: 'Alice',
  age: 30,
  email: 'alice@gmail.com'
 }
 // console.info(Object.values(user));

const getUserPromise = () => {
    return new Promise((resolve, reject) => {
        if (user) {
            resolve(user);
        } else {
            reject('User not found');
        }
    });
};


getUserPromise()
    .then(data => console.log('Promise resolved:', data))
    .catch(err => console.error('Promise rejected:', err));