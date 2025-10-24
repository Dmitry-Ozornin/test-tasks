export const Verefications = (formData, data) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].email === formData[0] && data[i].state === formData[1]) {
      const answer = true;
      return answer;
    } else {
      const answer = false;
      return false;
    }
  }
};

export const CodeAutefication = (user, formData, data) => {
  // добавлено для api, так как в нем 5 цифр в zipcode. Ввоодим 5 чисел как в api, шестое любое.

  for (let i = 0; i < data.length; i++) {
    if (data[i].email === user && data[i].zipcode === formData) {
      let answer = true;
      return answer;
    } else {
      return false;
    }
  }
};
